import { Action } from '@ngrx/store';
import {
  CountryDto,
  LanguageDto,
  Page,
  CountryStats,
  RegionDto,
  YearRange,
  CountryStatsOverviewDto,
} from '../models/country.models';

export const LOAD_COUNTRIES = '[Countries] Load Countries';
export const LOAD_COUNTRIES_SUCCESS = '[Countries] Load Countries Success';
export const LOAD_COUNTRIES_FAILURE = '[Countries] Load Countries Failure';
export const SET_CURRENT_PAGE = '[Countries] Set Current Page';
export const SET_PAGE_SIZE = '[Countries] Set Page Size';
export const RESET_PAGINATION = '[Countries] Reset Pagination';
export const INITIALIZE_PAGINATION = '[Countries] Initialize Pagination';
export const SET_FILTERS = '[Countries] Set Filters';
export const CLEAR_FILTERS = '[Countries] Clear Filters';
export const CLEAR_COUNTRIES = '[Countries] Clear Countries';
export const RESET_ERROR = '[Countries] Reset Error';

export const LOAD_COUNTRY_LANGUAGES = '[Countries] Load Country Languages';
export const LOAD_COUNTRY_LANGUAGES_SUCCESS =
  '[Countries] Load Country Languages Success';
export const LOAD_COUNTRY_LANGUAGES_FAILURE =
  '[Countries] Load Country Languages Failure';
export const CLEAR_COUNTRY_LANGUAGES = '[Countries] Clear Country Languages';
export const SET_SELECTED_COUNTRY = '[Countries] Set Selected Country';

export const LOAD_COUNTRY_STATS = '[Countries] Load Country Stats';
export const LOAD_COUNTRY_STATS_SUCCESS =
  '[Countries] Load Country Stats Success';
export const LOAD_COUNTRY_STATS_FAILURE =
  '[Countries] Load Country Stats Failure';
export const SET_COUNTRY_STATS_PAGE = '[Countries] Set Country Stats Page';
export const SET_COUNTRY_STATS_PAGE_SIZE =
  '[Countries] Set Country Stats Page Size';
export const CLEAR_COUNTRY_STATS = '[Countries] Clear Country Stats';
export const LOAD_REGIONS = '[ManagementInfo] Load Regions';
export const LOAD_REGIONS_SUCCESS = '[ManagementInfo] Load Regions Success';
export const LOAD_REGIONS_FAILURE = '[ManagementInfo] Load Regions Failure';
export const LOAD_YEAR_RANGE = '[ManagementInfo] Load Year Range';
export const LOAD_YEAR_RANGE_SUCCESS =
  '[ManagementInfo] Load Year Range Success';
export const LOAD_YEAR_RANGE_FAILURE =
  '[ManagementInfo] Load Year Range Failure';
export const LOAD_COUNTRY_STATS_OVERVIEW =
  '[Countries] Load Country Stats Overview';
export const LOAD_COUNTRY_STATS_OVERVIEW_SUCCESS =
  '[Countries] Load Country Stats Overview Success';
export const LOAD_COUNTRY_STATS_OVERVIEW_FAILURE =
  '[Countries] Load Country Stats Overview Failure';
export const SET_COUNTRY_STATS_OVERVIEW_PAGE =
  '[Countries] Set Country Stats Overview Page';
export const SET_COUNTRY_STATS_OVERVIEW_PAGE_SIZE =
  '[Countries] Set Country Stats Overview Page Size';
export const SET_COUNTRY_STATS_OVERVIEW_FILTERS =
  '[Countries] Set Country Stats Overview Filters';
export const CLEAR_COUNTRY_STATS_OVERVIEW =
  '[Countries] Clear Country Stats Overview';

export class LoadCountriesAction implements Action {
  readonly type = LOAD_COUNTRIES;

  constructor(public payload: { page: number; size: number; filters?: any }) {}
}

export class LoadCountriesSuccessAction implements Action {
  readonly type = LOAD_COUNTRIES_SUCCESS;

  constructor(public payload: { response: Page<CountryDto> }) {}
}

export class LoadCountriesFailureAction implements Action {
  readonly type = LOAD_COUNTRIES_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class SetCurrentPageAction implements Action {
  readonly type = SET_CURRENT_PAGE;

  constructor(public payload: { page: number }) {}
}

export class SetPageSizeAction implements Action {
  readonly type = SET_PAGE_SIZE;

