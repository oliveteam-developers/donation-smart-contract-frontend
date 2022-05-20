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
import { LoadingComponent } from '../components/loading/loading.component';
import { CreateContractComponent } from '../components/create-contract/create-contract.component';
import { ContributeComponent } from '../components/contribute/contribute.component';
import { CreateRequestComponent } from '../components/create-request/create-request.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

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
  LoadingComponent,
  ContributeComponent,
  CreateRequestComponent,
  ConfirmationComponent,
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