/* eslint-disable */
/* tslint:disable */
import { UseQueryOptions, UseQueryResult, UseMutationOptions, MutateFunction, UseMutationResult } from 'react-query'
import { RequestInit } from 'node-fetch'


export type GetMePathParams = { clientId?: number }
/**
 * Returns the specified country

 * Retrieves the data that match with the specified identifier

 * https://swaggerDoc.com/little-controller/getMe
 */
export function getMe(pathParams?: GetMePathParams, options?: RequestInit): Promise<CountryDto>;
/**
 * Returns the specified country

 * Retrieves the data that match with the specified identifier

 * https://swaggerDoc.com/little-controller/getMe
 */
export function useGetMe(pathParams?: GetMePathParams, config?: UseQueryOptions<CountryDto>, options?: RequestInit): UseQueryResult<CountryDto>;
declare namespace useGetMe {
    /** Entire key: `['{apiUrl}/getMe/{clientId}', pathParams]` */
    export const queryKey: string;
}

