import { Handler } from 'aws-lambda';
import { formatHTMLResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

export const runTest: Handler = async (_event) => {
  console.log('process.env: ', process.env);
  const { API_AUTHENTICATE_URL, CALLBACK_URL, CLIENT_FB_APP_ID } = process.env;

  return formatHTMLResponse({
    API_AUTHENTICATE_URL,
    CALLBACK_URL,
    CLIENT_FB_APP_ID
  });
};

export const main = middyfy(test);
