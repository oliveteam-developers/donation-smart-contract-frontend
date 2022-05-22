import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { Web3Service } from '../../services/web3/web3.service';

// States
import { selectEventData } from '../../states/event';

// Interfaces
import { ITableColumn, IListContractItem } from '../../interfaces';

// Constants
import { REFRESH_LIST_CONTRACTS } from '../../constants';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, OnDestroy {

  @ViewChild('createContractModal') private createContractModal: TemplateRef<ContractComponent>

  public contractTableColumns: ITableColumn[] = [];
  public listContracts: IListContractItem[] = [];
  public loading: boolean = false;

  private subscriptions: Subscription[] = [];
  private createContractModalRef: NgbModalRef;

  constructor(
    private store: Store,
    private web3Service: Web3Service,
    private modalService: NgbModal,
  ) {
    this.subscriptions.push(
      this.store.select(selectEventData).subscribe(res => {
        if (res) {
          switch (res.name) {
            case REFRESH_LIST_CONTRACTS: {
              this.getListContracts();
              break;
            }
          }
        }
      })
    );
  }

  ngOnInit() {
    this.contractTableColumns = [
      { field: 'id', header: 'ID' },
      { field: 'address', header: 'Address' },
      { field: '', header: '' }
    ];

    this.getListContracts();
  }

  public createContract() {
    this.createContractModalRef = this.modalService.open(this.createContractModal);
  }

  public closeModal() {
    if (this.createContractModalRef) {
      this.createContractModalRef.close();
    }
  }

  private async getListContracts() {
    try {
      this.loading = true;
      const listContracts = await this.web3Service.factoryInstance.methods.getDeployedDonations().call();
      if (listContracts && listContracts.length) {
        let i = 0;
        for (const item of listContracts) {
          i++;
          const contractItem: IListContractItem = {
            id: i,
            address: item,
          }
          this.listContracts.push(contractItem);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
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
