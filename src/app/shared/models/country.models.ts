export type CountryStatsOverviewListViewModel = {
  items: CountryStatsOverviewDto[];
  loading: boolean;
  error: string | null;
  hasItems: boolean;
  itemCount: number;
  hasError: boolean;
  isReady: boolean;
  paginationConfig: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    showFirstLast: boolean;
    showPrevNext: boolean;
    maxVisiblePages: number;
  };
};
export interface CountryStatsOverviewState {
  data: CountryStatsOverviewDto[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
  filters: CountryStatsOverviewFilters;
}

export type CountryStatsOverviewFilters = {
  regionId?: number;
  yearFrom?: number;
  yearTo?: number;
  continentName?: string;
  regionName?: string;
  countryName?: string;
  year?: string;
  sortDirection?: string;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  population?: string;
  gdp?: string;
};
export interface CountryDto {
  id?: number;
  name: string;
  area: number;
  countryCode2: string;
  globalIndex?: number;
}

export interface LanguageDto {
  countryId?: number;
  languageId?: number;
  languageName: string;
  countryName: string;
  countryCode3: string;
  official: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CountryStats {
  countryName: string;
  countryCode2: string;
  area: number;
  year: number;
  population: number;
  gdp: number;
  gdpPerPopulation: number;
}

export interface CountrySearchData {
  continentName: string;
  regionName: string;
  countryName: string;
  year: number;
  population: number;
  gdp: number;
}

export interface RegionDto {
  id: number;
  name: string;
}

export interface YearRange {
  minYear: number;
  maxYear: number;
}

export interface CountryStatsOverviewDto {
  continentName: string;
  regionName: string;
  countryName: string;
  year: number;
  population: number;
  gdp: number;
}
