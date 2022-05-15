import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @ViewChild('contributionModal') private contributionModal: TemplateRef<ContractDetailComponent>
  @ViewChild('createRequestModal') private createRequestModal: TemplateRef<ContractDetailComponent>

  public contractDetail: IContractDetail;
  public address: any;

  private subscriptions: Subscription[] = [];
  private contributionModalRef: NgbModalRef;
  private createRequestModalRef: NgbModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private web3Service: Web3Service,
    private modalService: NgbModal,
  ) {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  ngOnInit(): void {
    this.getContractDetail();
  }

  public openContributionModal() {
    this.contributionModalRef = this.modalService.open(this.contributionModal);
  }

  public openCreateRequestModal() {
    this.createRequestModalRef = this.modalService.open(this.createRequestModal);
  }

  public closeContributionModal() {
    if (this.contributionModalRef) {
      this.contributionModalRef.close();
    }
  }

  public closeCreateRequestModal() {
    if (this.createRequestModalRef) {
      this.createRequestModalRef.close();
    }
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
