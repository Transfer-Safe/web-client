import { NotificationType } from './notification-type.enum';

export interface NotificationClientInterface {
  sendEmail(
    email: string,
    subject: string,
    notificationType: NotificationType,
    variables: Record<string, string | number>,
  ): Promise<void>;
}
