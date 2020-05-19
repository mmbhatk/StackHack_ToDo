import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Task } from '@stack-hack-to-do/api-interfaces';

@Component({
  selector: 'stack-hack-to-do-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  level: number = 5;
  points_scored: number = 400;
  total_points: number = 1000;

  description: string;
  date = new Date();

  private _mobileQueryListener: () => void;

  tasks: Task[];

  today = new Date();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
    this.tasks.push({ description: this.description, dueDate: this.date });
    this.description = '';
    this.date = new Date();
  }
}
