import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { PointsService } from './app.service';

@Component({
  selector: 'stack-hack-to-do-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  level = 2;
  points_scored = 15;
  total_points = 100;

  darkMode = false;

  description: string;
  date = new Date();

  private _mobileQueryListener: () => void;

  today = new Date();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private taskCompleter: PointsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.taskCompleter.subscribe((points) => (this.points_scored += points));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
