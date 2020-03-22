import { Component } from '@angular/core';
import { NgxNotificationService,
  NotificationType, NotificationThemes,
  NotifyOptions, ThemeName, NotificationPosition } from '@flywine93/ngx-notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  theme = ThemeName.MATERILA;
  options: NotifyOptions = {position: 'rt'};

  constructor(private notification: NgxNotificationService) {
  }

  changeMaterialTheme(): void {
    if (this.theme !== ThemeName.MATERILA) {
      this.theme = ThemeName.MATERILA;
    }
  }

  changeDarkWindstorm(): void {
    if (this.theme !== ThemeName.DARK_WINDSTORM) {
      this.theme = ThemeName.DARK_WINDSTORM;
    }
  }

  // change options by property
  changeOptions(): void  {
    this.options = {position: 'b'};
    this.notification.update();
  }

  // change options by service
  changePosition(dir: NotificationPosition): void {
    this.notification.changeOptions({position: dir});
  }

  sendInfo() {
    this.notification.notify(NotificationType.INFO, 'Hello World', 'This is an information', 0);
  }

  sendSuccess() {
    this.notification.notify(NotificationType.SUCCESS, 'Hello World', 'This is a success !');
  }

  sendWarning() {
    this.notification.notify(NotificationType.WARNING, 'Hello World', 'This is a warning !');
  }

  sendError() {
    this.notification.notify(NotificationType.ERROR, 'Hello World', 'This is an error :(');
  }

  loremIpsum() {
    this.notification.notify(NotificationType.INFO, 'Short Essay',
      `I used to find notes left in the collection basket, beautiful notes
       about my homilies and about the writer's thoughts on the daily scriptural
        readings. The person who penned the notes would add reflections to my
         thoughts and would always include some quotes from poets and mystics
          he or she had read and remembered and loved. The notes fascinated me.
           Here was someone immersed in a search for truth and beauty. Words
            had been treasured, words that were beautiful. And I felt as if
             the words somehow delighted in being discovered, for they were
              obviously very generous to the as yet anonymous writer of the
               notes. And now this person was in turn learning the secret of
                sharing them. Beauty so shines when given away. The only truth
                 that exists is, in that sense, free.`,
      10000);
  }
}
