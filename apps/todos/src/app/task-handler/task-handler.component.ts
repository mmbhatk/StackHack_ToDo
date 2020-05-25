import { Component, OnInit, Inject } from '@angular/core';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DashboardService } from './task-handler.service';

@Component({
  selector: 'stack-hack-to-do-task-handler',
  templateUrl: './task-handler.component.html',
  styleUrls: ['./task-handler.component.scss'],
})
export class TaskHandlerComponent implements OnInit {
  today = new Date();
  tasks: ToDo[];

  search: string;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  days_between(date1: Date, date2: Date): number {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    let differenceMs = 0;
    if (date1 instanceof Date && date2 instanceof Date)
      // Calculate the difference in milliseconds
      differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.dashboardService
          .postTask('Personal', result)
          .subscribe((response: ToDo) => this.tasks.push(response));
    });
  }

  deleteTask(task: ToDo) {
    const dialogRef = this.dialog.open(DeleteNoteDialog, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.dashboardService.delete('Personal', task).subscribe((response) => {
          if (response['ok'] === 1)
            this.tasks = this.tasks.filter((_task) => _task._id !== task._id);
        });
    });
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
    this.toDoForm = this.formBuilder.group({
      description: ['', Validators.required],
      dueDate: [new Date()],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.toDoForm.value);
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
