import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NationsService } from '../services/nations.service';
import * as CountriesActions from './countries.actions';
import {
  selectPageSize,
  selectCountriesFilters,
  selectCountryStatsPageSize,
} from './countries.selectors';

@Injectable()
export class CountriesEffects {
  private actions$ = inject(Actions);
  private nationsService = inject(NationsService);
  private store = inject(Store);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_COUNTRIES),
      mergeMap((action: CountriesActions.LoadCountriesAction) =>
        this.nationsService
          .getCountries(
            action.payload.page,
            action.payload.size,
            action.payload.filters,
          )
          .pipe(
            map((response) => {
              return new CountriesActions.LoadCountriesSuccessAction({
                response,
              });
            }),
            catchError((error) => {
              return of(
                new CountriesActions.LoadCountriesFailureAction({
                  error: this.getErrorMessage(error),
                }),
              );
            }),
          ),
      ),
    ),
  );

  setCurrentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_CURRENT_PAGE),
      tap(() =>
        console.log(
          CountriesActions.ACTION_LOG_MESSAGES.SET_CURRENT_PAGE_START,
        ),
      ),
      withLatestFrom(
        this.store.select(selectPageSize),
        this.store.select(selectCountriesFilters),
      ),
      map(
        ([action, pageSize, filters]) =>
          new CountriesActions.LoadCountriesAction({
            page: action.payload.page,
            size: pageSize as number,
            filters,
          }),
      ),
    ),
  );

  // Reload countries when page size changes
  setPageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_PAGE_SIZE),
      tap(() =>
        console.log(CountriesActions.ACTION_LOG_MESSAGES.SET_PAGE_SIZE_START),
      ),
      withLatestFrom(this.store.select(selectCountriesFilters)),
      map(
        ([action, filters]) =>
          new CountriesActions.LoadCountriesAction({
            page: 0,
            size: action.payload.size,
            filters,
          }),
      ),
    ),
  );

  // Initialize pagination and load countries
  initializePagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.INITIALIZE_PAGINATION),
      tap(() =>
        console.log(
          CountriesActions.ACTION_LOG_MESSAGES.INITIALIZE_PAGINATION_START,
        ),
      ),
      withLatestFrom(this.store.select(selectCountriesFilters)),
      map(
        ([action, filters]) =>
          new CountriesActions.LoadCountriesAction({
            page: action.payload.page,
            size: action.payload.size,
            filters,
          }),
      ),
    ),
  );

  // Reload countries when filters change
  setFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_FILTERS),
      tap(() =>
        console.log(CountriesActions.ACTION_LOG_MESSAGES.SET_FILTERS_START),
      ),
      withLatestFrom(this.store.select(selectPageSize)),
      map(
        ([action, pageSize]) =>
          new CountriesActions.LoadCountriesAction({
            page: 0,
            size: pageSize as number,
            filters: action.payload.filters,
          }),
      ),
    ),
  );

  // Reload countries when filters are cleared
  clearFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.CLEAR_FILTERS),
      tap(() =>
        console.log(CountriesActions.ACTION_LOG_MESSAGES.CLEAR_FILTERS_START),
      ),
      withLatestFrom(this.store.select(selectPageSize)),
      map(
        ([_, pageSize]) =>
          new CountriesActions.LoadCountriesAction({
            page: 0,
            size: pageSize as number,
            filters: {},
          }),
      ),
    ),
  );

  // New effect for loading country languages
  loadCountryLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_COUNTRY_LANGUAGES),
      mergeMap((action: CountriesActions.LoadCountryLanguagesAction) =>
        this.nationsService.getCountryLanguages(action.payload.countryId).pipe(
          map((languages) => {
            return new CountriesActions.LoadCountryLanguagesSuccessAction({
              languages,
            });
          }),
          catchError((error) => {
            return of(
              new CountriesActions.LoadCountryLanguagesFailureAction({
                error: this.getErrorMessage(error),
              }),
            );
          }),
        ),
      ),
    ),
  );

  // Effect for loading country stats
  loadCountryStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_COUNTRY_STATS),
      mergeMap((action: CountriesActions.LoadCountryStatsAction) =>
        this.nationsService
          .getMaxGdpPerPopulationStats(action.payload.page, action.payload.size)
          .pipe(
            tap((response) => {
              console.log('Country stats API response:', response);
              console.log('First country stat:', response.content?.[0]);
            }),
            map((response) => {
              return new CountriesActions.LoadCountryStatsSuccessAction({
                response,
              });
            }),
            catchError((error) => {
              console.error('Error loading country stats:', error);
              return of(
                new CountriesActions.LoadCountryStatsFailureAction({
                  error: this.getErrorMessage(error),
                }),
              );
            }),
          ),
      ),
    ),
  );

  // Effect for setting country stats page
  setCountryStatsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_PAGE),
      tap(() =>
        console.log(
          CountriesActions.ACTION_LOG_MESSAGES.SET_COUNTRY_STATS_PAGE_START,
        ),
      ),
      withLatestFrom(this.store.select(selectCountryStatsPageSize)),
      map(
        ([action, pageSize]) =>
          new CountriesActions.LoadCountryStatsAction({
            page: action.payload.page,
            size: pageSize as number,
          }),
      ),
    ),
  );

  // Effect for setting country stats page size
  setCountryStatsPageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_PAGE_SIZE),
      tap(() =>
        console.log(
          CountriesActions.ACTION_LOG_MESSAGES
            .SET_COUNTRY_STATS_PAGE_SIZE_START,
        ),
      ),
      map(
        (action) =>
          new CountriesActions.LoadCountryStatsAction({
            page: 0,
            size: action.payload.size,
          }),
      ),
    ),
  );

  // Centralized error handling effect (following your pattern)
  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CountriesActions.LOAD_COUNTRIES_FAILURE,
          CountriesActions.LOAD_COUNTRY_LANGUAGES_FAILURE,
          // Add other failure actions here as they are created
        ),
        tap((action: any) => {
          console.error('Error handled by centralized error handler:', action);
          // You can dispatch to a global error handler action here
          // return new CoreActions.HandleErrorAction(action.payload);
        }),
      ),
    { dispatch: false }, // Set to true if you want to dispatch another action
  );

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'NATIONS-error.connection';
    } else if (error.status === 404) {
      return 'NATIONS-error.notFound';
    } else if (error.status >= 500) {
      return 'NATIONS-error.server';
    } else if (error.status === 403) {
      return 'NATIONS-error.forbidden';
    }
    return 'NATIONS-error.unknown';
  }
}
