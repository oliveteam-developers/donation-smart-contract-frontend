import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

// Services
import { Web3Service } from 'src/app/services/web3/web3.service';
import { HelperService } from 'src/app/services/helper/helper.service';

// Validation
import { CustomValidation } from '../../validation';

// Constants
import { REFRESH_LIST_REQUESTS } from 'src/app/constants';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  @Output() cancelCb = new EventEmitter<any>();

  public form: FormGroup;
  public loading: boolean = false;

  private address: any;

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private helperService: HelperService,
  ) {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required]],
      value: ['', [Validators.required, CustomValidation.number]],
      recipient: ['', [Validators.required]]
    });
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      const accounts = await this.web3Service.web3Instance.eth.getAccounts();
      const donation = this.web3Service.donationInstance(this.address);

      const { description, value, recipient } = this.form.value;

      await donation.methods
        .createRequest(description, value, recipient)
        .send({ from: accounts[0] });

      this.messageService.add({
        severity: 'success',
        detail: 'Create request successfully'
      });
      this.helperService.emitEvent(REFRESH_LIST_REQUESTS);
    } catch (e) {
      console.log(e);
      this.messageService.add({
        severity: 'error',
        detail: 'Something went wrong'
      });
    } finally {
      this.loading = false;
      this.cancel();;
    }
  }

  public cancel() {
    this.cancelCb.emit();
  }

}
