import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import routes from '../../utils/routes/routes';
import ProtectedRoute from '../../components/organisms/ProtectedRoute/ProtectedRoute';
import UserProvider from '../../contexts/UserContext/UserContext';
import ThemeProvider from '../../theme/ThemeProvider';
import App from '../App/App';
import Home from '../Home/Home';
import NotFound404 from '../NotFound404/NotFound404';
import SelectHints from '../SelectHints/SelectHints';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route path={routes.home.path} exact>
              <Home />
            </Route>
            <ProtectedRoute path={routes.app.path}>
              <App />
            </ProtectedRoute>
            <ProtectedRoute
              path={[routes.hintsTop.path, routes.hintsSearch.path, routes.hintsExisting.path]}
            >
              <SelectHints />
            </ProtectedRoute>
            <Route path="*">
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default Root;
