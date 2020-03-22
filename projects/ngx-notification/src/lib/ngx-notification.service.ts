import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, NotificationType, ThemeName, NotifyOptions } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class NgxNotificationService {

  private subjectBus$ = new Subject<Notification | string>();
  private idx = 0;

  constructor() { }

  get bus$() { return this.subjectBus$; }

  notify(type: NotificationType, title: string, message: string, timeout = 3000): void {
    let tmpType = NotificationType.INFO;
    if (type === NotificationType.INFO) {
      tmpType = NotificationType.INFO;
    } else if (type === NotificationType.SUCCESS) {
      tmpType = NotificationType.SUCCESS;
    } else if (type === NotificationType.WARNING) {
      tmpType = NotificationType.WARNING;
    } else if (type === NotificationType.ERROR) {
      tmpType = NotificationType.ERROR;
    } else {
      tmpType = NotificationType.INFO;
    }

    this.subjectBus$.next(
      new Notification(this.idx++, tmpType, title, message, timeout));
  }

  update(): void {
    this.subjectBus$.next('update');
  }

  changeTheme(themeName: ThemeName): void {
    this.subjectBus$.next(`changeTheme:${themeName}`);
  }

  changeOptions(options: NotifyOptions): void {
    this.subjectBus$.next(`changeOptions:${JSON.stringify(options)}`);
  }
}
