import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>('./api/tasks');
  }

  postTask(task) {
    return this.httpClient.post('./api/tasks', task);
  }

  delete(task: ToDo) {
    return this.httpClient.delete(`./api/tasks/${task._id}`);
  }
}
