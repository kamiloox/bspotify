import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/organisms/ProtectedRoute/ProtectedRoute';
import ThemeProvider from '../../theme/ThemeProvider';
import App from '../App/App';
import Home from '../Home/Home';
import NotFound404 from '../NotFound404/NotFound404';

const Root = () => (
  <ThemeProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <ProtectedRoute path="/app" redirectTo="/">
          <App />
        </ProtectedRoute>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default Root;
