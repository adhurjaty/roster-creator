import Position from "@/lib/models/position";

export default interface PlayerView {
  id?: number,
  name: string,
  positions: Position[]
}