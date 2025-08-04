import { Action } from '@ngrx/store';
import {
  CountryDto,
  LanguageDto,
  Page,
  CountryStats,
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

// New language-related actions
export const LOAD_COUNTRY_LANGUAGES = '[Countries] Load Country Languages';
export const LOAD_COUNTRY_LANGUAGES_SUCCESS =
  '[Countries] Load Country Languages Success';
export const LOAD_COUNTRY_LANGUAGES_FAILURE =
  '[Countries] Load Country Languages Failure';
export const CLEAR_COUNTRY_LANGUAGES = '[Countries] Clear Country Languages';
export const SET_SELECTED_COUNTRY = '[Countries] Set Selected Country';

// Country stats-related actions
export const LOAD_COUNTRY_STATS = '[Countries] Load Country Stats';
export const LOAD_COUNTRY_STATS_SUCCESS =
  '[Countries] Load Country Stats Success';
export const LOAD_COUNTRY_STATS_FAILURE =
  '[Countries] Load Country Stats Failure';
export const SET_COUNTRY_STATS_PAGE = '[Countries] Set Country Stats Page';
export const SET_COUNTRY_STATS_PAGE_SIZE =
  '[Countries] Set Country Stats Page Size';
export const CLEAR_COUNTRY_STATS = '[Countries] Clear Country Stats';

export const ACTION_LOG_MESSAGES = {
  LOAD_COUNTRIES_START: 'Starting to load countries with pagination',
  LOAD_COUNTRIES_SUCCESS: 'Successfully loaded countries from API',
  LOAD_COUNTRIES_FAILURE: 'Failed to load countries from API',
  SET_CURRENT_PAGE_START: 'Updating current page number',
  SET_PAGE_SIZE_START: 'Updating page size configuration',
  RESET_PAGINATION_START: 'Resetting pagination to initial state',
  INITIALIZE_PAGINATION_START:
    'Initializing pagination with dynamic parameters',
  SET_FILTERS_START: 'Applying new filters to countries list',
  CLEAR_FILTERS_START: 'Clearing all applied filters',
  CLEAR_COUNTRIES_START: 'Clearing countries data from state',
  RESET_ERROR_START: 'Resetting error state',
  // New language-related log messages
  LOAD_COUNTRY_LANGUAGES_START: 'Starting to load languages for country',
  LOAD_COUNTRY_LANGUAGES_SUCCESS: 'Successfully loaded languages for country',
  LOAD_COUNTRY_LANGUAGES_FAILURE: 'Failed to load languages for country',
  CLEAR_COUNTRY_LANGUAGES_START: 'Clearing country languages data',
  SET_SELECTED_COUNTRY_START: 'Setting selected country',
  // Country stats-related log messages
  LOAD_COUNTRY_STATS_START:
    'Starting to load country statistics with pagination',
  LOAD_COUNTRY_STATS_SUCCESS: 'Successfully loaded country statistics from API',
  LOAD_COUNTRY_STATS_FAILURE: 'Failed to load country statistics from API',
  SET_COUNTRY_STATS_PAGE_START: 'Updating country stats page number',
  SET_COUNTRY_STATS_PAGE_SIZE_START:
    'Updating country stats page size configuration',
  CLEAR_COUNTRY_STATS_START: 'Clearing country statistics data',
} as const;

export const ACTION_ERROR_MESSAGES = {
  LOAD_COUNTRIES_FAILURE: 'Error occurred while loading countries',
  NETWORK_ERROR: 'Network connection error while fetching countries',
  SERVER_ERROR: 'Server error occurred during countries operation',
  VALIDATION_ERROR: 'Validation error in countries request',
  TIMEOUT_ERROR: 'Request timeout while loading countries',
  // New language-related error messages
  LOAD_COUNTRY_LANGUAGES_FAILURE:
    'Error occurred while loading country languages',
  // Country stats-related error messages
  LOAD_COUNTRY_STATS_FAILURE: 'Error occurred while loading country statistics',
} as const;

export class LoadCountriesAction implements Action {
  readonly type = LOAD_COUNTRIES;

  constructor(public payload: { page: number; size: number; filters?: any }) {
    console.log(ACTION_LOG_MESSAGES.LOAD_COUNTRIES_START, this.payload);
  }
}

export class LoadCountriesSuccessAction implements Action {
  readonly type = LOAD_COUNTRIES_SUCCESS;

  constructor(public payload: { response: Page<CountryDto> }) {
    console.log(ACTION_LOG_MESSAGES.LOAD_COUNTRIES_SUCCESS, this.payload);
  }
}

export class LoadCountriesFailureAction implements Action {
  readonly type = LOAD_COUNTRIES_FAILURE;

  constructor(public payload: { error: string }) {
    console.error(ACTION_LOG_MESSAGES.LOAD_COUNTRIES_FAILURE, this.payload);
  }
}

export class SetCurrentPageAction implements Action {
  readonly type = SET_CURRENT_PAGE;

  constructor(public payload: { page: number }) {
    console.log(ACTION_LOG_MESSAGES.SET_CURRENT_PAGE_START, this.payload);
  }
}

export class SetPageSizeAction implements Action {
  readonly type = SET_PAGE_SIZE;

  constructor(public payload: { size: number }) {
    console.log(ACTION_LOG_MESSAGES.SET_PAGE_SIZE_START, this.payload);
  }
}

export class ResetPaginationAction implements Action {
  readonly type = RESET_PAGINATION;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.RESET_PAGINATION_START);
  }
}

