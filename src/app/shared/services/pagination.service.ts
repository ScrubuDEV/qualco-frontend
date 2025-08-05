import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import type { Selector } from '@ngrx/store';
import { map, Observable } from 'rxjs';

export interface PaginationHelperConfig<T> {
  selector: Selector<object, any>;
  actions: {
    setPage: (page: number) => Action;
    setPageSize: (size: number) => Action;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private store: Store) {}

  createPaginationHelper<T>(config: PaginationHelperConfig<T>): {
    paginationConfig$: Observable<any>;
    itemsWithIndex$: Observable<T[]>;
    totalCount$: Observable<number>;
    currentPageStartIndex$: Observable<number>;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
  } {
    return {
      paginationConfig$: this.store
        .select(config.selector)
        .pipe(map((viewModel: any) => viewModel?.pagination ?? null)),

      itemsWithIndex$: this.store.select(config.selector).pipe(
        map((viewModel: any) => {
          if (!viewModel?.data || !viewModel.pagination) {
            return [];
          }
          const startIndex =
            viewModel.pagination.pageSize * viewModel.pagination.currentPage;
          return viewModel.data.map((item: T, index: number) => ({
            ...item,
            globalIndex: startIndex + index + 1,
          }));
        }),
      ),

      totalCount$: this.store
        .select(config.selector)
        .pipe(
          map((viewModel: any) => viewModel?.pagination?.totalElements ?? 0),
        ),

      currentPageStartIndex$: this.store.select(config.selector).pipe(
        map((viewModel: any) => {
          const config = viewModel?.pagination;
          return config ? config.pageSize * config.currentPage : 0;
        }),
      ),

      setPage: (page: number): void => {
        this.store.dispatch(config.actions.setPage(page));
      },

      setPageSize: (size: number): void => {
        this.store.dispatch(config.actions.setPageSize(size));
      },
    };
  }
}
