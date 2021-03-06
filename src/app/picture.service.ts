import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// camera 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../app/data.service';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
//import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  // camera options
  private options: CameraOptions = {
    quality: 50,
    allowEdit: true,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL
  }
  
  public downloadURL: Observable<string>;

  constructor(
    private afStorage: AngularFireStorage,
    private dataService: DataService,
    private camera: Camera,
    private platform: Platform
  ) { }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.uploadImage( imageData );
    })
    .catch((err) => {
      console.log( err );
    });
    return this.downloadURL;
  }

  uploadImage( data ) {
    // before upload works, be sure to setup the "storage" section in your firebase
    // create reference path
    const uid = this.dataService.getUid();
    // create a name for the file
    const ts = new Date().getTime();
    const fileName = `image_${ts}.jpg`;
    // create a path to store the file
    const filePath = `uploads/photos/${uid}/${fileName}`;
    let ref = this.afStorage.ref(filePath);
    // create a filestring for image
    const image = `data:image/jpeg;base64,${data}`;
    const task = ref.putString( image, 'data_url' );
    // observe the progress in upload, when finished get the URL of the image
    task.snapshotChanges().pipe(
      finalize( () => { 
        this.downloadURL = ref.getDownloadURL() 
      })
    ).subscribe();
  }



}