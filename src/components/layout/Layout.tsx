import * as React from 'react';

import ErrorText from '@/components/ErrorText';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';

interface Props {
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export default function Layout({
  children,
  title,
  isLoading,
  isError,
  error,
}: Props) {
  const loadedContent = (
    <>
      <PageTitle title={title} />
      {children}
      {isError && error && <ErrorText text={error.message} />}
    </>
  );

  return <div>{(isLoading && <LoadingSpinner />) || loadedContent}</div>;
}
