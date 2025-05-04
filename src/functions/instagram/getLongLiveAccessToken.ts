
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { APIGatewayProxyHandler} from "aws-lambda"
import { InstagramService } from '../services/instagram.service';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/access_token
const getLongLiveAccessToken: APIGatewayProxyHandler = async (event) => {
  let data = null;
  try {
    const service = new InstagramService();
    const { accessToken } = event.queryStringParameters;
    data = await service.getLongLiveToken(accessToken)

  } catch(err) {
    console.error('getLongLiveAccessToken - err: ', err.response.data);
  }
  
  return formatJSONResponse({
    data
  });
};

export const main = middyfy(getLongLiveAccessToken);
