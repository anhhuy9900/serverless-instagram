
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import type { APIGatewayProxyHandler} from "aws-lambda";
import { InstagramService } from '../services/instagram.service';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
const getMedias: APIGatewayProxyHandler = async (event) => {
  let data = null;
  try {
    const instagramService = new InstagramService();
    const { accessToken } = event.queryStringParameters;
    data = await instagramService.getMedias(accessToken);

  } catch(err) {
    console.error('getMedias - err: ', JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    ...data
  });
};

export const main = middyfy(getMedias);
