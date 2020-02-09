import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { SignupPageModule } from './signup/signup.module';
import { AddPageModule } from './add/add.module';
import { FolderDetailPageModule } from './folder-detail/folder-detail.module';
import { IonicStorageModule } from '@ionic/storage';

// camera 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

//google maps
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SignupPageModule,
    AddPageModule,
    FolderDetailPageModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
