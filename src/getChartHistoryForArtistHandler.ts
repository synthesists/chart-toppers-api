import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import generateFakeChartHistory from "./generateFakeChartHistory";

export const getChartHistoryForArtistHandler = async (_event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(generateFakeChartHistory()),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
