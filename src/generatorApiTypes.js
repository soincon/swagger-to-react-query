const { ifElse, getParams } = require('./utils');
const { getResReqTypes } = require('./generatorTypes');
const { trimEnd } = require('lodash');

function generatorHookTypes({ hasPathParams, hasQueryParams, operation, operationType, operationName, config }) {
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

    const methodName = operationName.charAt(0).toLowerCase() + operationName.slice(1);

    const isOk = ([statusCode]) => statusCode.toString().startsWith('2');
    const responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || 'void';
    const requestBodyTypes = getResReqTypes([['body', operation.requestBody]]);
    const requestBodyTypesOptional = `[${ifElse(hasPathParams, `${operationName}PathParams`, 'void')}?, ${ifElse(
        hasQueryParams,
        `${operationName}QueryParams`,
        'void'
    )}?, ${requestBodyTypes}?, RequestInit?]`;

    output += `export function ${methodName}(${getParams([
        { [`pathParams?: ${operationName}PathParams`]: hasPathParams },
        { [`body?: ${requestBodyTypes} | ${requestBodyTypesOptional}`]: operation.requestBody },
        { [`queryParams?: ${operationName}QueryParams`]: hasQueryParams },
        { [`options?: RequestInit`]: true },
    ])}): Promise<${responseTypes}>;`;

    return `${output}
`;
}

module.exports = generatorHookTypes;
