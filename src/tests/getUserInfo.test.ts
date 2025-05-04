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

describe('RUN TEST GET USER INFO HANDLER', () => {
  let getUserInfo;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  const event = {
    queryStringParameters: {
      accessToken: 'IGQVJYNWtzenNSMUctM080bUU2S0JOU21oVTRBcm1WUXNmYnNlSVNuZAXV2THJOLWpfNUhiWlllbzdLOWowSmtPR0lhTDd0NmtZAcG9WcGVjb0U4SHk4dHZAHRXc2THVQaTQzUHRZAd2JB'
    }
  } as any;

  let response = null;

  beforeEach(async () => {
    mockedMiddyfy = jest.mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    getUserInfo = (await import('../functions/instagram/getUserInfo')).main;
    
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return result object', async () => {
    response = await getUserInfo(event);
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
  });
  
  it('should return status 200', async () => {
    expect(response.statusCode).toEqual(200);
  });

  it('should return body have elements is exist', async () => {
    const data = JSON.parse(response.body);
    expect(data).not.toBe(null);
    expect(data?.id).not.toBe(undefined);
    expect(data?.username).not.toBe(undefined);
  });

});