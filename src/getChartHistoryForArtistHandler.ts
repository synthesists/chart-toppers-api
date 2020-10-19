import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const getChartHistoryForArtistHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: "world", ...event }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
