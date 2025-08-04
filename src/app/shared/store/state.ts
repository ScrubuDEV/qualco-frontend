import {
  CountryDto,
  LanguageDto,
  CountryStats,
} from '../models/country.models';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface CountriesState {
  countries: CountryDto[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  filters: {
    region?: string;
    searchQuery?: string;
    yearFrom?: number;
    yearTo?: number;
  };
  selectedCountry: CountryDto | null;
  languages: LanguageDto[];
  languagesLoading: boolean;
  languagesError: string | null;
  // Country stats state
  countryStats: CountryStats[];
  countryStatsLoading: boolean;
  countryStatsError: string | null;
  countryStatsPagination: PaginationState;
}

export const initialCountriesState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 0,
    pageSize: 5,
    totalElements: 0,
    totalPages: 0,
  },
  filters: {},
  selectedCountry: null,
  languages: [],
  languagesLoading: false,
  languagesError: null,
  // Initialize country stats state
  countryStats: [],
  countryStatsLoading: false,
  countryStatsError: null,
  countryStatsPagination: {
    currentPage: 0,
    pageSize: 20,
    totalElements: 0,
    totalPages: 0,
  },
};

export interface AppState {
  countries: CountriesState;
}
