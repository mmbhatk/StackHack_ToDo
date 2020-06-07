import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getTasks(label: string): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>('./api/tasks', {
      params: {
        label,
        userid: '044021',
      },
    });
  }

  postTask(label, task) {
    return this.httpClient.post('./api/tasks', {
      userid: '044021',
      label,
      task,
    });
  }

  delete(label, task: ToDo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { userid: '044021', label },
    };
    return this.httpClient.delete(`./api/tasks/${task.id}`, httpOptions);
  }
}
