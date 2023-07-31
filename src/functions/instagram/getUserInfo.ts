
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda";

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/user#fields
const getUserInfo: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { API_GRAPH_URL } = process.env;
    const { accessToken } = event.queryStringParameters;

    const { data } = await axios.get(`${API_GRAPH_URL}/me`, {
      params: {
        fields: ['id', 'username'].join(','),
        access_token: accessToken,
      }
    });

    result = data;

  } catch(err) {
    console.error('getUserInfo - err: ', JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    data: result
  });
};

export const main = middyfy(getUserInfo);
