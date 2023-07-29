import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const app: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('event: ', event);
  return formatJSONResponse({
    message: `Get code from Oauth Instagram API`,
    code: event.queryStringParameters['code']
  });
};

export const main = middyfy(app);
