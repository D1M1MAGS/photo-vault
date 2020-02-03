import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
//import { Folder } from '../models/folder.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Folder } from 'src/app/models/folder.interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private foldersCollection: AngularFirestoreCollection<Folder>;
  public folders: Observable <Folder[]>;
  public folders$ = new BehaviorSubject<Folder[]>([]);
  //private authStatus;
  private uid:string;
  private authStatus:Subscription;
  private ncSub: Subscription;

  constructor(private afs:AngularFirestore, private afauth:AngularFireAuth) {
    //get the user auth status
    this.authStatus = afauth.authState.subscribe( (user) => {
      if(user) {
        //get the user id
        this.uid = user.uid;
        //create path
        let path = `folders/${this.uid}/userfolders`;
        //set the collection
        this.foldersCollection = afs.collection<Folder> (path);
        //this.notes$ = this.getNotes();
        this.ncSub = this.getFolders().subscribe((folders) => {
          this.folders$.next(folders);
        });
      }
      else{
        this.ncSub.unsubscribe();
      }
    });
    //this.notesCollection = afs.collection<Note>('notes');

   }
   addFolder( data:Folder ){
     this.foldersCollection.add(data);
   }

   getFolders(){
     return this.foldersCollection.snapshotChanges()
     .pipe( map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Folder;
       const id = a.payload.doc.id;
       return { id, ...data};
     }))
     );
   }

   updateFolder( folder ) {
     this.foldersCollection.doc(folder.id).update({
       name: folder.name,
       id: folder.id,
     });
   }

   deleteFolder(id){
     this.foldersCollection.doc(id).delete();

   }

   getUid(){
     return this.uid;
   }
}
