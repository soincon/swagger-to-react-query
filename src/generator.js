const chalk = require('chalk');
const swagger2openapi = require('swagger2openapi');

const { pascalCase, camelCase, ifElse } = require('./utils');
const generatorApi = require('./generatorApi');
const generatorHook = require('./generatorHook');
const generatorApiTypes = require('./generatorApiTypes');
const generatorHookTypes = require('./generatorHookTypes');
const { generatorGlobalTypes, generatorTypes } = require('./generatorTypes');

const log = console.log;

function convertToOpenApiSchema(data) {
    return new Promise((resolve, reject) => {
        if (!data.openapi || !data.openapi.startsWith('3.0')) {
            swagger2openapi.convertObj(data, {}, (err, convertedObj) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(convertedObj.openapi);
                }
            });
        } else {
            resolve(data);
        }
    });
}

function validateSchema(schema) {
    const operationIds = [];

    Object.entries(schema.paths).forEach(([route, verbs]) => {
        Object.entries(verbs).forEach(([verb, operation]) => {
            if (['get', 'post', 'patch', 'put', 'delete'].includes(verb)) {
                if (!operation.operationId && !!operation.summary) {
                    operation.operationId = camelCase(operation.summary);
                }

                if (!operation.operationId) {
                    throw new Error(`Every path must have a operationId or summary - No operationId or summary set for ${verb} ${route}`);
                }

                if (operationIds.includes(operation.operationId)) {
                    throw new Error(`"${operation.operationId}" is duplicated in your schema definition!`);
                }

                operationIds.push(operation.operationId);
            }
        });
    });
}

async function generator({ specs, config }) {
    const schema = await convertToOpenApiSchema(specs);

    // Makes all paths params {clientId} non-required
    // TODO: Should be configurable
    Object.keys(schema.paths).forEach((route) => {
        Object.keys(schema.paths[route]).forEach((verb) => {
            (schema.paths[route][verb].parameters || []).forEach((param) => {
                if (param.name === 'clientId' && param.in === 'path') {
                    param.required = false;
                }
            });
        });
    });

    const globalTypes = generatorGlobalTypes(schema);
    const globalTypesWithHeader = `/* eslint-disable */
/* tslint:disable */
${globalTypes}
`;

    validateSchema(schema);

    const controllersAll = {};

    Object.entries(schema.paths).forEach(([routeRelative, verbs]) => {
        Object.entries(verbs).forEach(([verb, operation]) => {
            if (['get', 'post', 'patch', 'put', 'delete'].includes(verb)) {
                const controllers = operation.tags.map((tag) => {
                    return tag
                        .split('-')
                        .filter((part) => part !== 'controller')
                        .map((part, i) => {
                            if (i === 0) return part;
                            return part.charAt(0).toUpperCase() + part.slice(1);
                        })
                        .join('');
                });
                const operationName = pascalCase(operation.operationId);
                let operationType;
                let isOperationQuery;
                let isRead;

                if (verb === 'get' || operation['x-is-read'] === 'true') {
                    isRead = true;
                    operationType = 'Query';
                    isOperationQuery = true;
                } else {
                    isRead = false;
                    operationType = 'Mutation';
                    isOperationQuery = false;
                }

                const allParams = [...(verbs.parameters || []), ...(operation.parameters || [])];
                const pathParamsBase = allParams.filter((param) => param.in === 'path');
                const pathParams = pathParamsBase.map((param) => param.name);
                const pathParamsRequired = pathParamsBase.filter((param) => param.required).map((param) => param.name);
                const queryParamsBase = allParams.filter((param) => param.in === 'query');
                const queryParams = queryParamsBase.map((param) => param.name);
                const hasPathParams = pathParams.length > 0;
                const hasQueryParams = queryParams.length > 0;
                const hasQueryParamsOrPathParams = hasPathParams || hasQueryParams;
                const route = `{apiUrl}${routeRelative}`; // Prepends a path variable with api URL

                const params = {
                    route,
                    verb: verb.toLowerCase(),
                    operation,
                    operationName,
                    operationType,
                    isOperationQuery,
                    isRead,
                    allParams,
                    pathParams,
                    pathParamsRequired,
                    queryParams,
                    pathParamsBase,
                    queryParamsBase,
                    hasPathParams,
                    hasQueryParams,
                    hasQueryParamsOrPathParams,
                    config
                };

                controllers.forEach((controller) => {
                    controllersAll[controller] = controllersAll[controller] || { code: '', types: globalTypes };
                    controllersAll[controller].code += generatorApi(params);
                    controllersAll[controller].code += generatorHook(params);
                    controllersAll[controller].types += generatorTypes(params);
                    controllersAll[controller].types += generatorApiTypes(params);
                    controllersAll[controller].types += generatorHookTypes(params);
                });
            }
        });
    });

    Object.entries(controllersAll).forEach(([controller, { code, types }]) => {
        const hasQuery = Boolean(code.match(/useQuery/));
        const hasMutation = Boolean(code.match(/useMutation/));

        const codeReactQueryImports = [];
        const typesReactQueryImports = [];

        if (hasQuery) {
            codeReactQueryImports.push('useQuery');
            typesReactQueryImports.push('UseQueryOptions', 'UseQueryResult');
        }

        if (hasMutation) {
            codeReactQueryImports.push('useMutation');
            typesReactQueryImports.push('UseMutationOptions', 'MutateFunction', 'UseMutationResult');
        }
        const controllerHeader = `/* eslint-disable */
        /* tslint:disable */
        import { ${codeReactQueryImports.join(', ')} } from 'react-query'
        import { queryFn, mutationFn } from '../generatorHelpers';
        ${ifElse(config.apiUrl.fn, `import getApiUrl from '../../getApiUrl';`, '')}
        const generatorConfig = {
            apiUrl: ${ifElse(config.apiUrl.fn, `getApiUrl()`, config.apiUrl.value)},
            skipAuth: ${ifElse(config.skipAuth !== undefined, config.skipAuth, 'false')},
        };
        `;
        const controllerTypesHeader = `/* eslint-disable */
/* tslint:disable */
import { UseQueryOptions, UseQueryResult, UseMutationOptions, MutateFunction, UseMutationResult } from 'react-query'
import { RequestInit } from 'node-fetch'

`;

        controllersAll[controller].code = controllerHeader + code;
        controllersAll[controller].types = controllerTypesHeader + types;
    });

    log(chalk.green(`Finish ${config.name} code generation`));

    return Promise.resolve({
        controllers: controllersAll,
        globalTypes: globalTypesWithHeader,
    });
}

module.exports = generator;
