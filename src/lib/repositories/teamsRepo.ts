import Team from "@/lib/models/team";
import { TeamsRepo } from "@/lib/repositories/interfaces";

export default class StaticTeamsRepo implements TeamsRepo {
  constructor(private userId: string) { }

  async list(): Promise<Team[]> {
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

  async get(teamId: string): Promise<Team> {
    return await Promise.resolve({
      id: teamId,
      name: "Team1",
      players: [
        {
          id: "1",
          name: "Daniel",
          positions: []
        },
        {
          id: "2",
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

  async create(team: Team): Promise<Response> {
    console.log(this.userId);
    console.log(team);
    return await Promise.resolve(new Response());
  }

  async update(team: Team): Promise<Response> {
    console.log(this.userId);
    console.log(team.id);
    console.log(team);
    return await Promise.resolve(new Response());
  }
}

