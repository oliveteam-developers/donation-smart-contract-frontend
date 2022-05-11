import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { ContractRoutingModule } from './contract-routing.module';

// Shared
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    SharedModule,
  ]
})
export class ContractModule { }
