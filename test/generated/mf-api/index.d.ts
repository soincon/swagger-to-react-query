/* eslint-disable */
/* tslint:disable */
export type CountryDto = { versionLock?: number; active?: boolean; createdAt?: string; modifiedAt?: string; modifiedBy?: number; id?: number; name: string; isoCode: string; description?: string; links?: Link[] }

export type CountryFilter = { active?: boolean; id?: number; ids?: number[]; name?: string; isoCode?: string; description?: string }

export type PageDto = { content?: {}[]; page?: number; size?: number; totalElements?: number; empty?: boolean; first?: boolean; last?: boolean; numberOfElements?: number; totalPages?: number }


