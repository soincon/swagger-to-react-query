/* eslint-disable */
/* tslint:disable */
import { UseQueryOptions, UseQueryResult, UseMutationOptions, MutateFunction, UseMutationResult } from 'react-query'
import { RequestInit } from 'node-fetch'

export type CountryDto = { versionLock?: number; active?: boolean; createdAt?: string; modifiedAt?: string; modifiedBy?: number; id?: number; name: string; isoCode: string; description?: string; links?: Link[] }

export type CountryFilter = { active?: boolean; id?: number; ids?: number[]; name?: string; isoCode?: string; description?: string }

export type PageDto = { content?: {}[]; page?: number; size?: number; totalElements?: number; empty?: boolean; first?: boolean; last?: boolean; numberOfElements?: number; totalPages?: number }

/**
 * Creates a new foo

 * Creates a new country using the specified data

 * https://swaggerDoc.com/foo-bar-controller/postFooBar
 */
export function postFooBar(options?: RequestInit): Promise<CountryDto>;
/**
 * Creates a new foo

 * Creates a new country using the specified data

 * https://swaggerDoc.com/foo-bar-controller/postFooBar
 */
export function usePostFooBar(config?: UseQueryOptions<CountryDto>, options?: RequestInit): UseQueryResult<CountryDto>;
declare namespace usePostFooBar {
    /** Entire key: `['{apiUrl}/v1/foo', ]` */
    export const queryKey: string;
}

