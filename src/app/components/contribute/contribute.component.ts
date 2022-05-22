import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

// Services
import { Web3Service } from '../../services/web3/web3.service';
import { HelperService } from '../../services/helper/helper.service';

// Validation
import { CustomValidation } from '../../validation';

// Constants
import { REFRESH_LIST_REQUESTS } from 'src/app/constants';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

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
      donation: ['', [Validators.required, CustomValidation.number]],
    });
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      const accounts = await this.web3Service.web3Instance.eth.getAccounts();
      const donationInstance = this.web3Service.donationInstance(this.address);

      const { donation } = this.form.value;

      await donationInstance.methods.contribute().send({
        from: accounts[0],
        value: donation,
      });

      this.messageService.add({
        severity: 'success',
        detail: 'Create contract successfully'
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
      this.cancel();
    }
  }

  public cancel() {
    this.cancelCb.emit();
  }

}
