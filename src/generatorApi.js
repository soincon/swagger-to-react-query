const { ifElse, getParams } = require('./utils');

function generatorApiTypes({ verb, route, operationName, hasPathParams, hasQueryParams, isOperationQuery, operation }) {
    let output = `
// ${verb}: ${route}
`;

    const methodName = operationName.charAt(0).toLowerCase() + operationName.slice(1);

    if (isOperationQuery) {
        output += `export const ${methodName} = (${getParams([
            { pathParams: hasPathParams },
            { body: operation.requestBody },
            { queryParams: hasQueryParams },
            { 'options = {}': true },
        ])}) => queryFn(generatorConfig)({ method: '${verb}', ...options })({ queryKey:['${route}', ${
            ifElse(hasPathParams, 'pathParams', '{}')}, ${
            ifElse(operation.requestBody, 'body', '{}')}, ${
            ifElse(hasQueryParams, 'queryParams', '{}')}]})`;
    } else {
        output += `export const ${methodName} = (${getParams([
            { pathParams: hasPathParams },
            { body: operation.requestBody },
            { queryParams: hasQueryParams },
            { options: true },
        ])}) => mutationFn(generatorConfig)('${verb}', '${route}', ${getParams([
            { pathParams: hasPathParams },
            { queryParams: hasQueryParams },
            { options: true },
        ])})(${ifElse(operation.requestBody, 'body')})`;
    }

    return `${output}
`;
}

module.exports = generatorApiTypes;
