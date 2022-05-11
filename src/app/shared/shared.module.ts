import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Components
import { CreateContractComponent } from '../components/create-contract/create-contract.component';

const sharedModules = [
  CommonModule,
  FormsModule,
  TableModule,
  ButtonModule,
  NgbModule,
  InputTextModule,
  ReactiveFormsModule,
];

const sharedComponents = [
  CreateContractComponent,
];

@NgModule({
  imports: [
    ...sharedModules
  ],
  declarations: [
    ...sharedComponents,
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents,
  ]
})
export class SharedModule { }