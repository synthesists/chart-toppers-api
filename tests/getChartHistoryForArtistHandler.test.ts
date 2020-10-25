import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getChartHistoryForArtistHandler, searchArtists } from "../src/getChartHistoryForArtistHandler";

describe("getChartHistoryForArtistHandler", () => {
  it("should return the chartHistory for an artist", async () => {
    const event: APIGatewayProxyEvent = ({} as unknown) as APIGatewayProxyEvent;

    const chartHistory: APIGatewayProxyResult = await getChartHistoryForArtistHandler(event);

    expect(chartHistory.statusCode).toBe(200);
    expect(JSON.parse(chartHistory.body)).toEqual(expect.objectContaining({ tracks: expect.any(Array) }));
  });
  it("should return list of artists and artist information matching search query", async () => {
    const event = ({
      queryStringParameters: {
        q: "Kanye",
      },
    } as unknown) as APIGatewayProxyEvent;

    const artistSearch: APIGatewayProxyResult = await searchArtists(event);
    console.log(artistSearch);
    expect(artistSearch.statusCode).toBe(200);
    expect(JSON.parse(artistSearch.body)).toEqual(expect.objectContaining({ artists: expect.any(Array) }));
  });
});
