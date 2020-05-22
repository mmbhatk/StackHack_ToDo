import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHandlerComponent } from './task-handler.component';

describe('DashboardComponent', () => {
  let component: TaskHandlerComponent;
  let fixture: ComponentFixture<TaskHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskHandlerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
