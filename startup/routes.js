import morgan from 'morgan';
import { swaggerUi, swaggerDocument } from '../swagger/swagger.js';
import apiLimiter from '../middleware/apiLimiter.js';
import error from '../middleware/error.js';
import weather from '../routes/weather.js';

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(morgan('tiny'));
  app.use('/api', apiLimiter);
  app.use('/api/weather', weather);
  app.use(error);
}