import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { take, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  CountryDto,
  CountryLanguage,
  LanguageDto,
} from '../../shared/models/country.models';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';
import * as CountriesActions from '../../shared/store/countries.actions';
import * as CountriesSelectors from '../../shared/store/countries.selectors';
import { PaginationService } from '../../shared/services/pagination.service';
import { NationsService } from '../../shared/services/nations.service';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent,TranslatePipe],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss',
})
export class CountriesListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Component signals
  private viewModelSignal: any;
  countries: any;
  loading: any;
  error: any;
  hasCountries: any;
  hasError: any;
  isReady: any;

  // Pagination related signals
  private paginationHelper: any;
  paginationConfig: any;
  countriesWithIndex: any;
  totalCountries: any;

  constructor(
    private store: Store,
    private router: Router,
    private nationsService: NationsService,
    private paginationService: PaginationService,
    translate: TranslateService,
  ) {
    this.viewModelSignal = toSignal(
      this.store.select(CountriesSelectors.selectCountriesListViewModel),
      { initialValue: null },
    );

    this.countries = computed(() => this.viewModelSignal()?.countries ?? []);
    this.loading = computed(() => this.viewModelSignal()?.loading ?? false);
    this.error = computed(() => this.viewModelSignal()?.error ?? null);
    this.hasCountries = computed(() => this.countries().length > 0);
    this.hasError = computed(() => this.error() !== null);
    this.isReady = computed(() => !this.loading() && !this.hasError());

    // Initialize pagination helper
    this.paginationHelper =
      this.paginationService.createPaginationHelper<CountryDto>({
        selector: CountriesSelectors.selectCountriesListViewModel,
        actions: {
          setPage: (page: number) => CountriesActions.setCurrentPage({ page }),
          setPageSize: (size: number) => CountriesActions.setPageSize({ size }),
        },
      });

    // Create signals from pagination helper observables
    this.paginationConfig = toSignal(this.paginationHelper.paginationConfig$, {
      initialValue: null,
    });
    this.countriesWithIndex = toSignal(this.paginationHelper.itemsWithIndex$, {
      initialValue: [],
    });
    this.totalCountries = toSignal(this.paginationHelper.totalCount$, {
      initialValue: 0,
    });
  }

  ngOnInit() {
    // First check if we need to restore any pagination state from previous navigation
    this.store
      .select(CountriesSelectors.selectCountriesPagination)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((paginationState) => {
        // Initialize with current state or defaults
        this.store.dispatch(
          CountriesActions.initializePagination({
            page: paginationState?.currentPage ?? 0,
            size: paginationState?.pageSize ?? 20,
          }),
        );

        // This will trigger a load through the effects system
        // which will fetch data from the backend with these pagination parameters
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.store.dispatch(CountriesActions.resetPagination());
  }

  onPageChange(page: number) {
    this.store.dispatch(CountriesActions.setCurrentPage({ page }));
  }

  onPageSizeChange(size: number) {
    this.store.dispatch(CountriesActions.setPageSize({ size }));
  }

  retry() {
    this.store
      .select(CountriesSelectors.selectCountriesPagination)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((paginationState: any) => {
        this.store.dispatch(
          CountriesActions.initializePagination({
            page: 0,
            size: paginationState?.pageSize ?? 20,
          }),
        );
      });
  }

  navigateToCountryLanguages(country: CountryDto) {
    window.scrollTo(0, 0);
    this.store.dispatch(CountriesActions.setSelectedCountry({ country }));
    this.router.navigate(['/countries', country.countryCode2, 'languages'], {
      state: { country: country },
    });
  }
}
