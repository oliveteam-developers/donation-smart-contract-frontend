import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Store } from '@ngrx/store';

// States
import { selectContractData } from '../../states/contract';

// Interfaces
import { IContractInfo } from '../../interfaces';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3;
  private factory: any;
  private contract: IContractInfo;

  constructor(
    private store: Store,
  ) {
    this.store.select(selectContractData).subscribe(res => {
      if (res) {
        this.contract = res;
        this.loadWeb3();
        this.loadFactory();
      }
    });
  }

  public get web3Instance() {
    return this.web3;
  }

  public get factoryInstance() {
    return this.factory;
  }

  public donationInstance(address: string) {
    const abi = this.contract.donation?.abi;
    return new this.web3.eth.Contract(JSON.parse(JSON.stringify(abi)), address);
  }

  private loadWeb3() {
    if (window && window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      this.web3 = new Web3(window.ethereum);
    } else {
      console.log('Can not detect Etherem. Please install Metamask.');
    }
  }

  private loadFactory() {
    const abi = this.contract.factory?.abi;
    const address = this.contract.address;
    this.factory = new this.web3.eth.Contract(JSON.parse(JSON.stringify(abi)), address);
  }

}
