/* eslint-disable */
/* tslint:disable */
import { useQuery } from 'react-query'
import { queryFn, mutationFn } from '../generatorHelpers';

const apiUrlConfigPath = 'products.vt.baseUrl';
const apiUrlValue = undefined;
const skipAuth = false;
const generatorConfig = {
    ...(apiUrlConfigPath && { apiUrlConfigPath }),
    ...(apiUrlValue && { apiUrlValue }),
    ...(skipAuth && { skipAuth }),
};
        

// post: {apiUrl}/v1/foo
export const postFooBar = (options = {}) => queryFn(generatorConfig)({ method: 'post', ...options })({ queryKey:['{apiUrl}/v1/foo', {}, {}, {}]})
export const usePostFooBar = (config, options = {}) => useQuery({
  queryKey: ['{apiUrl}/v1/foo', ],
  queryFn: () => queryFn(generatorConfig)({ method: 'post', ...options })({ queryKey:['{apiUrl}/v1/foo', {}, {}, {}]}),
  ...config
})
usePostFooBar.queryKey = '{apiUrl}/v1/foo'
