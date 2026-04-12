import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";

import { Observable, of } from "rxjs";
import { provideRouter } from "@angular/router";
import en from '../assets/translations/en.json';
import pt from '../assets/translations/pt.json';

import { routes } from "./app.routes";
import { TranslateLoader, TranslateModule, TranslationObject } from '@ngx-translate/core';


const TRANSLATIONS: Record<string, TranslationObject> = { en, pt };

class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['en']);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useClass: StaticTranslateLoader,
        },
      })
    )
  ],
};
