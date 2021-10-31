import { ReactChild } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import AppProvider from '../../contexts/AppContext/AppContext';
import UserProvider from '../../contexts/UserContext/UserContext';
import ThemeProvider from '../../theme/ThemeProvider';

const queryClient = new QueryClient();

interface AllContextsProviderProps {
  children: ReactChild;
}

const AllContextsProvider = ({ children }: AllContextsProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <AppProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default AllContextsProvider;
