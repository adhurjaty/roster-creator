/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { getTeam, updateTeam } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import PositionsLayout from '@/components/contexts/PositionsLayout';
import TeamForm from '@/components/forms/TeamForm';
import GamesView from '@/components/GamesView';
import ListView from '@/components/list/ListView';

const TeamPage = () => {
  const [editMode, setEditMode] = useState(false);

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
    setEditMode(false);
  };

  const playersDisplay = (
    <>
      <h3>Players</h3>
      <ListView
        list={(team?.players ?? []).map((player) => ({
          key: player.id,
          name: player.name,
        }))}
      />
      <Button className='my-2' onClick={() => setEditMode(true)}>
        Edit team
      </Button>
    </>
  );

  return (
    <PositionsLayout
      title={`Team ${team?.name}`}
      className='flex flex-col items-center'
      isLoading={isLoading || !team}
      isError={isError}
      error={error}
    >
      {(editMode && (
        <TeamForm
          team={team!}
          onSubmit={onSubmit}
          onCancel={() => setEditMode(false)}
          isSubmitError={isUpdateError}
          submitError={updateError}
          isSubmitLoading={isUpdateLoading}
        />
      )) ||
        playersDisplay}

      <h3>Games</h3>
      <GamesView
        games={(team?.games ?? []).map((game) => ({
          ...game,
          teamId: teamId as string,
        }))}
      />
    </PositionsLayout>
  );
};

export default TeamPage;
