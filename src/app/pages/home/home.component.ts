import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// Services
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';
import { Web3Service } from  '../../services/web3/web3.service';

// States
import { selectContractData } from '../../states/contract';

// Interfaces
import { IContractInfo } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private contract: IContractInfo;

  constructor(
    private store: Store,
    private apiService: ApiService,
    private helperService: HelperService,
    private web3Service: Web3Service,
  ) {
    this.subscriptions.push(
      this.store.select(selectContractData).subscribe(res => {
        if (res) {
          this.contract = res;
        }
      })
    );
  }

  ngOnInit() {
    this.getListContracts();
  }

  private async getListContracts() {
    try {
      const listContracts = await this.web3Service.factoryInstance.methods.getDeployedDonations().call();
      console.log(listContracts);
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    if (this.subscriptions.length) {
      this.subscriptions.map(sub => {
        if (sub) {
          sub.unsubscribe();
        }
      });
    }
  }

}
