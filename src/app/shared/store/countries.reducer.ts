import { createReducer, on } from '@ngrx/store';
import { CountriesState, initialCountriesState } from './state';
import * as CountriesActions from './countries.actions';

// Individual reducer functions following your pattern
const startLoading = (state: CountriesState): CountriesState => ({
  ...state,
  loading: true,
  error: null,
});

const endLoading = (state: CountriesState): CountriesState => ({
  ...state,
  loading: false,
});

const loadCountriesSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountriesSuccessAction,
): CountriesState => ({
  ...state,
  loading: false,
  error: null,
  countries: action.payload.response.content,
  pagination: {
    ...state.pagination,
    currentPage: action.payload.response.pageable.pageNumber,
    pageSize: action.payload.response.pageable.pageSize,
    totalElements: action.payload.response.totalElements,
    totalPages: action.payload.response.totalPages,
  },
});

const loadCountriesFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountriesFailureAction,
): CountriesState => ({
  ...state,
  loading: false,
  error: action.payload.error,
  countries: [],
});

const setCurrentPage = (
  state: CountriesState,
  action: CountriesActions.SetCurrentPageAction,
): CountriesState => ({
  ...state,
  pagination: {
    ...state.pagination,
    currentPage: action.payload.page,
  },
});

const setPageSize = (
  state: CountriesState,
  action: CountriesActions.SetPageSizeAction,
): CountriesState => ({
  ...state,
  pagination: {
    ...state.pagination,
    pageSize: action.payload.size,
    currentPage: 0, // Reset to first page when changing page size
  },
});

const setFilters = (
  state: CountriesState,
  action: CountriesActions.SetFiltersAction,
): CountriesState => ({
  ...state,
  filters: {
    ...state.filters,
    ...action.payload.filters,
  },
  pagination: {
    ...state.pagination,
    currentPage: 0, // Reset to first page when filtering
  },
});

const clearFilters = (state: CountriesState): CountriesState => ({
  ...state,
  filters: {
    region: undefined,
    searchQuery: undefined,
    yearFrom: undefined,
    yearTo: undefined,
  },
  pagination: {
    ...state.pagination,
    currentPage: 0, // Reset to first page when clearing filters
  },
});

const resetPagination = (state: CountriesState): CountriesState => ({
  ...state,
  pagination: {
    ...initialCountriesState.pagination,
  },
});

const initializePagination = (
  state: CountriesState,
  action: CountriesActions.InitializePaginationAction,
): CountriesState => ({
  ...state,
  pagination: {
    ...state.pagination,
    currentPage: action.payload.page,
    pageSize: action.payload.size,
  },
});

const clearCountries = (state: CountriesState): CountriesState => ({
  ...state,
  countries: [],
  pagination: {
    ...state.pagination,
    totalElements: 0,
    totalPages: 0,
  },
});

const resetError = (state: CountriesState): CountriesState => ({
  ...state,
  error: null,
});

// New language-related reducer functions
const startLoadingLanguages = (state: CountriesState): CountriesState => ({
  ...state,
  languagesLoading: true,
  languagesError: null,
});

const loadCountryLanguagesSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountryLanguagesSuccessAction,
): CountriesState => ({
  ...state,
  languagesLoading: false,
  languagesError: null,
  languages: action.payload.languages,
});

const loadCountryLanguagesFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountryLanguagesFailureAction,
): CountriesState => ({
  ...state,
  languagesLoading: false,
  languagesError: action.payload.error,
  languages: [],
});

const clearCountryLanguages = (state: CountriesState): CountriesState => ({
  ...state,
  languages: [],
  languagesError: null,
});

const setSelectedCountry = (
  state: CountriesState,
  action: CountriesActions.SetSelectedCountryAction,
): CountriesState => ({
  ...state,
  selectedCountry: action.payload.country,
});

// Country stats-related reducer functions
const startLoadingCountryStats = (state: CountriesState): CountriesState => ({
  ...state,
  countryStatsLoading: true,
  countryStatsError: null,
});

const loadCountryStatsSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountryStatsSuccessAction,
): CountriesState => ({
  ...state,
  countryStatsLoading: false,
  countryStatsError: null,
  countryStats: action.payload.response.content,
  countryStatsPagination: {
    ...state.countryStatsPagination,
    currentPage: action.payload.response.pageable.pageNumber,
    pageSize: action.payload.response.pageable.pageSize,
    totalElements: action.payload.response.totalElements,
    totalPages: action.payload.response.totalPages,
  },
});

const loadCountryStatsFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountryStatsFailureAction,
): CountriesState => ({
  ...state,
  countryStatsLoading: false,
  countryStatsError: action.payload.error,
  countryStats: [],
});

const setCountryStatsPage = (
  state: CountriesState,
  action: CountriesActions.SetCountryStatsPageAction,
): CountriesState => ({
  ...state,
  countryStatsPagination: {
    ...state.countryStatsPagination,
    currentPage: action.payload.page,
  },
});

const setCountryStatsPageSize = (
  state: CountriesState,
  action: CountriesActions.SetCountryStatsPageSizeAction,
): CountriesState => ({
  ...state,
  countryStatsPagination: {
    ...state.countryStatsPagination,
    pageSize: action.payload.size,
    currentPage: 0, // Reset to first page when changing page size
  },
});

const clearCountryStats = (state: CountriesState): CountriesState => ({
  ...state,
  countryStats: [],
  countryStatsError: null,
  countryStatsPagination: {
    ...state.countryStatsPagination,
    totalElements: 0,
    totalPages: 0,
  },
});

// Action to reducer function mapping following your pattern
const actionToReducerMap: {
  [key: string]: (state: CountriesState, action?: any) => CountriesState;
} = {
  [CountriesActions.LOAD_COUNTRIES]: startLoading,
  [CountriesActions.LOAD_COUNTRIES_SUCCESS]: loadCountriesSuccess,
  [CountriesActions.LOAD_COUNTRIES_FAILURE]: loadCountriesFailure,
  [CountriesActions.SET_CURRENT_PAGE]: setCurrentPage,
  [CountriesActions.SET_PAGE_SIZE]: setPageSize,
  [CountriesActions.RESET_PAGINATION]: resetPagination,
  [CountriesActions.INITIALIZE_PAGINATION]: initializePagination,
  [CountriesActions.SET_FILTERS]: setFilters,
  [CountriesActions.CLEAR_FILTERS]: clearFilters,
  [CountriesActions.CLEAR_COUNTRIES]: clearCountries,
  [CountriesActions.RESET_ERROR]: resetError,
  // New language-related action mappings
  [CountriesActions.LOAD_COUNTRY_LANGUAGES]: startLoadingLanguages,
  [CountriesActions.LOAD_COUNTRY_LANGUAGES_SUCCESS]:
    loadCountryLanguagesSuccess,
  [CountriesActions.LOAD_COUNTRY_LANGUAGES_FAILURE]:
    loadCountryLanguagesFailure,
  [CountriesActions.CLEAR_COUNTRY_LANGUAGES]: clearCountryLanguages,
  [CountriesActions.SET_SELECTED_COUNTRY]: setSelectedCountry,
  // Country stats-related action mappings
  [CountriesActions.LOAD_COUNTRY_STATS]: startLoadingCountryStats,
  [CountriesActions.LOAD_COUNTRY_STATS_SUCCESS]: loadCountryStatsSuccess,
  [CountriesActions.LOAD_COUNTRY_STATS_FAILURE]: loadCountryStatsFailure,
  [CountriesActions.SET_COUNTRY_STATS_PAGE]: setCountryStatsPage,
  [CountriesActions.SET_COUNTRY_STATS_PAGE_SIZE]: setCountryStatsPageSize,
  [CountriesActions.CLEAR_COUNTRY_STATS]: clearCountryStats,
};

// Main reducer function following your pattern
export function countriesReducerWithMap(
  state: CountriesState = initialCountriesState,
  action: any,
): CountriesState {
  const reducerFn = actionToReducerMap[action.type];
  if (reducerFn) {
    return reducerFn(state, action);
  }

  return state;
}

// Export the map-based reducer as the main reducer
export const countriesReducer = countriesReducerWithMap;
