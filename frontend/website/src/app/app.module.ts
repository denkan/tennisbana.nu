import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// locale: swedish
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
registerLocaleData(localeSv);
// --

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CoreModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'sv-SE' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
