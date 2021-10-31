import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllContextsProvider from './AllContextsProvider';
import routes from '../../utils/routes/routes';
import ProtectedRoute from '../../components/organisms/ProtectedRoute/ProtectedRoute';
import App from '../App/App';
import Home from '../Home/Home';
import NotFound404 from '../NotFound404/NotFound404';
import EntitiesTop from '../EntitiesTop/EntitiesTop';

const Root = () => (
  <AllContextsProvider>
    <Router>
      <Switch>
        <Route path={routes.home.path} exact>
          <Home />
        </Route>
        <ProtectedRoute path={routes.app.path}>
          <App />
        </ProtectedRoute>
        <ProtectedRoute path={routes.entitiesTop.path}>
          <EntitiesTop />
        </ProtectedRoute>
        <ProtectedRoute path={[routes.entitiesExisting.path, routes.entitiesSearch.path]}>
          <p>Feature currently unavailable</p>
        </ProtectedRoute>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  </AllContextsProvider>
);

export default Root;
