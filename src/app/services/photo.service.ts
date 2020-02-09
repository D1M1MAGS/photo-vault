import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  dataService: any;
  afStorage: any;
  imagePicker: any;
  firebaseService: any;
  toastCtrl: any;

  constructor(private camera: Camera, private storage: Storage) { }

  takePicture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    
    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
    
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);

    });

    this.loadSaved();
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }

  uploadImage( data ) {
    console.log( this.dataService.getUid() );
    const file = data;
    const filePath = 'enter-your-file-path-here';
    const task = this.afStorage.upload(filePath, file);
  }

  /*uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
      })
    })
  })
}

  encodeImageUri(imageUri, callback){
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function() {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img,0,0);
      var dataUrl = c.toDataURL("image/jpeg");
      callback(dataUrl);
    };
    img.src = imageUri;
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission().then((result)=> {
      if(result == false){
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount:1
        }).then((results)=>{
          for (var i = 0; i < results.length; i++){
            this.uploadImageToFirebase(results[i]);
          }
        }, (err) => console.log(err)
        );
    }
  }, (err) => {
    console.log(err);
  });
}

uploadImageToFirebase(image){
  image = normalizeURL(image);

  this.firebaseService.uploadImage(image).then(PhotoURL => {
    let toast = this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    toast.present();
  })
}*/
  
}

class Photo {
  data: any;
}


