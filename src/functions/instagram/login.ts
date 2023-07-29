import { Handler } from 'aws-lambda';
import { formatHTMLResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const login: Handler = async (_event) => {
  return formatHTMLResponse(`<a href="https://api.instagram.com/oauth/authorize
  ?client_id=1441635086687284&redirect_uri=https://localhost:4001/dev/instagram/authenticate/&scope=user_profile,user_media
&response_type=code">Login</a>`);
};

export const main = middyfy(login);
