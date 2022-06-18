import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { task } from '../model/Task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  todoForm !: FormGroup;
  //List of task
  tasks: task[] = [];
  //List for Progress
  inProgress: task[] = [];
  //List for Done Part
  done: task[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;
  isEditEnabledProgress: boolean = false;
  isEditEnabledTodo: boolean = false;
  // localItem: string
  constructor(private fb: FormBuilder) {


    // this.localItem = localStorage.getItem("tasks");
    // if (this.localItem == null) {

    //   this.tasks = [];
    // }
    // else {
    //   this.tasks = JSON.parse(this.localItem);
    // }





  }

  ngOnInit() {
    // Initializing the form
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }
  //Function for adding task
  addTask() {

    if (this.tasks.length < 1) {
      //Pushing the object in an an Array
      this.tasks.push({
        title: this.todoForm.value.item,
        description: this.todoForm.value.desc,
        done: false
      })
      this.todoForm.reset();

      // localStorage.setItem("tasks", JSON.stringify(this.tasks));
    
    }

    else {
      let y = [];
      for (let i = 0; i < this.tasks.length; i++) {
        y.push(this.tasks[i].title);
      }
      if (y.includes(this.todoForm.value.item)) {
        alert("Todo Already Exist")
      }
      else {

        this.tasks.push({
          title: this.todoForm.value.item,
          description: this.todoForm.value.desc,
          done: false
        })
        console.log(this.tasks[0].title);
      }
    }
    this.todoForm.reset();


  }
  onEdit(item: task, i: number) {
    this.todoForm.controls['item'].setValue(item.title);
    this.todoForm.controls['desc'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
    this.isEditEnabledProgress = false;
    this.isEditEnabledTodo = true;
  }

  updateTask() {
    this.tasks[this.updateId].title = this.todoForm.value.item;
    this.tasks[this.updateId].description = this.todoForm.value.desc;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
    this.isEditEnabledProgress = false;
    this.isEditEnabledTodo = false;
  }

  onEditProgress(item: task, i: number) {
    this.todoForm.controls['item'].setValue(item.title);
    this.todoForm.controls['desc'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
    this.isEditEnabledProgress = true;
    this.isEditEnabledTodo = false;
  }
   //Function for updating the task in the Progress Section
  updateTaskProgress() {
    this.inProgress[this.updateId].title = this.todoForm.value.item;
    this.inProgress[this.updateId].description = this.todoForm.value.desc;
    this.inProgress[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
    this.isEditEnabledProgress = false;
    this.isEditEnabledTodo = false;
  }
  
  //Function for deleting the task from 
  deleteTodoTask(i: number) {
    this.tasks.splice(i, 1);

  }

  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);

  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);

  }

  drop(event: CdkDragDrop<task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
