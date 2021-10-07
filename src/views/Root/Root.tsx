import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App/App';
import Home from '../Home/Home';
import NotFound404 from '../NotFound404/NotFound404';

const Root = () => (
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
);

export default Root;
