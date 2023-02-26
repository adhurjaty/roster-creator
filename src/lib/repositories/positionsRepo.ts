import Position from "@/lib/models/position";
import { PositionsRepo } from "@/lib/repositories/interfaces";

export default class StaticPositionsRepo implements PositionsRepo {
  async list(): Promise<Position[]> {
    return await Promise.resolve([
      {
        name: 'Pitcher',
      },
      {
        name: 'Catcher',
      },
      {
        name: '1st Base',
      },
      {
        name: '2nd Base',
      },
      {
        name: 'Short Stop',
      },
      {
        name: '3rd Base',
      },
      {
        name: 'Left Field',
      },
      {
        name: 'Center Field',
      },
      {
        name: 'Right Field',
      },
    ]);
  }
}