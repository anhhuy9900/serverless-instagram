import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  test: {
    handler: `${handlerPath(__dirname)}/test.main`,
    timeout: 15
  },
  login: {
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
  },
  getLongLiveAccessToken: {
    handler: `${handlerPath(__dirname)}/getLongLiveAccessToken.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-long-live-access-token',
        },
      },
    ],
    timeout: 15
  },
  getRefreshToken: {
    handler: `${handlerPath(__dirname)}/getRefreshToken.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-refresh-token',
        },
      },
    ],
    timeout: 15
  },
  getUserInfo: {
    handler: `${handlerPath(__dirname)}/getUserInfo.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-user-info',
        },
      },
    ],
    timeout: 15
  },
  getMedias: {
    handler: `${handlerPath(__dirname)}/getMedias.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-medias',
        },
      },
    ],
    timeout: 15
  },
  getMediaDetail: {
    handler: `${handlerPath(__dirname)}/getMediaDetail.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-media-detail',
        },
      },
    ],
    timeout: 15
  },
  getMediaChildren: {
    handler: `${handlerPath(__dirname)}/getMediaChildren.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'instagram/get-media-children',
        },
      },
    ],
    timeout: 15
  }
};
