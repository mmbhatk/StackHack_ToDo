import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DashboardService } from './task-handler.service';
import * as Moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PointsService } from '../app.service';

@Component({
  selector: 'stack-hack-to-do-task-handler',
  templateUrl: './task-handler.component.html',
  styleUrls: ['./task-handler.component.scss'],
})
export class TaskHandlerComponent implements OnInit {
  today = new Date();
  selectedTab = 1;

  tabs = ['All', 'Personal', 'Work'];

  tasksMap = { Personal: [], Work: [], filtered: {} };

  search = '';

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private taskCompleter: PointsService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getTasks('Personal').subscribe((tasks) => {
      this.tasksMap['Personal'] = tasks;
      this.filter(this.search);
    });
    this.dashboardService.getTasks('Work').subscribe((tasks) => {
      this.tasksMap['Work'] = tasks;
      this.filter(this.search);
    });
  }

  days_between(date1: Date, date2: Date): number {
    return Moment(date1).diff(Moment(date2));
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.dashboardService
          .postTask(this.tabs[this.selectedTab], result)
          .subscribe((response: ToDo) => {
            this.tasksMap[this.tabs[this.selectedTab]].push(response);
            this.filter(this.search);
          });
    });
  }

  deleteTask(task: ToDo) {
    const dialogRef = this.dialog.open(DeleteNoteDialog, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.dashboardService
          .delete(this.tabs[this.selectedTab], task)
          .subscribe((response) => {
            if (response['ok'] === 1)
              this.tasksMap[this.tabs[this.selectedTab]] = this.tasksMap[
                this.tabs[this.selectedTab]
              ].filter((_task) => _task.id !== task.id);
            this.filter('');
          });
    });
  }

  filter(event) {
    this.search = event;
    this.tasksMap['filtered']['Personal'] = this.tasksMap[
      'Personal'
    ].filter((o: ToDo) => o.description.includes(this.search));
    this.tasksMap['filtered']['Work'] = this.tasksMap[
      'Work'
    ].filter((o: ToDo) => o.description.includes(this.search));
  }

  completeTask(task) {
    this._snackBar.open(
      `You completed the task: ${task.description}`,
      `+${task.points} points!`,
      {
        duration: 3000,
      }
    );
    this.dashboardService
      .delete(this.tabs[this.selectedTab], task)
      .subscribe((response) => {
        if (response['ok'] === 1)
          this.tasksMap[this.tabs[this.selectedTab]] = this.tasksMap[
            this.tabs[this.selectedTab]
          ].filter((_task) => _task.id !== task.id);
        this.filter('');
      });
    this.taskCompleter.next(task.points);
  }
}

@Component({
  templateUrl: 'add-task-dialog.html',
  styleUrls: ['./task-handler.component.scss'],
})
export class AddNoteDialog implements OnInit {
  toDoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.toDoForm = this.formBuilder.group({
      description: ['', Validators.required],
      dueDate: [today],
      time: '08:00',
      points: [3],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    const time = this.toDoForm.value.time.split(':');
    const timeMinutes = +time[0] * 60 + +time[1];
    console.log(timeMinutes);
    this.dialogRef.close({
      description: this.toDoForm.value.description,
      dueDate: Moment(this.toDoForm.value.dueDate).add(timeMinutes, 'minutes'),
      points: this.toDoForm.value.points,
    });
    this.toDoForm.reset();
  }
}

@Component({
  templateUrl: 'delete-task-dialog.html',
  styleUrls: ['./task-handler.component.scss'],
})
export class DeleteNoteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public task
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
