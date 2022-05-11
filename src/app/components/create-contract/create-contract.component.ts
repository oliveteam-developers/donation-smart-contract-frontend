import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Interfaces
import { ICreateContract } from '../../interfaces';

// Validation
import { CustomValidation } from '../../validation';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {

  @Output() cancelCb = new EventEmitter<any>();

  public form: FormGroup;
  public loading: boolean = false;
  public data: ICreateContract = {
    minimumContribution: 0,
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      minimumContribution: ['', [Validators.required, CustomValidation.number]],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

  public create() {
    console.log(this.data);
  }

  public cancel() {
    this.cancelCb.emit();
  }

}
