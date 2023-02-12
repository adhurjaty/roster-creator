import PlayerPosition from "@/lib/models/playerPosition"

export default interface Player {
  name: string
  positions: PlayerPosition[]
}