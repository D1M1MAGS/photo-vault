import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private addForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
    private picture: PictureService  ) {}
     

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
    let folderData = {name:name, date:date};
    this.modal.dismiss( folderData);
    this.close();
  }

  takePhoto(){
    this.picture.takePicture();
    this.picture.downloadURL.subscribe( (url) => {
      console.log(url)
    })
  }

}
