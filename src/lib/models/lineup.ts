import Player from "@/lib/models/player";
import Position from "@/lib/models/position";

export default interface Lineup {
  period: number,
  playerPositions: { player: Player, position: Position }[],
}