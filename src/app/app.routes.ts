import { Routes } from '@angular/router';
import { NationsHomepageComponent } from './components/nations-homepage/nations-homepage.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryLanguagesComponent } from './components/country-languages/country-languages.component';
import { CountriesStatsComponent } from './components/countries-stats/countries-stats.component';
import { CountriesSearchComponent } from './components/countries-search/countries-search.component';

export const routes: Routes = [
  { path: '', component: NationsHomepageComponent },
  { path: 'countries', component: CountriesListComponent },
  {
    path: 'countries/:code/languages',
    component: CountryLanguagesComponent,
    outlet: 'popup',
  },
  { path: 'countries-stats', component: CountriesStatsComponent },
  { path: 'countries-search', component: CountriesSearchComponent },
  { path: 'about', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
