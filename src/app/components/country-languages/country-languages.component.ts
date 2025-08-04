import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CountryDto, LanguageDto } from '../../shared/models/country.models';
import { Observable, Subject, takeUntil, map, BehaviorSubject, catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import * as CountriesActions from '../../shared/store/countries.actions';
import * as fromCountries from '../../shared/store/countries.selectors';
import { NationsService } from '../../shared/services/nations.service';

@Component({
  selector: 'app-country-languages',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './country-languages.component.html',
  styleUrl: './country-languages.component.scss',
})
export class CountryLanguagesComponent implements OnInit, OnDestroy {
  private countrySubject = new BehaviorSubject<LanguageDto | null>(null);
  country$ = this.countrySubject.asObservable();

  private countryCodeSubject = new BehaviorSubject<string | null>(null);
  countryCode$ = this.countryCodeSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  private selectedLanguageSubject = new BehaviorSubject<LanguageDto | null>(
    null,
  );
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

  languages$: Observable<LanguageDto[]>;

  private destroy$ = new Subject<void>();

  countryName$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nationsService: NationsService,
  ) {
    this.languages$ = this.countrySubject.pipe(
      filter((country) => !!country),
      switchMap((country) => {
        const countryId = country.countryId;
        if (!countryId) {
          return of([]);
        }

        this.loadingSubject.next(true);
        return this.nationsService.getCountryLanguages(countryId).pipe(
          catchError((error) => {
            console.error('Error loading languages:', error);
            this.errorSubject.next(
              'Failed to load languages. Please try again.',
            );
            return of([]);
          }),
          tap(() => this.loadingSubject.next(false)),
        );
      }),
    );

    this.countryName$ = combineLatest([this.country$, this.countryCode$]).pipe(
      map(([country, code]) => country?.countryName || code || 'Unknown Country'),
    );

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['country']) {
      this.countrySubject.next(navigation.extras.state['country']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const code = params.get('code');
      this.countryCodeSubject.next(code);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
