
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
import type { APIGatewayProxyHandler} from "aws-lambda"

const getAccessToken: APIGatewayProxyHandler = async (event) => {
  const code = event.queryStringParameters['code'];
  console.log('getAccessToken - code: ', code);
  let data = null;
  try {
    data = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: '1441635086687284',
      client_secret: '3afd60d55ba799b4c7deb1eb5e15f562',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://localhost:4001/dev/instagram/authenticate/'
    }) 
    console.log("🚀 ------------------------------------------------------------------------------🚀");
    console.log("🚀 ~ file: get-access-token.ts:16 ~ constgetAccessToken:Handler= ~ data:", data);

  } catch(err) {
    console.error('getAccessToken - err: ', err);
  }

  
  return formatJSONResponse({
    message: `Hello you, welcome to the exciting Serverless Instagram world!`,
    data
  });
};

export const main = middyfy(getAccessToken);
