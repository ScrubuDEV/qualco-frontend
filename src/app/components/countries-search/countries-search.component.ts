import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import * as CountriesActions from '../../shared/store/countries.actions';
import {
  selectCountryStatsOverviewViewModel,
  selectRegions,
  selectYearRange,
  selectCountryStatsOverviewPagination,
  selectCountryStatsOverviewFilters,
  CountryStatsOverviewViewModel,
} from '../../shared/store/countries.selectors';
import {
  RegionDto,
  CountryStatsOverviewListViewModel,
  CountryStatsOverviewFilters,
} from '../../shared/models/country.models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-countries-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, TranslatePipe],
  templateUrl: './countries-search.component.html',
  styleUrls: ['./countries-search.component.scss'],
})
export class CountriesSearchComponent implements OnInit, OnDestroy {
  viewModel$: Observable<CountryStatsOverviewViewModel>;

  regions$: Observable<RegionDto[]>;
  yearRange$: Observable<{ minYear: number; maxYear: number } | null>;

  filters: {
    region: string;
    yearFrom: string;
    yearTo: string;
  } = {
    region: '',
    yearFrom: '',
    yearTo: '',
  };

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.viewModel$ = this.store.select(selectCountryStatsOverviewViewModel);
    this.regions$ = this.store.select(selectRegions);
    this.yearRange$ = this.store.select(selectYearRange);
  }

  ngOnInit(): void {
    this.store.dispatch(CountriesActions.loadRegions());
    this.store.dispatch(CountriesActions.loadYearRange());

    this.yearRange$.pipe(take(2), takeUntil(this.destroy$)).subscribe((yr) => {
      if (yr && yr.minYear && yr.maxYear) {
        this.filters.yearFrom = yr.minYear.toString();
        this.filters.yearTo = yr.maxYear.toString();
      }
    });

    this.store
      .select(selectCountryStatsOverviewPagination)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((paginationState) => {
        this.store.dispatch(
          CountriesActions.loadCountryStatsOverview({
            page: paginationState?.currentPage ?? 0,
            size: paginationState?.pageSize ?? 20,
          }),
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(page: number): void {
    this.store.dispatch(CountriesActions.setCountryStatsOverviewPage({ page }));
  }

  onPageSizeChange(size: number): void {
    this.store.dispatch(
      CountriesActions.setCountryStatsOverviewPageSize({ size }),
    );
  }

  onFilterChange(regions: RegionDto[]): void {
    let regionId: number | undefined = undefined;
    if (this.filters.region) {
      const regionObj = regions.find(
        (r: RegionDto) => r.id.toString() === this.filters.region,
      );
      if (regionObj) {
        regionId = regionObj.id;
      }
    }
    this.store.dispatch(
      CountriesActions.setCountryStatsOverviewFilters({
        filters: {
          regionId,
          yearFrom: this.filters.yearFrom || undefined,
          yearTo: this.filters.yearTo || undefined,
        },
      }),
    );
  }

  onSort(
    column: SORT_STRING,
    direction: SORT_DIRECTION,
  ): void {
    this.store
      .select(selectCountryStatsOverviewFilters)
      .pipe(take(1))
      .subscribe((filters: CountryStatsOverviewFilters) => {
        this.store.dispatch(
          CountriesActions.setCountryStatsOverviewFilters({
            filters: {
              ...filters,
              sortBy: column,
              direction,
            },
          }),
        );
      });
  }
}
