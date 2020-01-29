import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private addForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController  ) {}
     

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  close(){
    this.modal.dismiss();
  }

  submit(){
    //get data from form
    let name = this.addForm.controls.name.value;
    let date = new Date();
    let noteData = {name:name, date:date};
    this.modal.dismiss( noteData);
  }

}
