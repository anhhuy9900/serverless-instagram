import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import schema from './schema';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-authorize
const authenticate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('event: ', event);

  try {
    const { code } = event.queryStringParameters;
    const { API_URL, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env;
    const { data } = await axios.post(`${API_URL}/oauth/access_token`, 
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: CALLBACK_URL
      },
      {
        headers : {
          "Content-Type" : "application/x-www-form-urlencoded"
        },
      }
    );
    return formatJSONResponse({
      message: `Get code from Oauth Instagram API`,
      data: {
        code, 
        ...data
      }
    });
  } catch(err) {
    console.error('getAccessToken - err: ', err);
    return formatJSONResponse({
      message: JSON.stringify(err),
    });
  }
};

export const main = middyfy(authenticate);
