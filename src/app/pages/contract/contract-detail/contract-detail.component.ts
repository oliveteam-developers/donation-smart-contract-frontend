import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

// Services
import { Web3Service } from '../../../services/web3/web3.service';

// Interfaces
import { IContractDetail, IContractRequest, ITableColumn } from '../../../interfaces';

// States
import { selectEventData } from 'src/app/states/event';

// Constants
import { REFRESH_LIST_REQUESTS } from 'src/app/constants';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit, OnDestroy {

  @ViewChild('contributionModal') private contributionModal: TemplateRef<ContractDetailComponent>
  @ViewChild('createRequestModal') private createRequestModal: TemplateRef<ContractDetailComponent>
  @ViewChild('confirmModal') private confirmModal: TemplateRef<ContractDetailComponent>

  public contractDetail: IContractDetail;
  public address: any;
  public isManager: boolean = false;
  public isContributor: boolean = false;
  public requests: IContractRequest[] = [];
  public requestTableColumns: ITableColumn[] = [];
  public message: string = '';
  public confirmType: string = '';
  public requestIndex: any;
  public confirmLoading: boolean = false;

  private subscriptions: Subscription[] = [];
  private contributionModalRef: NgbModalRef;
  private createRequestModalRef: NgbModalRef;
  private confirmModalRef: NgbModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private web3Service: Web3Service,
    private modalService: NgbModal,
    private store: Store,
  ) {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');

    this.subscriptions.push(
      this.store.select(selectEventData).subscribe(res => {
        if (res) {
          switch (res.name) {
            case REFRESH_LIST_REQUESTS: {
              this.getContractDetail();
              break;
            }
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.requestTableColumns = [
      { field: 'description', header: 'Description' },
      { field: 'value', header: 'Value (WEI)' },
      { field: 'recipient', header: 'Recipient' },
      { field: 'approvalsCount', header: 'Number of approvals' },
    ];

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

  public openConfirmationModal(index: any, type: string) {
    this.confirmModalRef = this.modalService.open(this.confirmModal);
    this.requestIndex = index;

    switch (type) {
      case 'approve': {
        this.confirmType = 'approve';
        this.message = 'Do you want to approve this request?';
        break;
      }
      case 'finish': {
        this.confirmType = 'finish';
        this.message = 'Do you want to finish this request?';
        break;
      }
    }
  }

  public handleOk() {
    switch (this.confirmType) {
      case 'approve': {
        this.approveRequest();
        break;
      }
      case 'finish': {
        this.finishRequest();
        break;
      }
    }
  }

  public handleCancel() {
    this.closeConfirmModal();
  }

  private closeConfirmModal() {
    if (this.confirmModalRef) {
      this.confirmModalRef.close();
      this.confirmType = '';
      this.message = '';
      this.requestIndex = null;
    }
  }

  private async approveRequest() {
    try {
      this.confirmLoading = true;
      const donation = this.web3Service.donationInstance(this.address);
      const accounts = await this.web3Service.web3Instance.eth.getAccounts();
      await donation.methods.approveRequest(parseInt(this.requestIndex)).send({
        from: accounts[0],
      });
      this.getContractDetail();
    } catch (e) {
      console.log(e);
    } finally {
      this.confirmLoading = false;
      this.closeConfirmModal();
    }
  }

  private async finishRequest() {
    try {
      this.confirmLoading = true;
      const donation = this.web3Service.donationInstance(this.address);
      const accounts = await this.web3Service.web3Instance.eth.getAccounts();
      await donation.methods.finishRequest(parseInt(this.requestIndex)).send({
        from: accounts[0],
      });
      this.getContractDetail();
    } catch (e) {
      console.log(e);
    } finally {
      this.confirmLoading = false;
      this.closeConfirmModal();
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

      const accounts = await this.web3Service.web3Instance.eth.getAccounts();

      this.isContributor = await donation.methods.approvers(accounts[0]).call();

      if (accounts[0] === this.contractDetail.managerAddress) {
        this.isManager = true;
      }

      await this.getListRequests();
    } catch (e) {
      console.log(e);
    }
  }

  private async getListRequests() {
    try {
      if (this.contractDetail.requests) {
        const requests = [];

        const countRequests = parseInt(this.contractDetail.requests, 10);
        const donation = this.web3Service.donationInstance(this.address);

        for (let i = 0; i < countRequests; i++) {
          const req = await donation.methods.requests(i).call();
          const data: IContractRequest = {
            approvalsCount: req.approvalsCount,
            complete: req.complete,
            description: req.description,
            recipient: req.recipient,
            value: req.value,
            completable: parseInt(req.approvalsCount) > (parseInt(this.contractDetail.contributers) / 2)
          }
          requests.push(data);
        }

        this.requests = [...requests];
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
