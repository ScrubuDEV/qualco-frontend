import { createReducer, on } from '@ngrx/store';
import { CountriesState, initialCountriesState } from './state';
import * as CountriesActions from './countries.actions';

const startLoading = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    loading: true,
    error: null,
  },
});

const endLoading = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    loading: false,
  },
});

const loadCountriesSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountriesSuccessAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    loading: false,
    error: null,
    data: action.payload.response.content,
    pagination: {
      ...state.countriesList.pagination,
      currentPage: action.payload.response.pageable.pageNumber,
      pageSize: action.payload.response.pageable.pageSize,
      totalElements: action.payload.response.totalElements,
      totalPages: action.payload.response.totalPages,
    },
  },
});

const loadCountriesFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountriesFailureAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    loading: false,
    error: action.payload.error,
    data: [],
  },
});

const setCurrentPage = (
  state: CountriesState,
  action: CountriesActions.SetCurrentPageAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    pagination: {
      ...state.countriesList.pagination,
      currentPage: action.payload.page,
    },
  },
});

const setPageSize = (
  state: CountriesState,
  action: CountriesActions.SetPageSizeAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    pagination: {
      ...state.countriesList.pagination,
      pageSize: action.payload.size,
      currentPage: 0,
    },
  },
});

const setFilters = (
  state: CountriesState,
  action: CountriesActions.SetFiltersAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    filters: {
      ...state.countriesList.filters,
      ...action.payload.filters,
    },
    pagination: {
      ...state.countriesList.pagination,
      currentPage: 0,
    },
  },
});

const clearFilters = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    filters: {
      region: undefined,
      searchQuery: undefined,
      yearFrom: undefined,
      yearTo: undefined,
    },
    pagination: {
      ...state.countriesList.pagination,
      currentPage: 0,
    },
  },
});

const resetPagination = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    pagination: {
      ...initialCountriesState.countriesList.pagination,
    },
  },
});

const initializePagination = (
  state: CountriesState,
  action: CountriesActions.InitializePaginationAction,
): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    pagination: {
      ...state.countriesList.pagination,
      currentPage: action.payload.page,
      pageSize: action.payload.size,
    },
  },
});

const clearCountries = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    data: [],
    pagination: {
      ...state.countriesList.pagination,
      totalElements: 0,
      totalPages: 0,
    },
  },
});

const resetError = (state: CountriesState): CountriesState => ({
  ...state,
  countriesList: {
    ...state.countriesList,
    error: null,
  },
});

const startLoadingLanguages = (state: CountriesState): CountriesState => ({
  ...state,
  countryLanguages: {
    ...state.countryLanguages,
    loading: true,
    error: null,
  },
});

const loadCountryLanguagesSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountryLanguagesSuccessAction,
): CountriesState => ({
  ...state,
  countryLanguages: {
    ...state.countryLanguages,
    loading: false,
    error: null,
    data: action.payload.languages,
  },
});

const loadCountryLanguagesFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountryLanguagesFailureAction,
): CountriesState => ({
  ...state,
  countryLanguages: {
    ...state.countryLanguages,
    loading: false,
    error: action.payload.error,
    data: [],
  },
});

const clearCountryLanguages = (state: CountriesState): CountriesState => ({
  ...state,
  countryLanguages: {
    ...state.countryLanguages,
    data: [],
    error: null,
  },
});

const setSelectedCountry = (
  state: CountriesState,
  action: CountriesActions.SetSelectedCountryAction,
): CountriesState => ({
  ...state,
  countryLanguages: {
    ...state.countryLanguages,
    selectedCountry: action.payload.country,
  },
});

const startLoadingCountryStats = (state: CountriesState): CountriesState => ({
  ...state,
  countryStats: {
    ...state.countryStats,
    loading: true,
    error: null,
  },
});

const loadCountryStatsSuccess = (
  state: CountriesState,
  action: CountriesActions.LoadCountryStatsSuccessAction,
): CountriesState => {
  const endLoadingState = endLoading(state);
  return {
    ...endLoadingState,
    countryStats: {
      ...state.countryStats,
      loading: false,
      error: null,
      data: action.payload.response.content,
      pagination: {
        ...state.countryStats.pagination,
        currentPage: action.payload.response.pageable.pageNumber,
        pageSize: action.payload.response.pageable.pageSize,
        totalElements: action.payload.response.totalElements,
        totalPages: action.payload.response.totalPages,
      },
    },
  };
};

const loadCountryStatsFailure = (
  state: CountriesState,
  action: CountriesActions.LoadCountryStatsFailureAction,
): CountriesState => ({
  ...state,
  countryStats: {
    ...state.countryStats,
    loading: false,
    error: action.payload.error,
    data: [],
  },
});

const startLoadingRegions = (state: CountriesState): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: true,
    error: null,
  },
});

const loadRegionsSuccess = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: false,
    error: null,
    regions: action.payload.regions,
  },
});

const loadRegionsFailure = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: false,
    error: action.payload.error,
  },
});

const setCountryStatsPage = (
  state: CountriesState,
  action: CountriesActions.SetCountryStatsPageAction,
): CountriesState => ({
  ...state,
  countryStats: {
    ...state.countryStats,
    pagination: {
      ...state.countryStats.pagination,
      currentPage: action.payload.page,
    },
  },
});

