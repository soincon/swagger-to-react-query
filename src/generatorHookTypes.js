const { ifElse, getParams } = require('./utils');
const { getResReqTypes } = require('./generatorTypes');
const { trimEnd } = require('lodash');

function generatorHookTypes({ hasPathParams, hasQueryParams, operation, operationType, operationName, isOperationQuery, route, config }) {
    let docsUrl
    if (config.swaggerUrl && operation.tags[0]) {
        docsUrl = `${trimEnd(config.swaggerUrl, '#/')}#/${operation.tags[0]}/${operation.operationId}`;
    }
    let output = `/**
 * ${ifElse(operation.summary, operation.summary + '\n')}
 * ${ifElse(operation.description, operation.description + '\n')}
 * ${ifElse(docsUrl, docsUrl)}
 */
`;

    const hookName = `use${operationName}`;

    const isOk = ([statusCode]) => statusCode.toString().startsWith('2');
    const responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || 'void';
    const requestBodyTypes = getResReqTypes([['body', operation.requestBody]]);

    if (isOperationQuery) {
        output += `export function ${hookName}(${getParams([
            { [`pathParams?: ${operationName}PathParams`]: hasPathParams },
            { [`body?: ${requestBodyTypes}`]: operation.requestBody },
            { [`queryParams?: ${operationName}QueryParams`]: hasQueryParams },
            { [`config?: UseQueryOptions<${responseTypes}>`]: true },
            { [`options?: RequestInit`]: true },
        ])}): UseQueryResult<${responseTypes}>;
declare namespace ${hookName} {
    /** Entire key: \`['${route}', ${getParams([{ pathParams: hasPathParams }, { body: operation.requestBody }, { queryParams: hasQueryParams }])}]\` */
    export const queryKey: string;
}
`;
    } else {
        const requestBodyTypes = getResReqTypes([['body', operation.requestBody]]);

        // const requestBodyTypesOptional = `[${ifElse(hasPathParams, `${operationName}PathParams`, 'void')}?, ${ifElse(
        //     hasQueryParams,
        //     `${operationName}QueryParams`,
        //     'void'
        // )}?, ${requestBodyTypes}?, RequestInit?]`;

        output += `export function ${hookName}(${ifElse(hasPathParams, `pathParams?: ${operationName}PathParams, `)}${ifElse(
            hasQueryParams,
            `queryParams?: ${operationName}QueryParams, `
        )}config?: UseMutationOptions<${responseTypes}, unknown, ${requestBodyTypes}>, options?: RequestInit): UseMutationResult<${responseTypes}, unknown, ${requestBodyTypes}>;`;
    }

    return `${output}
`;
}

module.exports = generatorHookTypes;
