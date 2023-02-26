import Game from "@/lib/models/game";
import Position from "@/lib/models/position";
import Team from "@/lib/models/team";

export interface GamesRepo {
  create(teamId: string, game: Game): Promise<Response>;
  get(gameId: string): Promise<Game>;
}

export interface PositionsRepo {
  list(): Promise<Position[]>;
}

export interface TeamsRepo {
  list(): Promise<Team[]>;
  get(teamId: string): Promise<Team>;
  create(team: Team): Promise<Response>;
  update(team: Team): Promise<Response>;
}
