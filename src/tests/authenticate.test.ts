import { Handler } from 'aws-lambda';
import { middyfy } from '../libs/lambda';

jest.mock('../libs/lambda');

jest.mock('@middy/core', () => {
  return (handler) => {
    return {
      use: jest.fn().mockImplementation(() => {
        // ...use(ssm()) will return handler function
        return {
          before: jest.fn().mockReturnValue(handler)
        }
      })
    }
  }
})

describe('RUN TEST AUTHENTICATE HANDLER', () => {
  let authenticate;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  const event = {
    queryStringParameters: {
      code: ''
    }
  } as any;

  let response = null;

  beforeEach(async () => {
    mockedMiddyfy = jest.mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    authenticate = (await import('../functions/instagram/authenticate')).main;
    
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return result object', async () => {
    response = await authenticate(event);
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
  });
  
  it('should return status 200', async () => {
    expect(response.statusCode).toEqual(400);
  });

  it('should return body have element code is exist', async () => {
    expect(JSON.parse(response.body).code).not.toBeNull();
  });

});