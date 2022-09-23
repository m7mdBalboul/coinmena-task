import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

function QueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export const withQueryClient = <
  FunctionWithQueryClient extends (
    queryClient: QueryClient
  ) => (...args: unknown[]) => unknown,
  ReturnedFunction extends ReturnType<FunctionWithQueryClient>
>(
  func: FunctionWithQueryClient
): ReturnedFunction => {
  return func(queryClient) as ReturnedFunction;
};

export { QueryProvider };
