
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import type { APIGatewayProxyHandler} from "aws-lambda";
import { InstagramService } from '../services/instagram.service';

//Get a collection of image and video Media on an album Media.
const getMediaChildren: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { accessToken, mediaId } = event.queryStringParameters
    const instagramService = new InstagramService();
    const { data } = await instagramService.getMediaChildren(mediaId, accessToken);

    result = data;

  } catch(err) {
    console.error('getMediaChildren - err: ', JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    ...result
  });
};

export const main = middyfy(getMediaChildren);
