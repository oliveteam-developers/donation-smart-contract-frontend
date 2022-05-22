import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input() message: string;
  @Input() loading: boolean;

  @Output() cancelCb = new EventEmitter<any>();
  @Output() okCb = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public cancel() {
    this.cancelCb.emit();
  }

  public ok() {
    this.okCb.emit();
  }

}
