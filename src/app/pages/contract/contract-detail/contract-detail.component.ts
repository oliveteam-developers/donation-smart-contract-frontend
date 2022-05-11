import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { Web3Service } from '../../../services/web3/web3.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private address: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private web3Service: Web3Service,
  ) {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  ngOnInit(): void {
    this.getContractDetail();
  }

  private getContractDetail() {

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
