/* eslint-disable no-console */

type SeverityLevel = 'debug' | 'info' | 'warning' | 'error';

export const logger = {
  log: (level: SeverityLevel, message: string, data: unknown) => {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${level.toUpperCase()}] ${timestamp} - ${message}`;

    switch (level) {
      case 'debug':
        console.debug(formattedMessage, data ?? '');
        break;
      case 'info':
        console.info(formattedMessage, data ?? '');
        break;
      case 'warning':
        console.warn(formattedMessage, data ?? '');
        break;
      case 'error':
        console.error(formattedMessage, data ?? '');
        break;
    }
  },
  debug: (message: string, data: unknown) => {
    logger.log('debug', message, data);
  },
  info: (message: string, data: unknown) => {
    logger.log('info', message, data);
  },
  warn: (message: string, data: unknown) => {
    logger.log('warning', message, data);
  },
  error: (message: string, error: unknown) => {
    logger.log('error', message, error);
  },
};
