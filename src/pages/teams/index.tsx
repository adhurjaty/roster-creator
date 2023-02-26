import React from 'react';
import { useQuery } from 'react-query';

import Team from '@/lib/models/team';
import { useTeamsRepo } from '@/lib/repositories/ReposProvider';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import ListView from '@/components/list/ListView';

const TeamsPage = () => {
  const repo = useTeamsRepo('foo');

  const {
    isLoading,
    isError,
    data: teams,
    error,
  } = useQuery<Team[], Error>('teams', () => repo.list());

  return (
    <Layout title='Teams' isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col items-center justify-center'>
        <ListView
          list={
            teams?.map((x) => ({
              ...x,
              location: `/teams/${x.id}`,
            })) ?? []
          }
        />
        <ButtonLink href='/teams/create' className='w-md my-2'>
          Create new team
        </ButtonLink>
      </div>
    </Layout>
  );
};

export default TeamsPage;
