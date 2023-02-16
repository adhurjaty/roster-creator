import Position from "@/lib/models/position";

export async function getPositions(): Promise<Position[]> {
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