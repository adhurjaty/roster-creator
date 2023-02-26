import { createContext, ReactNode, useContext } from 'react';

import StaticGamesRepo from '@/lib/repositories/gamesRepo';
import {
  GamesRepo,
  PositionsRepo,
  TeamsRepo,
} from '@/lib/repositories/interfaces';
import StaticPositionsRepo from '@/lib/repositories/positionsRepo';
import StaticTeamsRepo from '@/lib/repositories/teamsRepo';

interface RepoContextProps {
  children: ReactNode[] | ReactNode;
}

const createGamesRepo = (userId: string) => new StaticGamesRepo(userId);
const createPositionsRepo = () => new StaticPositionsRepo();
const createTeamsRepo = (userId: string) => new StaticTeamsRepo(userId);

const GamesRepoContext =
  createContext<(userId: string) => GamesRepo>(createGamesRepo);

const PositionsRepoContext =
  createContext<() => PositionsRepo>(createPositionsRepo);

const TeamsRepoContext =
  createContext<(userId: string) => TeamsRepo>(createTeamsRepo);

export const StaticReposProvider = ({ children }: RepoContextProps) => {
  return (
    <PositionsRepoContext.Provider value={createPositionsRepo}>
      <TeamsRepoContext.Provider value={createTeamsRepo}>
        <GamesRepoContext.Provider value={createGamesRepo}>
          {children}
        </GamesRepoContext.Provider>
      </TeamsRepoContext.Provider>
    </PositionsRepoContext.Provider>
  );
};

export const useGamesRepo = (userId: string) => {
  const createRepo = useContext(GamesRepoContext);
  return createRepo(userId);
};

export const useTeamsRepo = (userId: string) => {
  const createRepo = useContext(TeamsRepoContext);
  return createRepo(userId);
};

export const usePositionsRepo = () => {
  const createRepo = useContext(PositionsRepoContext);
  return createRepo();
};
