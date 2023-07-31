import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
import type { APIGatewayProxyHandler } from "aws-lambda";

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
const getMediaDetail: APIGatewayProxyHandler = async (event) => {
  let result = null;
  try {
    const { API_GRAPH_URL } = process.env;
    const { accessToken, mediaId } = event.queryStringParameters;
    console.log("getLongLiveAccessToken - mediaId: ", mediaId);
    console.log("getLongLiveAccessToken - accessToken: ", accessToken);
    const { data } = await axios.get(`${API_GRAPH_URL}/${mediaId}`, {
      params: {
        fields: [
          "id",
          "caption",
          "is_shared_to_feed",
          "media_type",
          "media_url",
          "permalink",
          "thumbnail_url",
          "timestamp",
          "username",
        ].join(","),
        access_token: accessToken,
      },
    });

    result = data;
  } catch (err) {
    console.error("getMediaDetail - err: ", JSON.stringify(err.response.data));
  }

  return formatJSONResponse({
    data: result,
  });
};

export const main = middyfy(getMediaDetail);
