import 'express-async-errors';
import winston from 'winston';

const { add, createLogger, transports } = winston;

export default () => {
  createLogger({
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
      new transports.File({ filename: 'rejections.log' })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

}