export class InitializePaginationAction implements Action {
  readonly type = INITIALIZE_PAGINATION;

  constructor(public payload: { page: number; size: number }) {
    console.log(ACTION_LOG_MESSAGES.INITIALIZE_PAGINATION_START, this.payload);
  }
}

export class SetFiltersAction implements Action {
  readonly type = SET_FILTERS;

  constructor(public payload: { filters: any }) {
    console.log(ACTION_LOG_MESSAGES.SET_FILTERS_START, this.payload);
  }
}

export class ClearFiltersAction implements Action {
  readonly type = CLEAR_FILTERS;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.CLEAR_FILTERS_START);
  }
}

export class ClearCountriesAction implements Action {
  readonly type = CLEAR_COUNTRIES;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.CLEAR_COUNTRIES_START);
  }
}

export class ResetErrorAction implements Action {
  readonly type = RESET_ERROR;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.RESET_ERROR_START);
  }
}

// New language-related action classes
export class LoadCountryLanguagesAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES;

  constructor(public payload: { countryId: number }) {
    console.log(ACTION_LOG_MESSAGES.LOAD_COUNTRY_LANGUAGES_START, this.payload);
  }
}

export class LoadCountryLanguagesSuccessAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES_SUCCESS;

  constructor(public payload: { languages: LanguageDto[] }) {
    console.log(
      ACTION_LOG_MESSAGES.LOAD_COUNTRY_LANGUAGES_SUCCESS,
      this.payload,
    );
  }
}

export class LoadCountryLanguagesFailureAction implements Action {
  readonly type = LOAD_COUNTRY_LANGUAGES_FAILURE;

  constructor(public payload: { error: string }) {
    console.error(
      ACTION_LOG_MESSAGES.LOAD_COUNTRY_LANGUAGES_FAILURE,
      this.payload,
    );
  }
}

export class ClearCountryLanguagesAction implements Action {
  readonly type = CLEAR_COUNTRY_LANGUAGES;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.CLEAR_COUNTRY_LANGUAGES_START);
  }
}

export class SetSelectedCountryAction implements Action {
  readonly type = SET_SELECTED_COUNTRY;

  constructor(public payload: { country: CountryDto }) {
    console.log(ACTION_LOG_MESSAGES.SET_SELECTED_COUNTRY_START, this.payload);
  }
}

// Country stats action classes
export class LoadCountryStatsAction implements Action {
  readonly type = LOAD_COUNTRY_STATS;

  constructor(public payload: { page: number; size: number }) {
    console.log(ACTION_LOG_MESSAGES.LOAD_COUNTRY_STATS_START, this.payload);
  }
}

export class LoadCountryStatsSuccessAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_SUCCESS;

  constructor(public payload: { response: Page<CountryStats> }) {
    console.log(ACTION_LOG_MESSAGES.LOAD_COUNTRY_STATS_SUCCESS, this.payload);
  }
}

export class LoadCountryStatsFailureAction implements Action {
  readonly type = LOAD_COUNTRY_STATS_FAILURE;

  constructor(public payload: { error: string }) {
    console.error(ACTION_LOG_MESSAGES.LOAD_COUNTRY_STATS_FAILURE, this.payload);
  }
}

export class SetCountryStatsPageAction implements Action {
  readonly type = SET_COUNTRY_STATS_PAGE;

  constructor(public payload: { page: number }) {
    console.log(ACTION_LOG_MESSAGES.SET_COUNTRY_STATS_PAGE_START, this.payload);
  }
}

export class SetCountryStatsPageSizeAction implements Action {
  readonly type = SET_COUNTRY_STATS_PAGE_SIZE;

  constructor(public payload: { size: number }) {
    console.log(
      ACTION_LOG_MESSAGES.SET_COUNTRY_STATS_PAGE_SIZE_START,
      this.payload,
    );
  }
}

export class ClearCountryStatsAction implements Action {
  readonly type = CLEAR_COUNTRY_STATS;

  constructor() {
    console.log(ACTION_LOG_MESSAGES.CLEAR_COUNTRY_STATS_START);
  }
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

// New language-related action creators
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

// Country stats action creators
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
