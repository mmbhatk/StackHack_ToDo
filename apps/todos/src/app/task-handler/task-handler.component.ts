import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stack-hack-to-do-task-handler',
  templateUrl: './task-handler.component.html',
  styleUrls: ['./task-handler.component.css']
})
export class TaskHandlerComponent implements OnInit {

  name: string;
  age: number;

  constructor() { }
  ngOnInit(): void {}

  saveData() {
    console.log("In saveData()")
  }
}
