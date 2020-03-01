import 'babel-polyfill';
import 'reflect-metadata';
import http from 'http';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import winstonEnvLogger from 'winston-env-logger';
import useragent from 'express-useragent';
import { ApolloServer, PubSub } from 'apollo-server-express';

// auth middleware
import jwtAuthMiddleware from './restful/middleWares/jwtAuthMiddleware';
import authenticateSubscription from './lib/authenticateSubscription';

// Restful API routes
import routes from './restful/routes';

// GrapQL Schema
import schema from './graphql/schema';

// lib
import metaRedirect from './lib/metaRedirect';

// load all environment variales
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const pubSub = new PubSub();

const server = new ApolloServer({
  schema,
  context: async ({ req, connection }) => ({
      req,
      pubSub,
      connection,
  }),
  playground: process.env.NODE_ENV !== 'production',
  subscriptions: {
    onConnect: (_, webSocket: any) => {
      return new Promise(resolve => {
        const auth = authenticateSubscription(webSocket);
        resolve({ auth });
      });
    },
  },
});

app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  methods: ['GET', 'PUT', 'POST'],
  credentials: true,
}));

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(compression());
app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Add request logger
app.use(winstonEnvLogger.logger());

app.use(useragent.express());

app.use(jwtAuthMiddleware);
app.use(express.static('public'));

routes(app);

server.applyMiddleware({ app, cors: { origin: process.env.CLIENT_BASE_URL } });
server.installSubscriptionHandlers(httpServer);

app.use('*', (_req: Request, res: Response) => metaRedirect(res, `${process.env.CLIENT_BASE_URL}`));

export { httpServer, app };
