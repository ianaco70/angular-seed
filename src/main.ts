import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'prod') {
  console.log('zzz1: ', process.env.ENV);
  enableProdMode();
  platformBrowser().bootstrapModule(AppModule);
} else {
  console.log('zzz1: ', process.env.ENV);
  platformBrowserDynamic().bootstrapModule(AppModule);
}
