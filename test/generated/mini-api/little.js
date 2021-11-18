/* eslint-disable */
/* tslint:disable */
import { useQuery } from 'react-query'
import { queryFn, mutationFn } from '../generatorHelpers';

const apiUrlConfigPath = undefined;
const apiUrlValue = 'http://my-api.com';
const skipAuth = true;
const generatorConfig = {
    ...(apiUrlConfigPath && { apiUrlConfigPath }),
    ...(apiUrlValue && { apiUrlValue }),
    ...(skipAuth && { skipAuth }),
};
        

// get: {apiUrl}/getMe/{clientId}
export const getMe = (pathParams, options = {}) => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/getMe/{clientId}', pathParams, {}, {}]})
export const useGetMe = (pathParams, config, options = {}) => useQuery({
  queryKey: pathParams && ['{apiUrl}/getMe/{clientId}', pathParams],
  queryFn: () => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/getMe/{clientId}', pathParams, {}, {}]}),
  ...config
})
useGetMe.queryKey = '{apiUrl}/getMe/{clientId}'
