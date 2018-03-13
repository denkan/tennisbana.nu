import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatTabsModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTooltipModule,
  DateAdapter
} from '@angular/material';

import { CustomDatePickerAdapter } from './custom-date-picker-adapter';

export const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatTabsModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDatePickerAdapter },
  ],
  exports: [
    ...materialModules,
  ]
})
export class MaterialModule { }
