import {
  Component,
  Output,
  EventEmitter,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  config = input<PaginationConfig>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 20,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 3,
  });

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizes = [5, 10, 20, 50, 100];

  visiblePages = computed(() => {
    const { currentPage, totalPages, maxVisiblePages = 3 } = this.config();
    const pages: number[] = [];

    if (totalPages <= 0) {
      return [];
    }

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(0, currentPage - half);
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

      if (endPage === totalPages - 1) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
      }

      if (startPage === 0) {
        endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

  showStartEllipsis = computed(() => {
    const visiblePages = this.visiblePages();
    return visiblePages.length > 0 && visiblePages[0] > 1;
  });

  showEndEllipsis = computed(() => {
    const visiblePages = this.visiblePages();
    const { totalPages } = this.config();
    return (
      visiblePages.length > 0 &&
      visiblePages[visiblePages.length - 1] < totalPages - 2
    );
  });

  isFirstPage = computed(() => this.config().currentPage === 0);

  isLastPage = computed(
    () => this.config().currentPage === this.config().totalPages - 1,
  );

  startItem = computed(
    () => this.config().currentPage * this.config().pageSize + 1,
  );
  endItem = computed(() =>
    Math.min(
      (this.config().currentPage + 1) * this.config().pageSize,
      this.config().totalElements,
    ),
  );

  onPageClick(page: number): void {
    if (
      page !== this.config().currentPage &&
      page >= 0 &&
      page < this.config().totalPages
    ) {
      this.pageChange.emit(page);
    }
  }

  onPreviousClick(): void {
    if (!this.isFirstPage()) {
      this.pageChange.emit(this.config().currentPage - 1);
    }
  }

  onNextClick(): void {
    if (!this.isLastPage()) {
      this.pageChange.emit(this.config().currentPage + 1);
    }
  }

  onFirstClick(): void {
    if (!this.isFirstPage()) {
      this.pageChange.emit(0);
    }
  }

  onLastClick(): void {
    if (!this.isLastPage()) {
      this.pageChange.emit(this.config().totalPages - 1);
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newPageSize = parseInt(target.value, 10);
    this.pageSizeChange.emit(newPageSize);
  }
}
