import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/lib/extensions/arrayExtensions';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'react-datepicker/dist/react-datepicker.css';

import { StaticReposProvider } from '@/lib/repositories/ReposProvider';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StaticReposProvider>
        <Component {...pageProps} />
      </StaticReposProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
