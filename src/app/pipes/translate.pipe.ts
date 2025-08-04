import {
  Pipe,
  PipeTransform,
  inject,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  private subscription?: Subscription;

  constructor() {
    // Subscribe to language changes to trigger pipe updates
    this.subscription = this.translationService.currentLang$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.translationService.getTranslation(key);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
