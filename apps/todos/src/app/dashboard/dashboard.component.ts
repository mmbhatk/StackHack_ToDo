import { Component, OnInit } from '@angular/core';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'stack-hack-to-do-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  today = new Date();
  tasks: ToDo[];
  toDoForm: FormGroup;
  search: string;

  constructor(private formBuilder: FormBuilder) {}

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

    this.toDoForm = this.formBuilder.group({
      description: ['', Validators.required],
      dueDate: [new Date()],
    });
  }
  days_between(date1: Date, date2: Date): number {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  save() {
    this.tasks.push(this.toDoForm.value);
    this.toDoForm.reset();
  }
}
