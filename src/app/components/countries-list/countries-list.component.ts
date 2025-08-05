import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import * as CountriesActions from '../../shared/store/countries.actions';
import {
  selectCountriesListViewModel,
  CountriesListViewModel,
} from '../../shared/store/countries.selectors';
import { CountryDto } from '../../shared/models/country.models';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { TranslatePipe } from '@ngx-translate/core';
import * as CountriesSelectors from '../../shared/store/countries.selectors';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, TranslatePipe],
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit, OnDestroy {
  viewModel$: Observable<CountriesListViewModel>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.viewModel$ = this.store.select(selectCountriesListViewModel);
  }

  ngOnInit() {
    this.store
      .select(CountriesSelectors.selectCountriesPagination)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((paginationState) => {
        this.store.dispatch(
          CountriesActions.initializePagination({
            page: paginationState?.currentPage ?? 0,
            size: paginationState?.pageSize ?? 20,
          }),
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(CountriesActions.resetPagination());
  }

  onPageChange(page: number): void {
    this.store.dispatch(CountriesActions.setCurrentPage({ page }));
  }

  onPageSizeChange(size: number): void {
    this.store.dispatch(CountriesActions.setPageSize({ size }));
  }

  retry(): void {
    this.store
      .select(CountriesSelectors.selectCountriesPagination)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((paginationState) => {
        this.store.dispatch(
          CountriesActions.initializePagination({
            page: 0,
            size: paginationState?.pageSize ?? 20,
          }),
        );
      });
  }

  navigateToCountryLanguages(country: CountryDto): void {
    this.store.dispatch(CountriesActions.setSelectedCountry({ country }));
    this.router.navigate(
      [
        {
          outlets: {
            popup: ['countries', country.countryCode2, 'languages'],
          },
        },
      ],
      {
        state: { country },
      },
    );
  }

  getGlobalIndex(idx: number, currentPage: number, pageSize: number): number {
    return (currentPage * pageSize) + idx + 1;
  }
}
