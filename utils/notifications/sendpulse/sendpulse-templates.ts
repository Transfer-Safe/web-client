import { NotificationType } from '../notification-type.enum';

export const SendpulseTemplates: Record<NotificationType, string> = {
  [NotificationType.InvoiceDeposited]: '89082',
  [NotificationType.InvoiceConfirmed]: '89868',
};
