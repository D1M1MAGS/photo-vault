import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  currentImage:any;

  constructor( private camera: Camera, public photoService: PhotoService ) { }

  ngOnInit() {

    this.photoService.loadSaved();

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photoService.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
      }); }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
  });
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photoService.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
      }); }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
  });
  }

}
