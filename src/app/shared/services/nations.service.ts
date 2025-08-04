import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CountryDto,
  LanguageDto,
  Page,
  CountryLanguage,
  CountryStats,
  CountrySearchData,
} from '../models/country.models';

@Injectable({
  providedIn: 'root',
})
export class NationsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

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

    return this.http
      .get<
        Page<CountryStats>
      >(`${this.baseUrl}/countries/stats/max-gdp-per-population`, { params })
      .pipe(tap((response) => console.log('Raw API response:', response)));
  }
}
