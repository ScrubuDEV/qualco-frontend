import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { NationsService } from '../../shared/services/nations.service';
import { CountrySearchData } from '../../shared/models/country.models';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-countries-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './countries-search.component.html',
  styleUrl: './countries-search.component.scss',
})
export class CountriesSearchComponent implements OnInit {
  // Filter properties
  selectedRegion: string = '';
  yearFrom: number | null = null;
  yearTo: number | null = null;

  // Available regions for dropdown
  regions: string[] = [];

  // Data and pagination
  countriesData: CountrySearchData[] = [];
  loading = false;
  error: string | null = null;

  // Pagination configuration
  paginationConfig: PaginationConfig = {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 5,
  };

  constructor(private nationsService: NationsService) {}

  ngOnInit() {
    this.loadRegions();
    this.loadCountriesData();
  }

  loadRegions() {
    // For now, use hardcoded regions since getRegions might not exist
    this.regions = [
      'North America',
      'South America',
      'Europe',
      'Asia',
      'Africa',
      'Oceania',
    ];
  }

  loadCountriesData() {
    this.loading = true;
    this.error = null;

    const filters = {
      region: this.selectedRegion || undefined,
      yearFrom: this.yearFrom || undefined,
      yearTo: this.yearTo || undefined,
      page: this.paginationConfig.currentPage,
      size: this.paginationConfig.pageSize,
    };

    // For now, simulate the API call since the method might not exist
    setTimeout(() => {
      // Mock data for demonstration
      const mockData: CountrySearchData[] = [
        {
          continentName: 'Europe',
          regionName: 'Western Europe',
          countryName: 'France',
          year: 2023,
          population: 67000000,
          gdp: 2800,
        },
        {
          continentName: 'Europe',
          regionName: 'Western Europe',
          countryName: 'Germany',
          year: 2023,
          population: 83000000,
          gdp: 4200,
        },
        {
          continentName: 'Asia',
          regionName: 'Eastern Asia',
          countryName: 'Japan',
          year: 2023,
          population: 125000000,
          gdp: 4900,
        },
        {
          continentName: 'North America',
          regionName: 'Northern America',
          countryName: 'United States',
          year: 2023,
          population: 331000000,
          gdp: 23300,
        },
        {
          continentName: 'Asia',
          regionName: 'Southern Asia',
          countryName: 'India',
          year: 2023,
          population: 1380000000,
          gdp: 3400,
        },
      ];

      this.countriesData = mockData;
      this.paginationConfig = {
        ...this.paginationConfig,
        totalPages: Math.ceil(mockData.length / this.paginationConfig.pageSize),
        totalElements: mockData.length,
      };
      this.loading = false;
    }, 1000);
  }

  applyFilters() {
    this.paginationConfig = { ...this.paginationConfig, currentPage: 0 };
    this.loadCountriesData();
  }

  clearFilters() {
    this.selectedRegion = '';
    this.yearFrom = null;
    this.yearTo = null;
    this.paginationConfig = { ...this.paginationConfig, currentPage: 0 };
    this.loadCountriesData();
  }

  onPageChange(page: number) {
    this.paginationConfig = { ...this.paginationConfig, currentPage: page };
    this.loadCountriesData();
  }

  onPageSizeChange(pageSize: number) {
    this.paginationConfig = {
      ...this.paginationConfig,
      pageSize: pageSize,
      currentPage: 0,
    };
    this.loadCountriesData();
  }

  get paginatedData(): CountrySearchData[] {
    return this.countriesData;
  }
}
