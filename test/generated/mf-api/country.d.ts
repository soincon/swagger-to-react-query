/* eslint-disable */
/* tslint:disable */
import { UseQueryOptions, UseQueryResult, UseMutationOptions, MutateFunction, UseMutationResult } from 'react-query'
import { RequestInit } from 'node-fetch'

export type CountryDto = { versionLock?: number; active?: boolean; createdAt?: string; modifiedAt?: string; modifiedBy?: number; id?: number; name: string; isoCode: string; description?: string; links?: Link[] }

export type CountryFilter = { active?: boolean; id?: number; ids?: number[]; name?: string; isoCode?: string; description?: string }

export type PageDto = { content?: {}[]; page?: number; size?: number; totalElements?: number; empty?: boolean; first?: boolean; last?: boolean; numberOfElements?: number; totalPages?: number }

export type GetCountryPathParams = { clientId?: number; id: number }
/**
 * Returns the specified country

 * Retrieves the data that match with the specified identifier

 * https://swaggerDoc.com#/country-controller/getCountry
 */
export function getCountry(pathParams?: GetCountryPathParams, options?: RequestInit): Promise<CountryDto>;
/**
 * Returns the specified country

 * Retrieves the data that match with the specified identifier

 * https://swaggerDoc.com#/country-controller/getCountry
 */
export function useGetCountry(pathParams?: GetCountryPathParams, config?: UseQueryOptions<CountryDto>, options?: RequestInit): UseQueryResult<CountryDto>;
declare namespace useGetCountry {
    /** Entire key: `['{apiUrl}/v1/{clientId}/countries/{id}', pathParams]` */
    export const queryKey: string;
}

export type PutCountryPathParams = { clientId?: number; id: number }
/**
 * Updates the specified country

 * Updates the existing data with the specified one in the request body

 * https://swaggerDoc.com#/country-controller/putCountry
 */
export function putCountry(pathParams?: PutCountryPathParams, body?: CountryDto | [PutCountryPathParams?, void?, CountryDto?, RequestInit?], options?: RequestInit): Promise<CountryDto>;
/**
 * Updates the specified country

 * Updates the existing data with the specified one in the request body

 * https://swaggerDoc.com#/country-controller/putCountry
 */
export function usePutCountry(pathParams?: PutCountryPathParams, config?: UseMutationOptions<CountryDto, unknown, CountryDto>, options?: RequestInit): UseMutationResult<CountryDto, unknown, CountryDto>;
export type DeleteCountryPathParams = { id: number }
/**
 * Deletes permanently the specified country

 * Removes the existing data permanently

 * https://swaggerDoc.com#/country-controller/deleteCountry
 */
export function deleteCountry(pathParams?: DeleteCountryPathParams, options?: RequestInit): Promise<void>;
/**
 * Deletes permanently the specified country

 * Removes the existing data permanently

 * https://swaggerDoc.com#/country-controller/deleteCountry
 */
export function useDeleteCountry(pathParams?: DeleteCountryPathParams, config?: UseMutationOptions<void, unknown, void>, options?: RequestInit): UseMutationResult<void, unknown, void>;
export type PatchCountryPathParams = { id: number }
/**
 * Updates 'partially' the specified country

 * Updates the existing data with a structure which has the changes to apply (see rfc6902)

 * https://swaggerDoc.com#/country-controller/patchCountry
 */
export function patchCountry(pathParams?: PatchCountryPathParams, body?: JsonPatch | [PatchCountryPathParams?, void?, JsonPatch?, RequestInit?], options?: RequestInit): Promise<CountryDto>;
/**
 * Updates 'partially' the specified country

 * Updates the existing data with a structure which has the changes to apply (see rfc6902)

 * https://swaggerDoc.com#/country-controller/patchCountry
 */
export function usePatchCountry(pathParams?: PatchCountryPathParams, config?: UseMutationOptions<CountryDto, unknown, JsonPatch>, options?: RequestInit): UseMutationResult<CountryDto, unknown, JsonPatch>;
/**
 * Creates a new country

 * Creates a new country using the specified data

 * https://swaggerDoc.com#/country-controller/postCountry
 */
export function postCountry(body?: CountryDto | [void?, void?, CountryDto?, RequestInit?], options?: RequestInit): Promise<CountryDto>;
/**
 * Creates a new country

 * Creates a new country using the specified data

 * https://swaggerDoc.com#/country-controller/postCountry
 */
export function usePostCountry(config?: UseMutationOptions<CountryDto, unknown, CountryDto>, options?: RequestInit): UseMutationResult<CountryDto, unknown, CountryDto>;
export type PostCountryWithPathParamsPathParams = { clientId?: number; someParam: number }
/**
 * Creates a new country

 * Creates a new country using the specified data

 * https://swaggerDoc.com#/country-controller/postCountryWithPathParams
 */
export function postCountryWithPathParams(pathParams?: PostCountryWithPathParamsPathParams, body?: CountryDto | [PostCountryWithPathParamsPathParams?, void?, CountryDto?, RequestInit?], options?: RequestInit): Promise<CountryDto>;
/**
 * Creates a new country

 * Creates a new country using the specified data

 * https://swaggerDoc.com#/country-controller/postCountryWithPathParams
 */
export function usePostCountryWithPathParams(pathParams?: PostCountryWithPathParamsPathParams, config?: UseMutationOptions<CountryDto, unknown, CountryDto>, options?: RequestInit): UseMutationResult<CountryDto, unknown, CountryDto>;
export type GetCountryWithQueryPathParams = { clientId?: number; id: number }
export type GetCountryWithQueryQueryParams = { param?: number }
/**
 * 
 * 
 * https://swaggerDoc.com#/country-controller/getCountryWithQuery
 */
export function getCountryWithQuery(pathParams?: GetCountryWithQueryPathParams, queryParams?: GetCountryWithQueryQueryParams, options?: RequestInit): Promise<CountryDto>;
/**
 * 
 * 
 * https://swaggerDoc.com#/country-controller/getCountryWithQuery
 */
export function useGetCountryWithQuery(pathParams?: GetCountryWithQueryPathParams, queryParams?: GetCountryWithQueryQueryParams, config?: UseQueryOptions<CountryDto>, options?: RequestInit): UseQueryResult<CountryDto>;
declare namespace useGetCountryWithQuery {
    /** Entire key: `['{apiUrl}/v1/countries/search/{id}', pathParams, queryParams]` */
    export const queryKey: string;
}

export type SearchCountriesPathParams = { id?: number }
export type SearchCountriesQueryParams = { page?: number; size?: number; sort?: string[] }
/**
 * Returns all countries which match with the specified filter

 * Retrieves every country for the specified filter

 * https://swaggerDoc.com#/country-controller/searchCountries
 */
export function searchCountries(pathParams?: SearchCountriesPathParams, body?: CountryFilter | [SearchCountriesPathParams?, SearchCountriesQueryParams?, CountryFilter?, RequestInit?], queryParams?: SearchCountriesQueryParams, options?: RequestInit): Promise<PageDto>;
/**
 * Returns all countries which match with the specified filter

 * Retrieves every country for the specified filter

 * https://swaggerDoc.com#/country-controller/searchCountries
 */
export function useSearchCountries(pathParams?: SearchCountriesPathParams, body?: CountryFilter, queryParams?: SearchCountriesQueryParams, config?: UseQueryOptions<PageDto>, options?: RequestInit): UseQueryResult<PageDto>;
declare namespace useSearchCountries {
    /** Entire key: `['{apiUrl}/v1/countries/search/{id}', pathParams, body, queryParams]` */
    export const queryKey: string;
}

