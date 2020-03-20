import { NgModule } from '@angular/core';
import { NgxNotificationComponent } from './ngx-notification.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NgxNotificationComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [NgxNotificationComponent]
})
export class NgxNotificationModule { }
