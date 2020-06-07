import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  protected observable = new Subject<number>();

  public next(item: number) {
    this.observable.next(item);
  }

  public subscribe(callback: (item: number) => void) {
    this.observable.subscribe(callback);
  }
}