  constructor(public payload: { size: number }) {}
}

export class ResetPaginationAction implements Action {
  readonly type = RESET_PAGINATION;

  constructor() {}
}

export class InitializePaginationAction implements Action {
  readonly type = INITIALIZE_PAGINATION;

  constructor(public payload: { page: number; size: number }) {}
}

export class SetFiltersAction implements Action {
  readonly type = SET_FILTERS;

  constructor(public payload: { filters: any }) {}
}

export class ClearFiltersAction implements Action {
  readonly type = CLEAR_FILTERS;

  constructor() {}
}

export class ClearCountriesAction implements Action {
  readonly type = CLEAR_COUNTRIES;

  constructor() {}
}

export class ResetErrorAction implements Action {
  readonly type = RESET_ERROR;

  constructor() {}
}

// New language-related action classes
export class LoadCountryLanguagesAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES;

  constructor(public payload: { countryId: number }) {}
}

export class LoadCountryLanguagesSuccessAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES_SUCCESS;

  constructor(public payload: { languages: LanguageDto[] }) {}
}

export class LoadCountryLanguagesFailureAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class ClearCountryLanguagesAction implements Action {
  readonly type = CLEAR_COUNTRY_LANGUAGES;

  constructor() {}
}

export class SetSelectedCountryAction implements Action {
  readonly type = SET_SELECTED_COUNTRY;

  constructor(public payload: { country: CountryDto }) {}
}

export class LoadCountryStatsAction implements Action {
  readonly type = LOAD_COUNTRY_STATS;

  constructor(public payload: { page: number; size: number }) {}
}

export class LoadCountryStatsSuccessAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_SUCCESS;

  constructor(public payload: { response: Page<CountryStats> }) {}
}

export class LoadCountryStatsFailureAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class SetCountryStatsPageAction implements Action {
  readonly type = SET_COUNTRY_STATS_PAGE;

  constructor(public payload: { page: number }) {}
}

export class SetCountryStatsPageSizeAction implements Action {
  readonly type = SET_COUNTRY_STATS_PAGE_SIZE;

  constructor(public payload: { size: number }) {}
}

export class ClearCountryStatsAction implements Action {
  readonly type = CLEAR_COUNTRY_STATS;

  constructor() {}
}

export class LoadRegionsAction implements Action {
  readonly type = LOAD_REGIONS;
  constructor() {}
}

export class LoadRegionsSuccessAction implements Action {
  readonly type = LOAD_REGIONS_SUCCESS;
  constructor(public payload: { regions: RegionDto[] }) {}
}

export class LoadRegionsFailureAction implements Action {
  readonly type = LOAD_REGIONS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadYearRangeAction implements Action {
  readonly type = LOAD_YEAR_RANGE;
  constructor() {}
}

export class LoadYearRangeSuccessAction implements Action {
  readonly type = LOAD_YEAR_RANGE_SUCCESS;
  constructor(public payload: { yearRange: YearRange }) {}
}

export class LoadYearRangeFailureAction implements Action {
  readonly type = LOAD_YEAR_RANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadCountryStatsOverviewAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_OVERVIEW;
  constructor(public payload: { page: number; size: number; filters?: any }) {}
}
export class LoadCountryStatsOverviewSuccessAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_OVERVIEW_SUCCESS;
  constructor(public payload: { response: Page<CountryStatsOverviewDto> }) {}
}
export class LoadCountryStatsOverviewFailureAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_OVERVIEW_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class SetCountryStatsOverviewPageAction implements Action {
  readonly type = SET_COUNTRY_STATS_OVERVIEW_PAGE;
  constructor(public payload: { page: number }) {}
}
export class SetCountryStatsOverviewPageSizeAction implements Action {
  readonly type = SET_COUNTRY_STATS_OVERVIEW_PAGE_SIZE;
  constructor(public payload: { size: number }) {}
}
export class SetCountryStatsOverviewFiltersAction implements Action {
  readonly type = SET_COUNTRY_STATS_OVERVIEW_FILTERS;
  constructor(public payload: { filters: any }) {}
}
export class ClearCountryStatsOverviewAction implements Action {
  readonly type = CLEAR_COUNTRY_STATS_OVERVIEW;
  constructor() {}
}

