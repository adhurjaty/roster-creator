import Game from "@/lib/models/game";
import { GamesRepo } from "@/lib/repositories/interfaces";

export default class StaticGamesRepo implements GamesRepo {
  constructor(private userId: string) { }

  async create(teamId: string, game: Game): Promise<Response> {
    console.log(this.userId);
    console.log(teamId);
    console.log(game);
    return await Promise.resolve(new Response());
  }

  async get(gameId: string): Promise<Game> {
    return await Promise.resolve({
      id: gameId,
      name: 'vs. Aardvarks',
      date: new Date(2023, 3, 22, 12),
      roster: {
        lineups: [],
        players: []
      }
    });
  }
}

