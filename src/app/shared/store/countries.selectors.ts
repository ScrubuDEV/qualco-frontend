import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountriesState } from './state';
import {
  CountryDto,
  LanguageDto,
  CountryStats,
  RegionDto,
  CountryStatsOverviewDto,
} from '../models/country.models';
import { PaginationConfig } from '../components/pagination/pagination.component';

export interface CountryStatsOverviewViewModel
  extends PaginatedListViewModel<CountryStatsOverviewDto> {
  sortBy?: string;
  direction?: 'asc' | 'desc';
}

export interface PaginatedListViewModel<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  hasItems: boolean;
  itemCount: number;
  hasError: boolean;
  isReady: boolean;
  paginationConfig: PaginationConfig;
}

export type CountriesListViewModel = PaginatedListViewModel<CountryDto>;

export interface CountryLanguagesViewModel {
  selectedCountry: CountryDto | null;
  languages: LanguageDto[];
  loading: boolean;
  error: string | null;
  hasLanguages: boolean;
  languageCount: number;
  hasError: boolean;
  isReady: boolean;
}

export type CountryStatsViewModel = PaginatedListViewModel<CountryStats>;

export const selectCountriesFeature =
  createFeatureSelector<CountriesState>('countries');

export const selectCountries = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countriesList.data,
);

export const selectCountriesLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countriesList.loading,
);

export const selectCountriesError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countriesList.error,
);

export const selectCountriesPagination = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countriesList.pagination,
);

export const selectCurrentPage = createSelector(
  selectCountriesPagination,
  (pagination) => pagination.currentPage,
);

export const selectPageSize = createSelector(
  selectCountriesPagination,
  (pagination) => pagination.pageSize,
);

export const selectTotalElements = createSelector(
  selectCountriesPagination,
  (pagination) => pagination.totalElements,
);

export const selectTotalPages = createSelector(
  selectCountriesPagination,
  (pagination) => pagination.totalPages,
);

export const selectCountriesFilters = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countriesList.filters,
);

export const selectHasCountries = createSelector(
  selectCountries,
  (countries) => countries.length > 0,
);

export const selectCountryCount = createSelector(
  selectCountries,
  (countries) => countries.length,
);

export const selectHasError = createSelector(
  selectCountriesError,
  (error) => error !== null,
);

export const selectIsReady = createSelector(
  selectCountriesLoading,
  selectHasError,
  (loading, hasError) => !loading && !hasError,
);

export const selectPaginationConfig = createSelector(
  selectCountriesPagination,
  (pagination) => ({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalElements: pagination.totalElements,
    totalPages: pagination.totalPages,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 3,
  }),
);

export const selectCountriesListViewModel = createSelector(
  selectCountries,
  selectCountriesLoading,
  selectCountriesError,
  selectHasCountries,
  selectCountryCount,
  selectHasError,
  selectIsReady,
  selectPaginationConfig,
  (
    countries,
    loading,
    error,
    hasCountries,
    countryCount,
    hasError,
    isReady,
    paginationConfig,
  ): CountriesListViewModel => ({
    items: countries,
    loading,
    error,
    hasItems: hasCountries,
    itemCount: countryCount,
    hasError,
    isReady,
    paginationConfig,
  }),
);

export const selectSelectedCountry = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryLanguages.selectedCountry,
);

export const selectLanguages = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryLanguages.data,
);

export const selectLanguagesLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryLanguages.loading,
);

export const selectLanguagesError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryLanguages.error,
);

export const selectHasLanguages = createSelector(
  selectLanguages,
  (languages) => languages.length > 0,
);

export const selectLanguageCount = createSelector(
  selectLanguages,
  (languages) => languages.length,
);

export const selectHasLanguagesError = createSelector(
  selectLanguagesError,
  (error) => error !== null,
);

export const selectLanguagesIsReady = createSelector(
  selectLanguagesLoading,
  selectHasLanguagesError,
  (loading, hasError) => !loading && !hasError,
);

// Country stats selectors
export const selectCountryStats = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStats.data,
);

export const selectCountryStatsLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStats.loading,
);

export const selectCountryStatsError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStats.error,
);

export const selectCountryStatsPagination = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStats.pagination,
);

export const selectCountryStatsCurrentPage = createSelector(
  selectCountryStatsPagination,
  (pagination) => pagination.currentPage,
);

export const selectCountryStatsPageSize = createSelector(
  selectCountryStatsPagination,
  (pagination) => pagination.pageSize,
);

