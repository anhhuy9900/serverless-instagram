import { Handler } from 'aws-lambda';
import { formatHTMLResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const login: Handler = async (_event) => {
  console.log('process.env: ', process.env);
  const { API_AUTHENTICATE_URL, CALLBACK_URL, CLIENT_FB_APP_ID } = process.env;

  return formatHTMLResponse(`<a href="${API_AUTHENTICATE_URL}
  ?client_id=${CLIENT_FB_APP_ID}&redirect_uri=${CALLBACK_URL}&scope=user_profile,user_media,instagram_basic,instagram_manage_insights&response_type=code">Login</a>`);
};

export const main = middyfy(login);
