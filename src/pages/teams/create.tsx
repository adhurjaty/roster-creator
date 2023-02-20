import TeamForm from '@/components/forms/TeamForm';

const CreateTeamPage = () => (
  <TeamForm
    title='Create New Team'
    team={{
      name: '',
      players: [],
      games: [],
    }}
  />
);

export default CreateTeamPage;
