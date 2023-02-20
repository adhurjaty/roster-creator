import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { createTeam } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import PositionsLayout from '@/components/contexts/PositionsLayout';
import TeamForm from '@/components/forms/TeamForm';

const CreateTeamPage = () => {
  const { isLoading, mutate, isError, error } = useMutation<
    Response,
    Error,
    Team
  >((newTeam) => createTeam('foo', newTeam));

  const router = useRouter();

  const onSubmit = (team: Team) => {
    mutate(team);
  };

  const onCancel = () => {
    router.push('/teams');
  };

  return (
    <PositionsLayout title='Create New Team' isError={isError} error={error}>
      <TeamForm
        team={{
          name: '',
          players: [],
          games: [],
        }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isSubmitLoading={isLoading}
        isSubmitError={isError}
        submitError={error}
      />
    </PositionsLayout>
  );
};

export default CreateTeamPage;
