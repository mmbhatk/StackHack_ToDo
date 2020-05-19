import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHandlerComponent } from './task-handler/task-handler.component';

const routes: Routes = [
  { path: 'stack-hack-to-do-task-handler', component: TaskHandlerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
