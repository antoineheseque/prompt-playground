import { bootstrapApplication } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'fr-FR');
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
