import axios from "axios";
import { ResGetAccessToken } from "./instagram.interface";

export class InstagramService {
  async getLongLiveTokenByCode(code: string) {
    try {
      const { accessToken } = await this.getAccessToken(code);
      const data = await this.getLongLiveToken(accessToken);

      return data;
    } catch (err) {
      console.error("getLongLiveTokenByCode - err: ", err.response.data);
    }
  }

  async getAccessToken(code: string): Promise<ResGetAccessToken> {
    try {
      const { API_URL, CLIENT_ID, CALLBACK_URL, CLIENT_SECRET } = process.env;
      const { data } = await axios.post(
        `${API_URL}/oauth/access_token`,
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: CALLBACK_URL,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return {
        accessToken: data?.access_token,
        userId: data?.user_id,
      };
    } catch (err) {
      console.error("getAccessToken - err: ", err.response.data);
    }
  }

  async getLongLiveToken(accessToken: string) {
    try {
      const { API_GRAPH_URL, CLIENT_SECRET } = process.env;

      const { data } = await axios.get(`${API_GRAPH_URL}/access_token`, {
        params: {
          client_secret: CLIENT_SECRET,
          grant_type: "ig_exchange_token",
          access_token: accessToken,
        },
      });

      return data;
    } catch (err) {
      console.error("getLongLiveToken - err: ", err.response.data);
    }
  }

  async getMedias(accessToken: string) {
    try {
      const { API_GRAPH_URL } = process.env;
      const { data } = await axios.get(`${API_GRAPH_URL}/me/media`, {
        params: {
          fields: ["id", "caption"].join(","),
          access_token: accessToken,
        },
      });

      return {
        ...data,
      };
    } catch (err) {
      console.error("getMedias - err: ", JSON.stringify(err.response.data));
    }
  }

  async getMediaDetail(mediaId: string, accessToken: string) {
    try {
      const { API_GRAPH_URL } = process.env;
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
      return data;
    } catch (err) {
      console.error("getMediaDetail - err: ", JSON.stringify(err.response.data));
    }
  }

  async getMediaChildren(mediaId: string, accessToken: string) {
    try {
      const { API_GRAPH_URL } = process.env;
      const { data } = await axios.get(`${API_GRAPH_URL}/${mediaId}/children`, {
        params: {
          fields: ['id', 'thumbnail_url', 'media_url'].join(','),
          access_token: accessToken,
        }
      });
      return data;
    } catch (err) {
      console.error("getMediaChildren - err: ", JSON.stringify(err.response.data));
    }
  }
}
