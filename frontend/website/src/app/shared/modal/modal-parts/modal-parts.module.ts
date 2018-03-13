import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '~/shared/material/material.module';
import { ModalTitleComponent } from './modal-title.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ModalTitleComponent,
  ],
  exports: [
    ModalTitleComponent,
  ]
})
export class ModalPartsModule { }
