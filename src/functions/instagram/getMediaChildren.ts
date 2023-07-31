
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda"

//Get a collection of image and video Media on an album Media.
const getMediaChildren: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { API_GRAPH_URL } = process.env;
    const { accessToken, mediaId } = event.queryStringParameters
    console.log('getLongLiveAccessToken - mediaId: ', mediaId);
    console.log('getLongLiveAccessToken - accessToken: ', accessToken);

    const { data } = await axios.get(`${API_GRAPH_URL}/${mediaId}/children`, {
      params: {
        fields: ['id', 'thumbnail_url', 'media_url'].join(','),
        access_token: accessToken,
      }
    });

    result = data;

  } catch(err) {
    console.error('getMediaChildren - err: ', JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    data: result
  });
};

export const main = middyfy(getMediaChildren);