const setCountryStatsPageSize = (
  state: CountriesState,
  action: CountriesActions.SetCountryStatsPageSizeAction,
): CountriesState => ({
  ...state,
  countryStats: {
    ...state.countryStats,
    pagination: {
      ...state.countryStats.pagination,
      pageSize: action.payload.size,
      currentPage: 0,
    },
  },
});

const clearCountryStats = (state: CountriesState): CountriesState => ({
  ...state,
  countryStats: {
    ...state.countryStats,
    data: [],
    error: null,
    pagination: {
      ...state.countryStats.pagination,
      totalElements: 0,
      totalPages: 0,
    },
  },
});

const startLoadingYearRange = (state: CountriesState): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: true,
    error: null,
  },
});

const loadYearRangeSuccess = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: false,
    error: null,
    yearRange: action.payload.yearRange,
  },
});

const loadYearRangeFailure = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  managementInfo: {
    ...state.managementInfo,
    loading: false,
    error: action.payload.error,
  },
});

// --- CountryStatsOverview Reducer Logic ---
const startLoadingCountryStatsOverview = (
  state: CountriesState,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    loading: true,
    error: null,
  },
});

const loadCountryStatsOverviewSuccess = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    loading: false,
    error: null,
    data: action.payload.response.content,
    pagination: {
      ...state.countryStatsOverview.pagination,
      currentPage: action.payload.response.pageable.pageNumber,
      pageSize: action.payload.response.pageable.pageSize,
      totalElements: action.payload.response.totalElements,
      totalPages: action.payload.response.totalPages,
    },
  },
});

const loadCountryStatsOverviewFailure = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    loading: false,
    error: action.payload.error,
    data: [],
  },
});
const setCountryStatsOverviewPage = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    pagination: {
      ...state.countryStatsOverview.pagination,
      currentPage: action.payload.page,
    },
  },
});

const setCountryStatsOverviewPageSize = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    pagination: {
      ...state.countryStatsOverview.pagination,
      pageSize: action.payload.size,
    },
  },
});

const setCountryStatsOverviewFilters = (
  state: CountriesState,
  action: any,
): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...state.countryStatsOverview,
    filters: action.payload.filters,
  },
});

const clearCountryStatsOverview = (state: CountriesState): CountriesState => ({
  ...state,
  countryStatsOverview: {
    ...initialCountriesState.countryStatsOverview,
  },
});

const actionToReducerMap: {
  [key: string]: (state: CountriesState, action?: any) => CountriesState;
} = {
  [CountriesActions.LOAD_COUNTRY_STATS_OVERVIEW]:
    startLoadingCountryStatsOverview,
  [CountriesActions.LOAD_COUNTRY_STATS_OVERVIEW_SUCCESS]:
    loadCountryStatsOverviewSuccess,
  [CountriesActions.LOAD_COUNTRY_STATS_OVERVIEW_FAILURE]:
    loadCountryStatsOverviewFailure,
  [CountriesActions.SET_COUNTRY_STATS_OVERVIEW_PAGE]:
    setCountryStatsOverviewPage,
  [CountriesActions.SET_COUNTRY_STATS_OVERVIEW_PAGE_SIZE]:
    setCountryStatsOverviewPageSize,
  [CountriesActions.SET_COUNTRY_STATS_OVERVIEW_FILTERS]:
    setCountryStatsOverviewFilters,
  [CountriesActions.CLEAR_COUNTRY_STATS_OVERVIEW]: clearCountryStatsOverview,
  [CountriesActions.LOAD_REGIONS]: startLoadingRegions,
  [CountriesActions.LOAD_REGIONS_SUCCESS]: loadRegionsSuccess,
  [CountriesActions.LOAD_REGIONS_FAILURE]: loadRegionsFailure,
  [CountriesActions.LOAD_YEAR_RANGE]: startLoadingYearRange,
  [CountriesActions.LOAD_YEAR_RANGE_SUCCESS]: loadYearRangeSuccess,
  [CountriesActions.LOAD_YEAR_RANGE_FAILURE]: loadYearRangeFailure,
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
  [CountriesActions.LOAD_COUNTRY_LANGUAGES]: startLoadingLanguages,
  [CountriesActions.LOAD_COUNTRY_LANGUAGES_SUCCESS]:
    loadCountryLanguagesSuccess,
  [CountriesActions.LOAD_COUNTRY_LANGUAGES_FAILURE]:
    loadCountryLanguagesFailure,
  [CountriesActions.CLEAR_COUNTRY_LANGUAGES]: clearCountryLanguages,
  [CountriesActions.SET_SELECTED_COUNTRY]: setSelectedCountry,
  [CountriesActions.LOAD_COUNTRY_STATS]: startLoadingCountryStats,
  [CountriesActions.LOAD_COUNTRY_STATS_SUCCESS]: loadCountryStatsSuccess,
  [CountriesActions.LOAD_COUNTRY_STATS_FAILURE]: loadCountryStatsFailure,
  [CountriesActions.SET_COUNTRY_STATS_PAGE]: setCountryStatsPage,
  [CountriesActions.SET_COUNTRY_STATS_PAGE_SIZE]: setCountryStatsPageSize,
  [CountriesActions.CLEAR_COUNTRY_STATS]: clearCountryStats,
};

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

export const countriesReducer = countriesReducerWithMap;
