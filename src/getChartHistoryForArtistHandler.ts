import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import generateFakeChartHistory from "./generateFakeChartHistory";
import { getArtists } from "./spotifyServices";

export const getChartHistoryForArtistHandler = async (_event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(generateFakeChartHistory()),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const searchArtists = async (_event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(getArtists(_event.queryStringParameters)),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
