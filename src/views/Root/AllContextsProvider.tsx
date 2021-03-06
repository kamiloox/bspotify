import { ReactChild } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import ToastProvider from '../../contexts/ToastContext/ToastContext';
import UserProvider from '../../contexts/UserContext/UserContext';
import ThemeProvider from '../../theme/ThemeProvider';

const queryClient = new QueryClient();

interface AllContextsProviderProps {
  children: ReactChild;
}

const AllContextsProvider = ({ children }: AllContextsProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ToastProvider>
        <UserProvider>{children}</UserProvider>
      </ToastProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default AllContextsProvider;
