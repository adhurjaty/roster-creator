import Roster from "@/lib/models/roster";

export default interface Game {
  id?: string,
  name: string,
  date: Date,
  roster: Roster,
}