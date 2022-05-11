import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractRoutingModule } from './contract-routing.module';

// Shared
import { SharedModule } from '../../shared/shared.module';

// Components
import { ContractComponent } from './contract.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';

@NgModule({
  declarations: [
    ContractComponent,
    ContractDetailComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    SharedModule,
  ]
})
export class ContractModule { }
