import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
        <Route path="/app">
          <App />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default Root;
