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

describe('RUN TEST GET MEDIA LIST HANDLER', () => {
  let getMedias;
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

    getMedias = (await import('../functions/instagram/getMedias')).main;
    
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return result object', async () => {
    response = await getMedias(event);
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
  });
  
  it('should return status 200', async () => {
    expect(response.statusCode).toEqual(200);
  });

  it('should return body have elements is exist', async () => {
    expect(JSON.parse(response.body)?.data).not.toBeNull();
    expect(JSON.parse(response.body)?.paging).not.toBeNull();
  });

  it('should return elements of data is not null', async () => {
    const data = JSON.parse(response.body)?.data || [];
    expect(data?.length).toBeGreaterThan(0);
    data.forEach((el) => {
      expect(el).toHaveProperty('id');
    });
  });

});