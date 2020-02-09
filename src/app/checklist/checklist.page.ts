import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Task } from '../models/task.interface';
import { ChecklistService } from '../checklist.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  taskForm: FormGroup;
  timerSub: Subscription;
  time: number;
  history:Array<Task> = [];
  historySub:Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private checklistService : ChecklistService,

  ) {  }

  
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
     taskName: ['', [Validators.required, Validators.minLength(3) ] ] 
    });
    this.historySub = this.checklistService.list$.subscribe( taskData => this.history = taskData );
  }


  addTask() {
    let task:Task= {
      name: this.taskForm.get('taskName').value,
      created: new Date().getTime(),
      status: false
  
    }
    this.checklistService.addToList( task );
    this.taskForm.reset();  
  }
  
  changeCheckboxStatus(id:number){
    this.checklistService.taskList.forEach((tasks)=> {
      if(tasks.created == id){
        tasks.status = true;
      }
    });
    this.checklistService.saveData();
  }

  delete( itemStart ) {
    this.checklistService.deleteFromList( itemStart );
  }

}
