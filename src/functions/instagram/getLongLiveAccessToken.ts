
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda"


// https://developers.facebook.com/docs/instagram-basic-display-api/reference/access_token
const getLongLiveAccessToken: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { API_GRAPH_URL, CLIENT_SECRET } = process.env;
    console.log('API_GRAPH_URL: ', API_GRAPH_URL);
    const { accessToken } = event.queryStringParameters;
    console.log('getLongLiveAccessToken - accessToken: ', accessToken);
    const { data } = await axios.get(`${API_GRAPH_URL}/access_token`, {
      params: {
        client_secret: CLIENT_SECRET,
        grant_type: 'ig_exchange_token',
        access_token: accessToken,
      }
    });

    result = data;

  } catch(err) {
    console.error('getLongLiveAccessToken - err: ', err.response.data);
  }
  
  return formatJSONResponse({
    data: result
  });
};

export const main = middyfy(getLongLiveAccessToken);
