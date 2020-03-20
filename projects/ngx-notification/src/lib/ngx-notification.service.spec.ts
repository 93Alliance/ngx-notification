import { TestBed } from '@angular/core/testing';

import { NgxNotificationService } from './ngx-notification.service';

describe('NgxNotificationService', () => {
  let service: NgxNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
