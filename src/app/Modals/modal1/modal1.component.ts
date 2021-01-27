import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.css']
})


export class Modal1Component implements OnInit {
  @Input() title = `Information`;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  modalform:FormGroup;

  constructor(
    public activeModal: NgbActiveModal, private formbuilder: FormBuilder,private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.modalform=this.formbuilder.group({
      'email':new FormControl(this.modalform,[Validators.required,Validators.minLength(3)]),
      'password':new FormControl(this.modalform,Validators.compose([Validators.required])),
      'displayname':new FormControl(this.modalform,Validators.compose([Validators.required]))
    });
  }
  submitForm() {
    this.activeModal.close(this.modalform.value);
  }


}
