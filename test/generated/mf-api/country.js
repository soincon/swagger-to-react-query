/* eslint-disable */
        /* tslint:disable */
        import { useQuery, useMutation } from 'react-query'
        import { queryFn, mutationFn } from '../generatorHelpers';
        import getApiUrl from '../../getApiUrl';
        const generatorConfig = {
            apiUrl: getApiUrl(),
            skipAuth: false,
        };
        
// get: {apiUrl}/v1/{clientId}/countries/{id}
export const getCountry = (pathParams, options = {}) => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/v1/{clientId}/countries/{id}', pathParams, {}, {}]})
export const useGetCountry = (pathParams, config, options = {}) => useQuery({
  queryKey: pathParams && pathParams.id && ['{apiUrl}/v1/{clientId}/countries/{id}', pathParams],
  queryFn: () => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/v1/{clientId}/countries/{id}', pathParams, {}, {}]}),
  ...config
})
useGetCountry.queryKey = '{apiUrl}/v1/{clientId}/countries/{id}'

// put: {apiUrl}/v1/{clientId}/countries/{id}
export const putCountry = (pathParams, body, options) => mutationFn(generatorConfig)('put', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, options)(body)
export const usePutCountry = (pathParams, config, options) => useMutation(mutationFn(generatorConfig)('put', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, {}, options), config)

// delete: {apiUrl}/v1/{clientId}/countries/{id}
export const deleteCountry = (pathParams, options) => mutationFn(generatorConfig)('delete', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, options)()
export const useDeleteCountry = (pathParams, config, options) => useMutation(mutationFn(generatorConfig)('delete', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, {}, options), config)

// patch: {apiUrl}/v1/{clientId}/countries/{id}
export const patchCountry = (pathParams, body, options) => mutationFn(generatorConfig)('patch', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, options)(body)
export const usePatchCountry = (pathParams, config, options) => useMutation(mutationFn(generatorConfig)('patch', '{apiUrl}/v1/{clientId}/countries/{id}', pathParams, {}, options), config)

// post: {apiUrl}/v1/countries
export const postCountry = (body, options) => mutationFn(generatorConfig)('post', '{apiUrl}/v1/countries', options)(body)
export const usePostCountry = (config, options) => useMutation(mutationFn(generatorConfig)('post', '{apiUrl}/v1/countries', {}, {}, options), config)

// post: {apiUrl}/v1/{clientId}/{someParam}/countries
export const postCountryWithPathParams = (pathParams, body, options) => mutationFn(generatorConfig)('post', '{apiUrl}/v1/{clientId}/{someParam}/countries', pathParams, options)(body)
export const usePostCountryWithPathParams = (pathParams, config, options) => useMutation(mutationFn(generatorConfig)('post', '{apiUrl}/v1/{clientId}/{someParam}/countries', pathParams, {}, options), config)

// get: {apiUrl}/v1/countries/search/{id}
export const getCountryWithQuery = (pathParams, queryParams, options = {}) => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/v1/countries/search/{id}', pathParams, {}, queryParams]})
export const useGetCountryWithQuery = (pathParams, queryParams, config, options = {}) => useQuery({
  queryKey: pathParams && pathParams.id && ['{apiUrl}/v1/countries/search/{id}', pathParams, queryParams],
  queryFn: () => queryFn(generatorConfig)({ method: 'get', ...options })({ queryKey:['{apiUrl}/v1/countries/search/{id}', pathParams, {}, queryParams]}),
  ...config
})
useGetCountryWithQuery.queryKey = '{apiUrl}/v1/countries/search/{id}'

// post: {apiUrl}/v1/countries/search/{id}
export const searchCountries = (pathParams, body, queryParams, options = {}) => queryFn(generatorConfig)({ method: 'post', ...options })({ queryKey:['{apiUrl}/v1/countries/search/{id}', pathParams, body, queryParams]})
export const useSearchCountries = (pathParams, body, queryParams, config, options = {}) => useQuery({
  queryKey: pathParams && ['{apiUrl}/v1/countries/search/{id}', pathParams, body, queryParams],
  queryFn: () => queryFn(generatorConfig)({ method: 'post', ...options })({ queryKey:['{apiUrl}/v1/countries/search/{id}', pathParams, body, queryParams]}),
  ...config
})
useSearchCountries.queryKey = '{apiUrl}/v1/countries/search/{id}'
