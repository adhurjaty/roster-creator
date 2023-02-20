import * as React from 'react';

import ErrorText from '@/components/ErrorText';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';
import LayoutProps from '@/components/props/LayoutProps';

export default function Layout({
  children,
  title,
  isLoading,
  isError,
  error,
}: LayoutProps) {
  const loadedContent = (
    <>
      <PageTitle title={title} />
      {children}
      {isError && error && <ErrorText text={error.message} />}
    </>
  );

  return <div>{(isLoading && <LoadingSpinner />) || loadedContent}</div>;
}
