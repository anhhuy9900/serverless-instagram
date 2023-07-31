
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda"

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-access-token
const getAccessToken: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { API_URL, CALLBACK_URL, CLIENT_FB_APP_ID, CLIENT_SECRET } = process.env;
    const { code } = event.queryStringParameters;
    const { data } = await axios.post(`${API_URL}/oauth/access_token`, 
      {
        client_id: CLIENT_FB_APP_ID,
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

    result = data;

  } catch(err) {
    console.error('getAccessToken - err: ', err);
  }

  return formatJSONResponse({
    data: result
  });
};

export const main = middyfy(getAccessToken);
