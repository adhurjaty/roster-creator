import Team from "@/lib/models/team";

export async function getTeams(userId: string): Promise<Team[]> {
  return await Promise.resolve([
    {
      id: "foo",
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
      id: "bar",
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
    id: "foo",
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
    games: [
      {
        id: 'asdf',
        name: 'vs. Aardvarks',
        date: new Date(2023, 3, 22),
        roster: {
          players: [],
          lineups: []
        }
      },
      {
        id: 'asdfe',
        name: 'vs. Bears',
        date: new Date(2023, 2, 22),
        roster: {
          players: [],
          lineups: []
        }
      },
    ]
  });
}

export async function createTeam(userId: string, team: Team): Promise<Response> {
  console.log(userId);
  console.log(team);
  return await Promise.resolve(new Response());
}

export async function updateTeam(userId: string, team: Team): Promise<Response> {
  console.log(userId);
  console.log(team.id);
  console.log(team);
  return await Promise.resolve(new Response());
}