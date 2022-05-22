import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ContractComponent } from './contract.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
  },
  {
    path: ':address',
    component: ContractDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }