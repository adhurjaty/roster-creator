import Team from "@/lib/models/team";

export async function getTeams(userId: string): Promise<Team[]> {
  return await Promise.resolve([
    {
      name: "Team1",
      players: [
        {
          name: "Daniel",
          positions: []
        },
        {
          name: "Ari",
          positions: []
        }
      ],
      games: []
    },
    {
      name: "Team2",
      players: [
        {
          name: "Carlos",
          positions: []
        },
        {
          name: "Michelle",
          positions: []
        }
      ],
      games: []
    },
  ])
}

export async function getTeam(userId: string, teamId: string): Promise<Team> {
  return await Promise.resolve({
    name: "Team1",
    players: [
      {
        name: "Daniel",
        positions: []
      },
      {
        name: "Ari",
        positions: []
      }
    ],
    games: []
  });
}