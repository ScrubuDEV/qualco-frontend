import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CountryStats } from '../../shared/models/country.models';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import * as CountriesActions from '../../shared/store/countries.actions';
import {
  selectCountryStatsViewModel,
  CountryStatsViewModel,
  selectCountryStatsCurrentPage,
  selectCountryStatsPageSize,
} from '../../shared/store/countries.selectors';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-countries-stats',
  standalone: true,
  imports: [CommonModule, TranslatePipe, PaginationComponent],
  templateUrl: './countries-stats.component.html',
  styleUrl: './countries-stats.component.scss',
})
export class CountriesStatsComponent implements OnInit, OnDestroy {
  viewModel$: Observable<CountryStatsViewModel>;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.viewModel$ = this.store.select(selectCountryStatsViewModel);
  }

  ngOnInit() {
    const page$ = this.store.select(selectCountryStatsCurrentPage);
    const pageSize$ = this.store.select(selectCountryStatsPageSize);

    combineLatest([page$, pageSize$])
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(([page, size]: [number, number]) => {
        this.store.dispatch(
          CountriesActions.loadCountryStats({
            page,
            size,
          }),
        );
      });

    this.viewModel$.pipe(takeUntil(this.destroy$)).subscribe((vm) => {
      console.log('CountryStats ViewModel updated:', vm);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(page: number): void {
    this.store.dispatch(CountriesActions.setCountryStatsPage({ page }));
  }

  onPageSizeChange(size: number): void {
    this.store.dispatch(CountriesActions.setCountryStatsPageSize({ size }));
  }
}
