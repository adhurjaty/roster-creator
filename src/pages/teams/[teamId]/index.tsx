import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

import { getTeam, updateTeam } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import PositionsLayout from '@/components/contexts/PositionsLayout';
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

  const {
    isLoading: isUpdateLoading,
    mutate,
    isError: isUpdateError,
    error: updateError,
  } = useMutation<Response, Error, Team>((team) => updateTeam('foo', team));

  const onSubmit = (team: Team) => {
    mutate(team);
  };

  const onCancel = () => {};

  return (
    <PositionsLayout
      title={`Edit Team ${team?.name}`}
      isLoading={isLoading || !team}
      isError={isError}
      error={error}
    >
      <TeamForm
        team={team!}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isSubmitError={isUpdateError}
        submitError={updateError}
        isSubmitLoading={isUpdateLoading}
      />
    </PositionsLayout>
  );
};

export default TeamPage;
