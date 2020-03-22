import { Component, OnInit, OnDestroy, Input,
  ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { r2l, l2r } from './model/animations';
import { AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
import { NotifyOptions, defaultNotifyOptions,
  NotificationThemes, NotificationType, Notification, ThemeName } from './model/model';
import { Subscription } from 'rxjs';
import { NgxNotificationService } from './ngx-notification.service';
import { mergeJson } from './model/json-utils';
import { deepCopyJson } from './model/json-utils';


@AutoUnsubscrb()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-notification',
  templateUrl: './ngx-notification.component.html',
  styleUrls: ['./ngx-notification.component.scss'],
  animations: [r2l, l2r],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxNotificationComponent implements OnInit, OnDestroy, OnChanges {

// >>>-------------------------------------------------------------------------------------------
  //#region 开放成员

  @Input() options: NotifyOptions;
  @Input() theme = ThemeName.MATERILA;
  notifications: Notification[] = [];
  isR2L: boolean;

  //#endregion
  // <<<-------------------------------------------------------------------------------------------

  // >>>-------------------------------------------------------------------------------------------
  //#region 私有成员

  private subscription$$: Subscription;
  private init = false;

  //#endregion
  // <<<-------------------------------------------------------------------------------------------

  constructor(
    private notify: NgxNotificationService,
    private cdf: ChangeDetectorRef) { }

  // >>>-------------------------------------------------------------------------------------------
  //#region 钩子函数

  ngOnInit(): void {
    // 订阅通知，有通知就添加到容器内。
    this.subscription$$ = this.notify.bus$.subscribe((notification) => {
      if (typeof notification === 'string') {
        if (notification === 'update') {
          this.update();
        } else if (notification.includes('changeTheme:')) {
          this.changeTheme(notification);
        } else if (notification.includes('changeOptions:')) {
          this.changeOptions(notification);
        }
      } else {
        this.addNotification(notification);
      }
    });
    this.options = this.options || {};
    mergeJson(this.options, defaultNotifyOptions);
    mergeJson(this.options, NotificationThemes[this.theme]);
    this.isR2L = this.isRight2Left();
    this.init = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.init) {
      if (changes.hasOwnProperty('theme')) {
        this.theme = this.str2ThemeName(changes.theme.currentValue);
        this.update();
      }
      if (changes.hasOwnProperty('options')) {
        this.options = changes.options.currentValue;
        this.update();
      }
    }
  }

  ngOnDestroy(): void { }

  //#endregion
  // <<<-------------------------------------------------------------------------------------------

  // >>>-------------------------------------------------------------------------------------------
  //#region 开放函数

  // 关闭某条通知
  close(nofitication: Notification): void {
    this.notifications = this.notifications.filter(ele => ele.id !== nofitication.id);
  }

  update(): void {
    this.options = this.options || {};
    const newOptions = deepCopyJson(NotificationThemes[this.theme]);
    mergeJson(this.options, defaultNotifyOptions);
    mergeJson(newOptions, this.options);
    this.options = newOptions;
    this.isR2L = this.isRight2Left();
    this.cdf.detectChanges();
  }

  // 通知消息的位置class
  positionClassName(): string {
    let className = '';
    switch (this.options.position) {
      case 't':
        className = 'top';
        break;
      case 'b':
        className = 'bottom';
        break;
      case 'lt':
        className = 'left-top';
        break;
      case 'lb':
        className = 'left-bottom';
        break;
      case 'rt':
        className = 'right-top';
        break;
      case 'rb':
        className = 'right-bottom';
        break;
      default:
        className = 'right-top';
        break;
    }
    return className;
  }

  // 消息通知容器style
  containerStyle(): any {
    switch (this.options.position) {
      case 't':
      case 'rt':
      case 'lt':
        return {top: this.options.startDistance + 'px'};
      case 'b':
      case 'rb':
      case 'lb':
        return {bottom: this.options.startDistance + 'px'};
      default:
        break;
    }
  }

  // 每一条消息的样式
  notificationStyle(notification: Notification): any {
    return {
      'background-color': this.bgColor(notification)
    };
  }

  titleStyle(notification: Notification): any {
    const titleStyle = {
      color: '',
      background: this.options.title.background,
      'font-weight': this.options.title.bold
    };
    switch (notification.type) {
      case NotificationType.INFO:
        titleStyle.color = this.options.title.infoFontColor;
        break;
      case NotificationType.SUCCESS:
        titleStyle.color = this.options.title.successFontColor;
        break;
      case NotificationType.WARNING:
        titleStyle.color = this.options.title.warningFontColor;
        break;
      case NotificationType.ERROR:
        titleStyle.color = this.options.title.errorFontColor;
        break;
      default:
        titleStyle.color = this.options.title.infoFontColor;
        break;
    }
    return titleStyle;
  }

  messageStyle(notification: Notification): any {
    const msgStyle = {
      color: '',
      background: this.options.msg.background,
      'max-height': this.options.msg.maxHeight + 'px'
    };
    switch (notification.type) {
      case NotificationType.INFO:
        msgStyle.color = this.options.msg.infoFontColor;
        break;
      case NotificationType.SUCCESS:
        msgStyle.color = this.options.msg.successFontColor;
        break;
      case NotificationType.WARNING:
        msgStyle.color = this.options.msg.warningFontColor;
        break;
      case NotificationType.ERROR:
        msgStyle.color = this.options.msg.errorFontColor;
        break;
      default:
        msgStyle.color = this.options.msg.infoFontColor;
        break;
    }
    return msgStyle;
  }

  //#endregion
  // <<<-------------------------------------------------------------------------------------------

  // >>>-------------------------------------------------------------------------------------------
  //#region 私有函数

  private addNotification(notification: Notification): void {
    this.notifications.push(notification);
    if (notification.timeout !== 0) {
      setTimeout(() => {
        this.close(notification);
        this.cdf.detectChanges();
      }, notification.timeout);
    }
    this.cdf.detectChanges();
  }

  private isRight2Left(): boolean {
    let result = true;
    switch (this.options.position) {
      case 't':
      case 'rt':
      case 'rb':
      case 'b':
        result = true;
        break;
      case 'lt':
      case 'lb':
        result = false;
        break;
      default:
        result = true;
        break;
    }
    return result;
  }

  // 根据不同的通知类型，获取对应的颜色
  private bgColor(notification: Notification): string {
      let color = '';
      switch (notification.type) {
        case NotificationType.INFO:
          color = this.options.infoBgColor;
          break;
        case NotificationType.SUCCESS:
          color = this.options.successBgColor;
          break;
        case NotificationType.WARNING:
          color = this.options.warningBgColor;
          break;
        case NotificationType.ERROR:
          color = this.options.errorBgColor;
          break;
        default:
          color = this.options.infoBgColor;
          break;
      }
      return color;
  }

  private changeTheme(cmd: string): void {
    const parts = cmd.split(':');
    this.theme = this.str2ThemeName(parts[1]);
    this.update();
  }

  private changeOptions(cmd: string): void {
    cmd = cmd.slice(14);
    const newOptions = JSON.parse(cmd);
    mergeJson(newOptions, this.options);
    this.options = newOptions;
    this.update();
  }

  private str2ThemeName(str: string): ThemeName {
    switch (str) {
      case ThemeName.MATERILA:
        return ThemeName.MATERILA;
      case ThemeName.DARK_WINDSTORM:
        return ThemeName.DARK_WINDSTORM;
      default:
        break;
    }
  }

  //#endregion
  // <<<-------------------------------------------------------------------------------------------
}
