import { createConnection } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { httpServer } from './createServer';

const port: number | string = Number(process.env.PORT) || 5000;

createConnection().then(() => {
  httpServer.listen(port, () => {
    winstonEnvLogger.info(`server launched 🚀🚀🚀: visit ${process.env.BASE_URL}`);
    winstonEnvLogger.info(`GraphQL Route ready at: ${process.env.BASE_URL}/graphql`);
    winstonEnvLogger.info(`GraphQL Subscriptions ready at: ${process.env.WS_URL}/graphql`);
  });
}).catch(error => {
  winstonEnvLogger.error({
    message: 'Database Connection occurred',
    error,
  });
});
