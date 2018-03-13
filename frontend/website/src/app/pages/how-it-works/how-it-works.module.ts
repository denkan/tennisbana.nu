import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './how-it-works.routes';

import { HowItWorksComponent } from './how-it-works.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HowItWorksComponent,
  ]
})
export class HowItWorksModule { }
