import rp from "request-promise";
import spotifyCredentials from "./config/config";
import axios from "axios";

let token: any;

const validToken = () => token && token.expiration > new Date().getTime();

const updateToken = async () => {
  const buffer = Buffer.from(`${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`, "utf-8");

  const options = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "client_credentials",
    },
    json: true,
    headers: {
      Authorization: `Basic ${buffer.toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {},
  };
  const response: any = await rp(options);
  token = {
    id: response.access_token,
    expiration: new Date().getTime() + response.expires_in * 1000,
  };
};

const getTokenId = async () => {
  if (!validToken()) await updateToken();
  return token.id;
};

export const getArtists = async (query: any): Promise<any> => {
  console.log(query.q);
  const tokenId = await getTokenId();
  const options = {
    url: `https://api.spotify.com/v1/search/${query.q}&type=artist`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tokenId},`,
    },
    json: true,
  };
  const response = await axios(options);
  console.log(response);
  return response;
};