export const selectCountryStatsTotalElements = createSelector(
  selectCountryStatsPagination,
  (pagination) => pagination.totalElements,
);

export const selectCountryStatsTotalPages = createSelector(
  selectCountryStatsPagination,
  (pagination) => pagination.totalPages,
);

export const selectHasCountryStats = createSelector(
  selectCountryStats,
  (stats) => stats.length > 0,
);

export const selectCountryStatsCount = createSelector(
  selectCountryStats,
  (stats) => stats.length,
);

export const selectHasCountryStatsError = createSelector(
  selectCountryStatsError,
  (error) => error !== null,
);

export const selectCountryStatsIsReady = createSelector(
  selectCountryStatsLoading,
  selectHasCountryStatsError,
  (loading, hasError) => !loading && !hasError,
);

export const selectManagementInfo = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.managementInfo,
);

export const selectRegions = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.regions as RegionDto[],
);

export const selectRegionsLoading = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.loading,
);

export const selectRegionsError = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.error,
);

export const selectYearRange = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.yearRange,
);

export const selectYearRangeLoading = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.loading,
);

export const selectYearRangeError = createSelector(
  selectManagementInfo,
  (managementInfo) => managementInfo.error,
);

export const selectCountryStatsPaginationConfig = createSelector(
  selectCountryStatsPagination,
  (pagination) => ({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalElements: pagination.totalElements,
    totalPages: pagination.totalPages,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 5,
  }),
);

export const selectCountryLanguagesViewModel = createSelector(
  selectSelectedCountry,
  selectLanguages,
  selectLanguagesLoading,
  selectLanguagesError,
  selectHasLanguages,
  selectLanguageCount,
  selectHasLanguagesError,
  selectLanguagesIsReady,
  (
    selectedCountry,
    languages,
    loading,
    error,
    hasLanguages,
    languageCount,
    hasError,
    isReady,
  ): CountryLanguagesViewModel => ({
    selectedCountry,
    languages,
    loading,
    error,
    hasLanguages,
    languageCount,
    hasError,
    isReady,
  }),
);

export const selectCountryStatsViewModel = createSelector(
  selectCountryStats,
  selectCountryStatsLoading,
  selectCountryStatsError,
  selectHasCountryStats,
  selectCountryStatsCount,
  selectHasCountryStatsError,
  selectCountryStatsIsReady,
  selectCountryStatsPaginationConfig,
  (
    items,
    loading,
    error,
    hasItems,
    itemCount,
    hasError,
    isReady,
    paginationConfig,
  ): CountryStatsViewModel => ({
    items,
    loading,
    error,
    hasItems,
    itemCount,
    hasError,
    isReady,
    paginationConfig,
  }),
);

export const selectCountryStatsOverview = createSelector(
  selectCountriesFeature,
  (state) => state.countryStatsOverview.data,
);
export const selectCountryStatsOverviewLoading = createSelector(
  selectCountriesFeature,
  (state) => state.countryStatsOverview.loading,
);
export const selectCountryStatsOverviewError = createSelector(
  selectCountriesFeature,
  (state) => state.countryStatsOverview.error,
);
export const selectCountryStatsOverviewPagination = createSelector(
  selectCountriesFeature,
  (state) => state.countryStatsOverview.pagination,
);
export const selectCountryStatsOverviewFilters = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStatsOverview.filters,
);
export const selectCountryStatsOverviewViewModel = createSelector(
  selectCountryStatsOverview,
  selectCountryStatsOverviewLoading,
  selectCountryStatsOverviewError,
  selectCountryStatsOverviewPagination,
  selectCountryStatsOverviewFilters, // <-- add this
  (
    items,
    loading,
    error,
    pagination,
    filters,
  ): CountryStatsOverviewViewModel => ({
    items,
    loading,
    error,
    hasItems: !!items && items.length > 0,
    itemCount: items?.length || 0,
    hasError: !!error,
    isReady: !loading && !error,
    paginationConfig: {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      totalElements: pagination.totalElements,
      totalPages: pagination.totalPages,
      showFirstLast: true,
      showPrevNext: true,
      maxVisiblePages: 3,
    },
    sortBy: filters?.sortBy, // <-- add this
    direction: filters?.direction, // <-- add this
  }),
);
export const selectCountryStatsOverviewPaginationConfig = createSelector(
  selectCountryStatsOverviewPagination,
  (pagination) => ({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalElements: pagination.totalElements,
    totalPages: pagination.totalPages,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 3,
  }),
);
