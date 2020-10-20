const generateFakeChartHistory = () => {
  const randomPosition = () => Math.ceil(Math.random() * 100);
  const randomDelta = (age: number) => Math.ceil(Math.random() * 10 - 5 + age / 20);

  const generateStreak = () => {
    let latestPosition = randomPosition();
    const positions = [];
    let age = 0;
    while (latestPosition <= 100) {
      age += 1;
      positions.push(latestPosition);
      latestPosition += randomDelta(age);
      latestPosition = Math.max(1, latestPosition);
    }
    return { positions, positionsLength: positions.length - 1 };
  };

  const response: any = {
    startDate: new Date("2020/8/1"),
    tracks: [
      {
        id: "honeypie",
        name: "Honeypie",
        previewUrl:
          "https://p.scdn.co/mp3-preview/e0a813b21d40a4146edab7a4d50888d6aae5c9c2?cid=774b29d4f13844c495f206cafdad9c86",
        isMostPopularAt: [],
        streaks: [
          {
            startDate: new Date("2020/8/1"),
            weekOffset: 0,
            ...generateStreak(),
          },
        ],
      },
      {
        id: "sabotage",
        name: "Sabotage",
        previewUrl:
          "https://p.scdn.co/mp3-preview/f6af0a876724dec454238dd45f2bffd60434d26f?cid=774b29d4f13844c495f206cafdad9c86",
        isMostPopularAt: [],
        streaks: [
          {
            startDate: new Date("2020/8/1"),
            weekOffset: 10,
            ...generateStreak(),
          },
        ],
      },
      {
        id: "super-bad-mantra",
        name: "Super Bad Mantra",
        previewUrl:
          "https://p.scdn.co/mp3-preview/87564cf950de90eb81b1a382e32d9c1f44bd512e?cid=774b29d4f13844c495f206cafdad9c86",
        isMostPopularAt: [],
        streaks: [
          {
            startDate: new Date("2020/8/1"),
            weekOffset: 40,
            ...generateStreak(),
          },
        ],
      },
      {
        id: "anything-you-want",
        name: "Anything you want",
        previewUrl:
          "https://p.scdn.co/mp3-preview/1371a3702423142034bdbe6d9b6d8e32e87b7098?cid=774b29d4f13844c495f206cafdad9c86",
        isMostPopularAt: [],
        streaks: [
          {
            startDate: new Date("2020/8/1"),
            weekOffset: 60,
            ...generateStreak(),
          },
        ],
      },
    ],
  };

  const getTrackPopularityForWeek = (track: any, week: number) => {
    const currentStreak = track.streaks.find(
      (streak: any) => week >= streak.weekOffset && week <= streak.weekOffset + streak.positionsLength
    );
    if (!currentStreak) {
      return;
    }
    return currentStreak.positions[week - currentStreak.weekOffset];
  };

  const getMostPopularTrackForWeek = (week: number) => {
    const tracks = response.tracks
      .map((track: any) => ({ track, position: getTrackPopularityForWeek(track, week) }))
      .filter(({ position }: any) => position);

    if (tracks.length === 0) {
      return;
    }

    return tracks.reduce((bestTrackSoFar: any, nextTrack: any) => {
      return bestTrackSoFar.position < nextTrack.position ? bestTrackSoFar : nextTrack;
    }).track;
  };

  const getLastChartingWeekForTrack = (track: any) => {
    return Math.max(...track.streaks.map((streak: any) => streak.weekOffset + streak.positionsLength));
  };

  const totalNumberOfWeeks = Math.max(...response.tracks.map((track: any) => getLastChartingWeekForTrack(track)));

  for (let week = 0; week < totalNumberOfWeeks; week++) {
    const mostPopularTrack = getMostPopularTrackForWeek(week);
    if (mostPopularTrack) {
      mostPopularTrack.isMostPopularAt.push(week);
    }
  }

  response.totalNumberOfWeeks = totalNumberOfWeeks;
  return response;
};

export default generateFakeChartHistory;
