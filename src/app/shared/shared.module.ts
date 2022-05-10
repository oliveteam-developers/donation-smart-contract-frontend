import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';

const sharedModules = [
  CommonModule,
  FormsModule,
  TableModule,
];

@NgModule({
  imports: [
    ...sharedModules
  ],
  declarations: [],
  exports: [
    ...sharedModules,
  ]
})
export class SharedModule { }