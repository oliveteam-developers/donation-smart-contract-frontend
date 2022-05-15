import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Validation
import { CustomValidation } from '../../validation';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  @Output() cancelCb = new EventEmitter<any>();

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required]],
      value: [0, [Validators.required, CustomValidation.number]],
      recipient: ['', [Validators.required]]
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
