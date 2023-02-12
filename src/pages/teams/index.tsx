import React from 'react';
import { useQuery } from 'react-query';

import { getTeams } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import ListView from '@/components/ListView';
import LoadingSpinner from '@/components/LoadingSpinner';

const TeamsPage = () => {
  const {
    isLoading,
    isError,
    data: teams,
    error,
  } = useQuery<Team[], Error>('teams', () => getTeams('foo'));

  return (
    <div>
      {(isLoading && <LoadingSpinner />) || (
        <>
          <h1>Teams</h1>
          <ListView list={teams ?? []} />
        </>
      )}
    </div>
  );
};

export default TeamsPage;
