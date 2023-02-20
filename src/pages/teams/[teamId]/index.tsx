import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { getTeam } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import TeamForm from '@/components/forms/TeamForm';

const TeamPage = () => {
  const router = useRouter();
  const { teamId } = router.query;

  const {
    isLoading,
    isError,
    data: team,
    error,
  } = useQuery<Team, Error>('teams', () => getTeam('foo', teamId as string));

  return <TeamForm title={`Edit Team ${team?.name}`} team={team} />;
};

export default TeamPage;
