import { Component, Input } from '@angular/core';

export type NotificationType = 'warning' | 'error' | 'info';

@Component({
  selector: 'radar-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input({ required: true })
  public message!: string;

  @Input()
  public type: NotificationType = 'info';
}
