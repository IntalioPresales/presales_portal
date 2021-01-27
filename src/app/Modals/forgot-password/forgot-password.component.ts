import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() title = `Information`;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  modalform:FormGroup;

  constructor(
    public activeModal: NgbActiveModal, private formbuilder: FormBuilder,private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.modalform=this.formbuilder.group({
      'email':new FormControl(this.modalform,[Validators.required,Validators.minLength(3),Validators.email])
    });
  }
  submitForm() {
    this.activeModal.close(this.modalform.value);
  }

}
