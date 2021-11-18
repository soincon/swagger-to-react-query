const { ifElse, getParams } = require('./utils');

function generatorHook({
    verb,
    route,
    operation,
    operationName,
    operationType,
    isOperationQuery,
    isRead,
    pathParams,
    pathParamsRequired,
    hasPathParams,
    hasQueryParams,
}) {
    let output = '';

    const hookName = `use${operationName}`;

    if (isOperationQuery) {
        output += `export const ${hookName} = (${getParams([
            { pathParams: hasPathParams },
            { body: operation.requestBody },
            { queryParams: hasQueryParams },
            { config: true },
            { 'options = {}': true },
        ])}) => useQuery({
  queryKey: ${ifElse(hasPathParams, 'pathParams && ')}${ifElse(
            !!pathParamsRequired.length,
            pathParams
                .filter((param) => pathParamsRequired.includes(param))
                .map((param) => `pathParams.${param}`)
                .join(' && ') + ' && ',
            ''
        )}['${route}', ${getParams([{ pathParams: hasPathParams }, { body: operation.requestBody }, { queryParams: hasQueryParams }])}],
  queryFn: () => queryFn(generatorConfig)({ method: '${verb}', ...options })({ queryKey:['${route}', ${
    ifElse(hasPathParams, 'pathParams', '{}')}, ${
    ifElse(operation.requestBody, 'body', '{}')}, ${
    ifElse(hasQueryParams, 'queryParams', '{}')}]}),
  ...config
})
${hookName}.queryKey = '${route}'`;
    }
    // mutation hook
    else {
        output += `export const ${hookName} = (${ifElse(hasPathParams, 'pathParams, ')}${ifElse(
            hasQueryParams,
            'queryParams, '
        )}config, options) => useMutation(mutationFn(generatorConfig)('${verb}', '${route}', ${ifElse(
            hasPathParams,
            'pathParams',
            '{}'
        )}, ${ifElse(hasQueryParams, 'queryParams', '{}')}, options), config)`;
    }

    return `${output}
`;
}

module.exports = generatorHook;
