import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

if (process.env.ENV === 'build') {
  enableProdMode();
}

bootstrap(AppComponent, [
  // Dependencies go here!
]).catch(err => console.error(err));
