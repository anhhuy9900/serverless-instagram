import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import type { APIGatewayProxyHandler } from "aws-lambda";
import { InstagramService } from '../services/instagram.service';

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
const getMediaDetail: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { accessToken, mediaId } = event.queryStringParameters;
    const instagramService = new InstagramService();
    const { data } = await instagramService.getMediaDetail(mediaId, accessToken);

    result = data;
  } catch (err) {
    console.error("getMediaDetail - err: ", JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    data: result,
  });
};

export const main = middyfy(getMediaDetail);
