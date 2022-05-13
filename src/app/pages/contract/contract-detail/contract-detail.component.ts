import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { Web3Service } from '../../../services/web3/web3.service';

// Interfaces
import { IContractDetail } from '../../../interfaces';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit, OnDestroy {

  public contractDetail: IContractDetail;
  public address: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private web3Service: Web3Service,
  ) {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  ngOnInit(): void {
    this.getContractDetail();
  }

  private async getContractDetail() {
    try {
      const donation = this.web3Service.donationInstance(this.address);
      const result = await donation.methods.getDetail().call();

      this.contractDetail = {
        managerAddress: result[0],
        minimumContribution: result[1],
        requests: result[2],
        contributers: result[3],
        balance: result[4],
      }
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
