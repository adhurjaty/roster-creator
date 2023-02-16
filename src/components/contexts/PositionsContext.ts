import { createContext } from "react";

import Position from "@/lib/models/position";

const PositionsContext = createContext<Position[]>([]);

export default PositionsContext;
