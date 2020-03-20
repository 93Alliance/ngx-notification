import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotificationComponent } from './ngx-notification.component';

describe('NgxNotificationComponent', () => {
  let component: NgxNotificationComponent;
  let fixture: ComponentFixture<NgxNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
