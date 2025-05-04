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

describe('RUN TEST GET MEDIA DETAIL HANDLER', () => {
  let getMediaDetail;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  const event = {
    queryStringParameters: {
      mediaId: '17960569196223565',
      accessToken: 'IGQVJYNWtzenNSMUctM080bUU2S0JOU21oVTRBcm1WUXNmYnNlSVNuZAXV2THJOLWpfNUhiWlllbzdLOWowSmtPR0lhTDd0NmtZAcG9WcGVjb0U4SHk4dHZAHRXc2THVQaTQzUHRZAd2JB'
    }
  } as any;

  let response = null;

  beforeEach(async () => {
    mockedMiddyfy = jest.mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    getMediaDetail = (await import('../functions/instagram/getMediaDetail')).main;
    
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return result object', async () => {
    response = await getMediaDetail(event);
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
  });
  
  it('should return status 200', async () => {
    expect(response.statusCode).toEqual(200);
  });

  it('should return body have elements is exist', async () => {
    expect(JSON.parse(response.body).data).not.toBeNull();
  });

  it('should return elements of data is not null', async () => {
    const data = JSON.parse(response.body)?.data || {};
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('media_type');
    expect(data).toHaveProperty('media_url');
    expect(data?.id).not.toBeNull();
    expect(data?.media_type).not.toBeNull();
    expect(data?.media_url).not.toBeNull();
  });

});