import sendpulse from 'sendpulse-api';

import assert from 'assert';

import { SendpulseTemplates } from './sendpulse-templates';

import { NotificationType } from '../notification-type.enum';
import { NotificationClientInterface } from '../notoification-client.interface';

interface SendpulseResponse {
  error_code?: number;
  is_error?: 1;
  message?: string;
}

export class SendpulseClient implements NotificationClientInterface {
  constructor() {
    assert(process.env.API_USER_ID);
    assert(process.env.API_SECRET);
    sendpulse.init(
      process.env.API_USER_ID,
      process.env.API_SECRET,
      '/tmp',
      () => undefined,
    );
  }

  async sendEmail(
    email: string,
    subject: string,
    notificationType: NotificationType,
    variables = {},
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      sendpulse.smtpSendMail(
        (response: SendpulseResponse) => {
          console.log('===> sendpulse response', response);
          if (response.is_error || response.error_code) {
            reject(new Error('Sendpulse error: ' + response.message));
          } else {
            resolve();
          }
        },
        {
          from: {
            name: 'Alex from TransferSafe',
            email: 'alex@transfersafe.net',
          },
          to: [{ email }],
          subject,
          template: {
            id: SendpulseTemplates[notificationType],
            variables,
          },
        },
      );
    });
  }
}
