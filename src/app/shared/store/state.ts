import {
  CountryDto,
  LanguageDto,
  CountryStats,
  RegionDto,
  YearRange,
  CountryStatsOverviewDto,
  CountryStatsOverviewState,
} from '../models/country.models';
export interface ManagementInfoState extends LoadingState {
  regions: RegionDto[];
  yearRange: YearRange | null;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface CountriesListState extends LoadingState {
  data: CountryDto[];
  pagination: PaginationState;
  filters: {
    region?: string;
    searchQuery?: string;
    yearFrom?: number;
    yearTo?: number;
  };
}

export interface CountryLanguagesState extends LoadingState {
  data: LanguageDto[];
  selectedCountry: CountryDto | null;
}

export interface CountryStatsState extends LoadingState {
  data: CountryStats[];
  pagination: PaginationState;
}

export interface CountriesState {
  countriesList: CountriesListState;
  countryLanguages: CountryLanguagesState;
  countryStats: CountryStatsState;
  managementInfo: ManagementInfoState;
  countryStatsOverview: CountryStatsOverviewState;
}

export const initialCountriesState: CountriesState = {
  countriesList: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 0,
      pageSize: 5,
      totalElements: 0,
      totalPages: 0,
    },
    filters: {},
  },
  countryLanguages: {
    data: [],
    loading: false,
    error: null,
    selectedCountry: null,
  },
  countryStats: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 0,
      pageSize: 5,
      totalElements: 0,
      totalPages: 0,
    },
  },
  countryStatsOverview: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 0,
      pageSize: 5,
      totalElements: 0,
      totalPages: 0,
    },
    filters: {},
  },
  managementInfo: {
    regions: [],
    yearRange: null,
    loading: false,
    error: null,
  },
};

export interface AppState {
  countries: CountriesState;
}
