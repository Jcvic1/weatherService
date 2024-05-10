import express from 'express';
import winston from 'winston';

import logging from './startup/logging.js';
import routes from './startup/routes.js';

const { info } = winston;
const app = express();

logging();
routes(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => info(`Listening on port ${port}...`));


export default { app, server };