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
import * as CountriesSelectors from './countries.selectors';

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

  setPageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_PAGE_SIZE),
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

  initializePagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.INITIALIZE_PAGINATION),
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

  setFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_FILTERS),
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

  clearFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.CLEAR_FILTERS),
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

  loadCountryStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_COUNTRY_STATS),
      mergeMap((action: CountriesActions.LoadCountryStatsAction) =>
        this.nationsService
          .getMaxGdpPerPopulationStats(action.payload.page, action.payload.size)
          .pipe(
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

  setCountryStatsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_PAGE),
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

  setCountryStatsPageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_PAGE_SIZE),
      map(
        (action) =>
          new CountriesActions.LoadCountryStatsAction({
            page: 0,
            size: action.payload.size,
          }),
      ),
    ),
  );

  setCountryStatsOverviewFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_OVERVIEW_FILTERS),
      withLatestFrom(
        this.store.select(
          CountriesSelectors.selectCountryStatsOverviewPagination,
        ),
      ),
      map(
        ([action, pagination]) =>
          new CountriesActions.LoadCountryStatsOverviewAction({
            page: 0,
            size: pagination?.pageSize ?? 20,
            filters: action.payload.filters,
          }),
      ),
    ),
  );

  loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_REGIONS),
      mergeMap(() =>
        this.nationsService.getRegions().pipe(
          map(
            (regions) =>
              new CountriesActions.LoadRegionsSuccessAction({ regions }),
          ),
          catchError((error) =>
            of(
              new CountriesActions.LoadRegionsFailureAction({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadYearRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_YEAR_RANGE),
      mergeMap(() =>
        this.nationsService.getYearRange().pipe(
          map(
            (yearRange) =>
              new CountriesActions.LoadYearRangeSuccessAction({ yearRange }),
          ),
          catchError((error) =>
            of(
              new CountriesActions.LoadYearRangeFailureAction({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CountriesActions.LOAD_COUNTRIES_FAILURE,
          CountriesActions.LOAD_COUNTRY_LANGUAGES_FAILURE,
          CountriesActions.LOAD_COUNTRY_STATS_FAILURE,
        ),
        tap((action: any) => {
          console.error('Error handled by centralized error handler:', action);
        }),
      ),
    { dispatch: false },
  );

  loadCountryStatsOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.LOAD_COUNTRY_STATS_OVERVIEW),
      mergeMap((action: CountriesActions.LoadCountryStatsOverviewAction) =>
        this.nationsService
          .getCountryStatsOverview(
            action.payload.page,
            action.payload.size,
            action.payload.filters,
          )
          .pipe(
            map(
              (response) =>
                new CountriesActions.LoadCountryStatsOverviewSuccessAction({
                  response,
                }),
            ),
            catchError((error) =>
              of(
                new CountriesActions.LoadCountryStatsOverviewFailureAction({
                  error: this.getErrorMessage(error),
                }),
              ),
            ),
          ),
      ),
    ),
  );

  setCountryStatsOverviewPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_OVERVIEW_PAGE),
      withLatestFrom(
        this.store.select(
          CountriesSelectors.selectCountryStatsOverviewPagination,
        ),
        this.store.select(CountriesSelectors.selectCountryStatsOverviewFilters),
      ),
      map(
        ([action, pagination, filters]) =>
          new CountriesActions.LoadCountryStatsOverviewAction({
            page: action.payload.page,
            size: pagination?.pageSize ?? 20,
            filters,
          }),
      ),
    ),
  );

  setCountryStatsOverviewPageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.SET_COUNTRY_STATS_OVERVIEW_PAGE_SIZE),
      withLatestFrom(
        this.store.select(CountriesSelectors.selectCountryStatsOverviewFilters),
      ),
      map(
        ([action, filters]) =>
          new CountriesActions.LoadCountryStatsOverviewAction({
            page: 0,
            size: action.payload.size,
            filters,
          }),
      ),
    ),
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
