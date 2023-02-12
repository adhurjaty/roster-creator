import Game from "@/lib/models/game";
import Player from "@/lib/models/player";

export default interface Team {
  name: string,
  players: Player[],
  games: Game[],
}