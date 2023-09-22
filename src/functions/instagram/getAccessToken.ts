
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { APIGatewayProxyHandler} from "aws-lambda"
import { InstagramService } from '../services/instagram.service';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-access-token
const getAccessToken: APIGatewayProxyHandler = async (event) => {
  let data = null;
  try {
    const { code } = event.queryStringParameters;
    const service = new InstagramService();
    data = await service.getAccessToken(code);

  } catch(err) {
    console.error('getAccessToken - err: ', err);
  }

  return formatJSONResponse({
    data
  });
};

export const main = middyfy(getAccessToken);
