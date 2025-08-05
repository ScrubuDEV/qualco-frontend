import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../constants/config.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CountryDto,
  LanguageDto,
  Page,
  CountryStats,
  RegionDto,
  YearRange,
  CountryStatsOverviewDto,
} from '../models/country.models';

@Injectable({
  providedIn: 'root',
})
export class NationsService {
  private baseUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  getCountries(
    page: number = 0,
    size: number,
    filters?: any,
  ): Observable<Page<CountryDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.region) {
        params = params.set('region', filters.region);
      }
      if (filters.searchQuery) {
        params = params.set('search', filters.searchQuery);
      }
      if (filters.yearFrom) {
        params = params.set('yearFrom', filters.yearFrom.toString());
      }
      if (filters.yearTo) {
        params = params.set('yearTo', filters.yearTo.toString());
      }
    }

    return this.http.get<Page<CountryDto>>(`${this.baseUrl}/countries`, {
      params,
    });
  }

  getCountryLanguages(countryId: number): Observable<LanguageDto[]> {
    return this.http.get<LanguageDto[]>(
      `${this.baseUrl}/languages/country/${countryId}`,
    );
  }

  getMaxGdpPerPopulationStats(
    page: number = 0,
    size: number = 20,
  ): Observable<Page<CountryStats>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<CountryStats>>(
      `${this.baseUrl}/countries/stats/max-gdp-per-population`,
      { params },
    );
  }

  getCountryStatsOverview(
    page: number = 0,
    size: number = 10,
    filters?: {
      regionId?: number;
      yearFrom?: number;
      yearTo?: number;
      continentName?: string;
      regionName?: string;
      countryName?: string;
      year?: string;
      sortBy?: string;
      direction?: 'asc' | 'desc';
    },
  ): Observable<Page<CountryStatsOverviewDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.regionId) {
        params = params.set('regionId', filters.regionId.toString());
      }
      if (filters.yearFrom) {
        params = params.set('yearFrom', filters.yearFrom.toString());
      }
      if (filters.yearTo) {
        params = params.set('yearTo', filters.yearTo.toString());
      }
      if (filters.continentName) {
        params = params.set('continentName', filters.continentName);
      }
      if (filters.regionName) {
        params = params.set('regionName', filters.regionName);
      }
      if (filters.countryName) {
        params = params.set('countryName', filters.countryName);
      }
      if (filters.year) {
        params = params.set('year', filters.year);
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if (filters.direction) {
        params = params.set('direction', filters.direction);
      }
    }

    return this.http.get<Page<CountryStatsOverviewDto>>(
      `${this.baseUrl}/country-stats-overview`,
      { params },
    );
  }

  getRegions(): Observable<RegionDto[]> {
    return this.http.get<RegionDto[]>(
      `${this.baseUrl}/country-stats-overview/regions`,
    );
  }

  getYearRange(): Observable<YearRange> {
    return this.http.get<YearRange>(
      `${this.baseUrl}/country-stats-overview/year-range`,
    );
  }
}
