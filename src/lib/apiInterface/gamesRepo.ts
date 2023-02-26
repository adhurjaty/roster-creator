import Game from "@/lib/models/game";

interface GamesRepo {
  createGame(game: Game): Promise<Response>;
  getGame(gameId: string): Promise<Game>;
}

class StaticGamesRepo {
  constructor(private userId: string, private teamId: string) { }

  async createGame(game: Game): Promise<Response> {
    console.log(this.userId);
    console.log(this.teamId);
    console.log(game);
    return await Promise.resolve(new Response());
  }

  async getGame(gameId: string): Promise<Game> {
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

