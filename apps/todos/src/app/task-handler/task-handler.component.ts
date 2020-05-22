import { Component, OnInit, Inject } from '@angular/core';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'stack-hack-to-do-task-handler',
  templateUrl: './task-handler.component.html',
  styleUrls: ['./task-handler.component.scss'],
})
export class TaskHandlerComponent implements OnInit {
  today = new Date();
  tasks: ToDo[];

  search: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasks = [
      {
        description: 'Greet Manu',
        dueDate: new Date(2020, 6, 1),
      },
      {
        description: 'Talk to Manu',
        dueDate: new Date(),
      },
      {
        description: 'Trouble Manu',
        dueDate: new Date(),
      },
    ];
  }

  days_between(date1: Date, date2: Date): number {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.tasks.push(result);
    });
  }
}

@Component({
  selector: 'add-note-dialog',
  templateUrl: 'add-note-dialog.html',
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
