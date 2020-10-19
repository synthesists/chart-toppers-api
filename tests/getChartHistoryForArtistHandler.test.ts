import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getChartHistoryForArtistHandler } from "../src/getChartHistoryForArtistHandler";

describe("getChartHistoryForArtistHandler", () => {
  it("should return the chartHistory for an artist", async () => {
    const event: APIGatewayProxyEvent = ({} as unknown) as APIGatewayProxyEvent;

    const chartHistory: APIGatewayProxyResult = await getChartHistoryForArtistHandler(event);

    expect(chartHistory.statusCode).toBe(200);
    expect(JSON.parse(chartHistory.body)).toBe({});
  });
});
