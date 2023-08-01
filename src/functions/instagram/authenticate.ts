import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';
import { InstagramService } from '../services/instagram.service';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-authorize
const authenticate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //console.log('authenticate - event: ', event);
  let message = null;
  let data = null;
  try {
    const service = new InstagramService();
    const { code } = event.queryStringParameters;
    const result = await service.getLongLiveTokenByCode(code);
    
    data = {
      code, 
      ...result
    }
    message = `Get code from Oauth Instagram API`;

  } catch(err) {
    console.error('getAccessToken - err: ', err);
    message = JSON.stringify(err);
    
  } finally {
    return formatJSONResponse({
      message: `Get code from Oauth Instagram API`,
      data
    });
  }
};

export const main = middyfy(authenticate);
