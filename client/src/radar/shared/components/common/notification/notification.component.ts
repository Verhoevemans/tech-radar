import { Component, input } from '@angular/core';

export type NotificationType = 'warning' | 'error' | 'info';

@Component({
    selector: 'radar-notification',
    imports: [],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  public message = input.required<string>();
  public type = input<NotificationType>('info');
}
