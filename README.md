# NationsFrontend

A modern Angular application for exploring countries, their statistics, and spoken languages, with full internationalization (i18n) support.

## Features

- **Angular Standalone Components**: Modular UI with standalone components for each feature.
- **NgRx State Management**: Robust state handling using actions, reducers, selectors, and effects.
- **Internationalization**: Supports English and French via [ngx-translate](https://github.com/ngx-translate/core). All UI text is translatable.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **API Integration**: All backend communication via `NationsService`.
- **Pagination & Filtering**: Advanced table filtering and pagination.
- **Popup Modals**: Uses Angular named outlets for modal dialogs.
- **Responsive Design**: Fully responsive layout.

## Project Structure

```
src/
  app/
    components/
      countries-list/
      countries-search/
      countries-stats/
      country-languages/
      nations-homepage/
    shared/
      components/
      constants/
      models/
      services/
      store/
    pipes/
    app.routes.ts
    app.config.ts
  assets/
    i18n/
      en.json
      fr.json
  styles.css
```

## Developer Workflows

- **Start Dev Server**:
  ```bash
  ng serve
  ```
- **Run Unit Tests**:
  ```bash
  ng test
  ```
- **Build for Production**:
  ```bash
  ng build
  ```
- **Generate Component**:
  ```bash
  ng generate component <name>
  ```
- **Lint/Format**:  
  Uses `.prettierrc` and `.editorconfig` (2 spaces, single quotes for TS).

## Internationalization (i18n)

- All user-facing text must be present in both `en.json` and `fr.json` (`src/assets/i18n/`).
- To add a new translation key, update both files.  
  Example:
  ```json
  // en.json
  "NATIONS-table.population": "Population",
  // fr.json
  "NATIONS-table.population": "Population",
  ```

## API Integration

- All backend calls are handled by `NationsService` (`src/app/shared/services/nations.service.ts`).
- API base URL is configured in `src/app/shared/constants/config.constants.ts`.

## State Management

- Store logic is in `src/app/shared/store/`.
- Use selectors for view models, not just raw state.
- Effects handle API calls and centralized error handling.

## Styling

- Tailwind CSS is configured via `tailwind.config.js` and `postcss.config.js`.
- Global styles in `src/styles.css`.

## Routing

- Routes are defined in `src/app/app.routes.ts`.
- Named outlets are used for popup modals.

## Contributing

1. Fork the repo and create your branch.
2. Add or update translations in both `en.json` and `fr.json`.
3. Follow the component and state management patterns.
4. Run tests before submitting a PR.

## License

MIT

---

For more details, see the code comments and [`.github/copilot-instructions.md`](.github/copilot-instructions.md).
