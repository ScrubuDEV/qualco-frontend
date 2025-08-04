import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountriesState } from './state';
import {
  CountryDto,
  LanguageDto,
  CountryStats,
} from '../models/country.models';
import { PaginationConfig } from '../components/pagination/pagination.component';

// View model interface for the countries list component
export interface CountriesListViewModel {
  countries: CountryDto[];
  loading: boolean;
  error: string | null;
  hasCountries: boolean;
  countryCount: number;
  hasError: boolean;
  isReady: boolean;
  paginationConfig: PaginationConfig;
}

// New view model for country languages component
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

// View model interface for country stats component
export interface CountryStatsViewModel {
  countryStats: CountryStats[];
  loading: boolean;
  error: string | null;
  hasStats: boolean;
  statsCount: number;
  hasError: boolean;
  isReady: boolean;
  paginationConfig: PaginationConfig;
}

export const selectCountriesFeature =
  createFeatureSelector<CountriesState>('countries');

export const selectCountries = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countries,
);

export const selectCountriesLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.loading,
);

export const selectCountriesError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.error,
);

export const selectCountriesPagination = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.pagination,
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
  (state: CountriesState) => state.filters,
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
    countries,
    loading,
    error,
    hasCountries,
    countryCount,
    hasError,
    isReady,
    paginationConfig,
  }),
);

// New language-related selectors
export const selectSelectedCountry = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.selectedCountry,
);

export const selectLanguages = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.languages,
);

export const selectLanguagesLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.languagesLoading,
);

export const selectLanguagesError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.languagesError,
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
  (state: CountriesState) => state.countryStats,
);

export const selectCountryStatsLoading = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStatsLoading,
);

export const selectCountryStatsError = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStatsError,
);

export const selectCountryStatsPagination = createSelector(
  selectCountriesFeature,
  (state: CountriesState) => state.countryStatsPagination,
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
    countryStats,
    loading,
    error,
    hasStats,
    statsCount,
    hasError,
    isReady,
    paginationConfig,
  ): CountryStatsViewModel => ({
    countryStats,
    loading,
    error,
    hasStats,
    statsCount,
    hasError,
    isReady,
    paginationConfig,
  }),
);
