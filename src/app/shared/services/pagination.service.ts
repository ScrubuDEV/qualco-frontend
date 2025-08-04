import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginationHelperConfig<T> {
  selector: any;
  actions: {
    setPage: (page: number) => any;
    setPageSize: (size: number) => any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private store: Store) {}

  createPaginationHelper<T>(config: PaginationHelperConfig<T>) {
    return {
      paginationConfig$: this.store
        .select(config.selector)
        .pipe(map((viewModel: any) => viewModel?.paginationConfig ?? null)),

      itemsWithIndex$: this.store.select(config.selector).pipe(
        map((viewModel: any) => {
          if (!viewModel?.countries || !viewModel.paginationConfig) {
            return [];
          }
          const startIndex =
            viewModel.paginationConfig.pageSize *
            viewModel.paginationConfig.currentPage;
          return viewModel.countries.map((item: T, index: number) => ({
            ...item,
            globalIndex: startIndex + index + 1,
          }));
        }),
      ),

      totalCount$: this.store
        .select(config.selector)
        .pipe(
          map(
            (viewModel: any) => viewModel?.paginationConfig?.totalElements ?? 0,
          ),
        ),

      currentPageStartIndex$: this.store.select(config.selector).pipe(
        map((viewModel: any) => {
          const config = viewModel?.paginationConfig;
          return config ? config.pageSize * config.currentPage : 0;
        }),
      ),

      setPage: (page: number) => {
        this.store.dispatch(config.actions.setPage(page));
      },

      setPageSize: (size: number) => {
        this.store.dispatch(config.actions.setPageSize(size));
      },
    };
  }
}
