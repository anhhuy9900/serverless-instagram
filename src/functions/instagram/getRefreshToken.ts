
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda"


// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token
const getRefreshToken: APIGatewayProxyHandler = async (event) => {
  
  let result = null;
  try {
    const { API_GRAPH_URL } = process.env;
    const { accessToken } = event.queryStringParameters;
    const { data } = await axios.get(`${API_GRAPH_URL}/refresh_access_token`, {
      params: {
        grant_type: 'ig_refresh_token',
        access_token: accessToken,
      }
    }) 
    
    result = data;

  } catch(err) {
    console.error('getRefreshToken - err: ', err);
  }
  
  return formatJSONResponse({
    data: result
  });
};

export const main = middyfy(getRefreshToken);