export type CountriesActions =
  | LoadCountriesAction
  | LoadCountriesSuccessAction
  | LoadCountriesFailureAction
  | SetCurrentPageAction
  | SetPageSizeAction
  | ResetPaginationAction
  | InitializePaginationAction
  | SetFiltersAction
  | ClearFiltersAction
  | ClearCountriesAction
  | ResetErrorAction
  | LoadCountryLanguagesAction
  | LoadCountryLanguagesSuccessAction
  | LoadCountryLanguagesFailureAction
  | ClearCountryLanguagesAction
  | SetSelectedCountryAction
  | LoadCountryStatsAction
  | LoadCountryStatsSuccessAction
  | LoadCountryStatsFailureAction
  | SetCountryStatsPageAction
  | SetCountryStatsPageSizeAction
  | ClearCountryStatsAction;

export const loadCountries = (payload: {
  page: number;
  size: number;
  filters?: any;
}) => new LoadCountriesAction(payload);

export const loadCountriesSuccess = (payload: { response: Page<CountryDto> }) =>
  new LoadCountriesSuccessAction(payload);

export const loadCountriesFailure = (payload: { error: string }) =>
  new LoadCountriesFailureAction(payload);

export const setCurrentPage = (payload: { page: number }) =>
  new SetCurrentPageAction(payload);

export const setPageSize = (payload: { size: number }) =>
  new SetPageSizeAction(payload);

export const resetPagination = () => new ResetPaginationAction();

export const initializePagination = (payload: { page: number; size: number }) =>
  new InitializePaginationAction(payload);

export const setFilters = (payload: { filters: any }) =>
  new SetFiltersAction(payload);

export const clearFilters = () => new ClearFiltersAction();

export const clearCountries = () => new ClearCountriesAction();

export const resetError = () => new ResetErrorAction();

export const loadCountryLanguages = (payload: { countryId: number }) =>
  new LoadCountryLanguagesAction(payload);

export const loadCountryLanguagesSuccess = (payload: {
  languages: LanguageDto[];
}) => new LoadCountryLanguagesSuccessAction(payload);

export const loadCountryLanguagesFailure = (payload: { error: string }) =>
  new LoadCountryLanguagesFailureAction(payload);

export const clearCountryLanguages = () => new ClearCountryLanguagesAction();

export const setSelectedCountry = (payload: { country: CountryDto }) =>
  new SetSelectedCountryAction(payload);

export const loadCountryStats = (payload: { page: number; size: number }) =>
  new LoadCountryStatsAction(payload);

export const loadCountryStatsSuccess = (payload: {
  response: Page<CountryStats>;
}) => new LoadCountryStatsSuccessAction(payload);

export const loadCountryStatsFailure = (payload: { error: string }) =>
  new LoadCountryStatsFailureAction(payload);

export const setCountryStatsPage = (payload: { page: number }) =>
  new SetCountryStatsPageAction(payload);

export const setCountryStatsPageSize = (payload: { size: number }) =>
  new SetCountryStatsPageSizeAction(payload);

export const clearCountryStats = () => new ClearCountryStatsAction();

export const loadRegions = () => new LoadRegionsAction();

export const loadRegionsSuccess = (payload: { regions: RegionDto[] }) =>
  new LoadRegionsSuccessAction(payload);

export const loadRegionsFailure = (payload: { error: string }) =>
  new LoadRegionsFailureAction(payload);

export const loadYearRange = () => new LoadYearRangeAction();

export const loadYearRangeSuccess = (payload: { yearRange: YearRange }) =>
  new LoadYearRangeSuccessAction(payload);

export const loadYearRangeFailure = (payload: { error: string }) =>
  new LoadYearRangeFailureAction(payload);

export const loadCountryStatsOverview = (payload: {
  page: number;
  size: number;
  filters?: any;
}) => new LoadCountryStatsOverviewAction(payload);

export const loadCountryStatsOverviewSuccess = (payload: {
  response: Page<CountryStatsOverviewDto>;
}) => new LoadCountryStatsOverviewSuccessAction(payload);

export const loadCountryStatsOverviewFailure = (payload: { error: string }) =>
  new LoadCountryStatsOverviewFailureAction(payload);

export const setCountryStatsOverviewPage = (payload: { page: number }) =>
  new SetCountryStatsOverviewPageAction(payload);

export const setCountryStatsOverviewPageSize = (payload: { size: number }) =>
  new SetCountryStatsOverviewPageSizeAction(payload);

export const setCountryStatsOverviewFilters = (payload: { filters: any }) =>
  new SetCountryStatsOverviewFiltersAction(payload);

export const clearCountryStatsOverview = () =>
  new ClearCountryStatsOverviewAction();
