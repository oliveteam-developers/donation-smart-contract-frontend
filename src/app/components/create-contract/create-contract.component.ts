import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

// Services
import { Web3Service } from '../../services/web3/web3.service';
import { HelperService } from '../../services/helper/helper.service';

// Validation
import { CustomValidation } from '../../validation';

// Constants
import { REFRESH_LIST_CONTRACTS } from '../../constants';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {

  @Output() cancelCb = new EventEmitter<any>();

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private messageService: MessageService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      minimumContribution: ['', [Validators.required, CustomValidation.number]],
    });
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      const accounts = await this.web3Service.web3Instance.eth.getAccounts();
      await this.web3Service.factoryInstance.methods
        .createDonation(this.form.value.minimumContribution)
        .send({
          from: accounts[0],
        });

      this.messageService.add({
        severity: 'success',
        detail: 'Create contract successfully'
      });
      this.helperService.emitEvent(REFRESH_LIST_CONTRACTS);
    } catch (e) {
      console.log(e);
      this.messageService.add({
        severity: 'error',
        detail: 'Something went wrong'
      });
    } finally {
      this.cancel();
      this.loading = false;
    }
  }

  public cancel() {
    this.cancelCb.emit();
  }

}
