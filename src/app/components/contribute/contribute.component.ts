import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Validation
import { CustomValidation } from '../../validation';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  @Output() cancelCb = new EventEmitter<any>();

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      donation: [0, [Validators.required, CustomValidation.number]],
    });
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }
  }

  public cancel() {
    this.cancelCb.emit();
  }

}
