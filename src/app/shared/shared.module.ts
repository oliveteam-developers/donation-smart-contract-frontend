import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

// Components
import { CreateContractComponent } from '../components/create-contract/create-contract.component';
import { LoadingComponent } from '../components/loading/loading.component';

const sharedModules = [
  CommonModule,
  FormsModule,
  TableModule,
  ButtonModule,
  NgbModule,
  InputTextModule,
  ReactiveFormsModule,
  ToastModule,
];

const sharedComponents = [
  CreateContractComponent,
  LoadingComponent
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