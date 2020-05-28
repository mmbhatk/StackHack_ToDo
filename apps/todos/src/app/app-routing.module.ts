import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHandlerComponent } from './task-handler/task-handler.component';
import { CalendarComponent } from './calendar/calendar.component'

const routes: Routes = [
  { path: 'dashboard', component: TaskHandlerComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
