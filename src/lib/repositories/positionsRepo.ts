import Position from "@/lib/models/position";
import { PositionsRepo } from "@/lib/repositories/interfaces";

export default class StaticPositionsRepo implements PositionsRepo {
  async list(): Promise<Position[]> {
    return await Promise.resolve([
      {
        id: '1',
        name: 'Pitcher',
      },
      {
        id: '2',
        name: 'Catcher',
      },
      {
        id: '3',
        name: '1st Base',
      },
      {
        id: '4',
        name: '2nd Base',
      },
      {
        id: '5',
        name: 'Short Stop',
      },
      {
        id: '6',
        name: '3rd Base',
      },
      {
        id: '7',
        name: 'Left Field',
      },
      {
        id: '8',
        name: 'Center Field',
      },
      {
        id: '9',
        name: 'Right Field',
      },
    ]);
  }
}