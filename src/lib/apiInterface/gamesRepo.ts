import Game from "@/lib/models/game";

export async function createGame(teamId: string, game: Game): Promise<Response> {
  console.log(teamId);
  console.log(game);
  return await Promise.resolve(new Response());
}