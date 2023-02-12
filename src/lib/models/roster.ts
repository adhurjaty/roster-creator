import Lineup from "@/lib/models/lineup";
import Player from "@/lib/models/player";

export default interface Roster {
  players: Player[],
  lineups: Lineup[],
}