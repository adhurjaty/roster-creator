import PlayerPosition from "@/lib/models/playerPosition";

export default interface Lineup {
  period: number,
  playerPositions: PlayerPosition[],
}