import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import { Folder } from '../models/folder.interface';
import { FolderDetailPage } from '../folder-detail/folder-detail.page';
import { ReplaySubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-folder',
  templateUrl: './folders.page.html',
  styleUrls: ['./folders.page.scss'],
})
export class FoldersPage implements OnInit {

  public folders: Array<Folder> = new Array();
  private foldersData: Array<Folder> = new Array();

  private loadingState: ReplaySubject<boolean> = new ReplaySubject();
  private foldersSub: Subscription;
  private authSub: Subscription;

  constructor(
    private data:DataService , 
    private modal:ModalController,
    private loading: LoadingController,
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    //check auth status
    this.afAuth.authState.subscribe( (user => {
      if (user){
        this.getFolder();
      }
      else {
        this.foldersSub.unsubscribe();
      }
    }))
    //get folders
    this.getFolder();
  }

  async addFolder(){
    const addModal = await this.modal.create({ component: AddPage});
    addModal.onDidDismiss().then((response ) => {
      if( response.data ){
        //create note
        console.log(response.data);
        this.data.addFolder( response.data );
      }
    })
    .catch(( error ) => {
      console.log(error);
    });
    addModal.present();
  }

  async getFolder(){
    //set loading satte to true to show spinner
    this.loadingState.next(true);
    //show loading spinner
    this.showLoading();
    this.foldersSub = this.data.folders$.subscribe((data)=>{
      //store original data in notes data
      this.foldersData = data;
      //store notes to display in notes
      this.folders = data;
      this.loadingState.next(false);
    });
    this.data.folders$.subscribe((data) => {
      console.log(data);
      this.folders = data;
    })
  }

  filterFolders( event ){
    let searchTerm = event.target.value.toLowerCase();
    this.folders = this.foldersData.filter( (folder) => {
      if ( folder.name.toLowerCase().indexOf(searchTerm)!== -1){
        return folder;
      }
    });
  }

  restoreNotes(){
    this.folders = this.foldersData;
  }

  /*openFolder(){

  }*/

  async getFolderDetail(folder){
    const detailModal = await this.modal.create({ component: FolderDetailPage, componentProps: {
      "name": folder.name,
      "date": folder.date,
      "id": folder.id
    }});
    detailModal.onDidDismiss().then( (response) => {
      if(response.data){
        //save the changes in the folder
        this.data.updateFolder(response.data);
      }
    })
    .catch( (error) => console.log(error));
    detailModal.present();
  }

  async showLoading(){
    const loadingIndicator = await this.loading.create({
      spinner: "bubbles"
    });
    this.loadingState.subscribe( (value) => {
      if (value == true){
        loadingIndicator.present();
      }
      else{
        loadingIndicator.dismiss();
      }
    });
  }
  


}

