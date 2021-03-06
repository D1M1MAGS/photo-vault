import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    /*{
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },*/
    {
      title: 'Folders',
      url: '/folders',
      icon: 'folder-open'
    },

    {
      title: 'Quick Add / Import',
      url: '/import',
      icon: 'cloud-upload'
    },

    {
      title: 'Discover / Google Maps',
      url: '/home',
      icon: 'navigate'
    },

    {
      title: 'Discovery Checklist',
      url: '/checklist',
      icon: 'list'
    },

    {
      title: 'Test Map',
      url: '/list',
      icon: 'map'
    }

  ];

  user:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeNavigation(){
    this.afAuth.authState.subscribe((user)=> {
      if( user ) {
        this.appPages = [
          {title: 'Folders', url: '/folders', icon: 'folder-open'},
          {title: 'Quick Add / Import', url: '/import', icon: 'cloud-upload'},
          {title: 'Discover / Google Maps', url: '/home', icon: 'navigate'},
          {title: 'Discovery Checklist', url: '/checklist', icon: 'list'},
          {title: 'Test Map', url: '/list', icon: 'map'}
          /*{title: 'Settings', url: '/settings ', icon: 'settings'}*/
      ]
      this.user = user;
      }
      else {
        this.appPages = [
          {title: 'Sign In', url: '/signin ', icon: 'log-in'}
        ]
        this.user = null;
      }
    })
  }

  signOut(){
    this.afAuth.auth.signOut().then(()=>{
      //redirect user to sign in page
      this.router.navigate(['/signin'])
    });
  }

}
