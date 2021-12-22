/* eslint-disable */
/* tslint:disable */
import { fetchJson } from './fetchJson';

const requestFn = async ({ url, method, pathParams, queryParams, generatorConfig, ...rest }) => {
    const urlPathParams = url.match(/{([^}]+)}/g); // Creates an array e.g. [ '{id}' ]
    const pathParamsExtra = {
        apiUrl: generatorConfig.apiUrl,
        ...pathParams,
    };
    // if (!generatorConfig || !generatorConfig.skipAuth) {
    //     const user = await getUser();
    //     Object.assign(pathParamsExtra, {
    //         clientId: user.clientId,
    //     });
    // }

    if (urlPathParams) {
        url = urlPathParams.reduce((acc, param) => acc.replace(param, pathParamsExtra[param.replace(/{|}/g, '')]), url);
    } else {
        queryParams = { ...queryParams, ...pathParamsExtra };
    }

    if (url.charAt(0) === '/') {
        url = url.replace('/', '');
    }

    const props = {
        skipAuth: !!generatorConfig.skipAuth
    }

    const response = await fetchJson({ method, url, queryParams, props, ...rest });
    return response;
};

export const queryFn = (generatorConfig) => (options = {}) => ({ queryKey }) => {
    const [url, pathParams = {}, body = {}, queryParams = {}] = queryKey;

    return requestFn({
        url,
        method: 'get',
        pathParams,
        queryParams,
        body,
        generatorConfig,
        ...options,
    });
};

export const mutationFn = (generatorConfig) => (method, url, pathParams = {}, queryParams = {}, options = {}) => (body = {}) => {
    return requestFn({
        url,
        method,
        pathParams,
        queryParams,
        body,
        generatorConfig,
        ...options,
    });
};
