import { createLogger, format, transports } from 'winston';

const {combine} = format;

export const logger = createLogger({
  level: 'info',
  format: combine( 
    format.json()
  ),
});

logger.add(new transports.Console());