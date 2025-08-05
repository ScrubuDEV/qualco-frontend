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

export interface CountryLanguage {
  countryId: number;
  languageId: number;
  official: boolean;
  country?: {
    id: number;
    name: string;
    countryCode2: string;
  };
  language?: {
    id: number;
    name: string;
    nativeName?: string;
  };
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
