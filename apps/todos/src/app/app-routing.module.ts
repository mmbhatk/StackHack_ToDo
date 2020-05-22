import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHandlerComponent } from './task-handler/task-handler.component';

const routes: Routes = [
  { path: 'dashboard', component: TaskHandlerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
