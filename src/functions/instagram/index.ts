import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  test: {
    handler: `${handlerPath(__dirname)}/login.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/login',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
  authenticate: {
    handler: `${handlerPath(__dirname)}/authenticate.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/authenticate',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
  getAccessToken: {
    handler: `${handlerPath(__dirname)}/getAccessToken.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-access-token',
        },
      },
    ],
    timeout: 15
  }
};
