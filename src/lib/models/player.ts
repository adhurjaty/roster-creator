import Position from "@/lib/models/position";

export default interface Player {
  id?: string;
  name: string;
  positions: Position[];
}