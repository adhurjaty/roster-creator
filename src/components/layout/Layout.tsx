import * as React from 'react';

import ErrorText from '@/components/ErrorText';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';
import LayoutProps from '@/components/props/LayoutProps';

export default function Layout({
  children,
  className,
  title,
  isLoading,
  isError,
  error,
}: LayoutProps) {
  const loadedContent = (
    <div className={className ?? ''}>
      <PageTitle title={title} />
      {children}
      {isError && error && <ErrorText text={error.message} />}
    </div>
  );

  return <div>{(isLoading && <LoadingSpinner />) || loadedContent}</div>;
}
