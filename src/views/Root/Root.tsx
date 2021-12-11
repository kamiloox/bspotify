import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllContextsProvider from './AllContextsProvider';
import routes from '../../utils/routes/routes';
import ProtectedRoute from '../../components/organisms/ProtectedRoute/ProtectedRoute';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import Progress from '../../components/atoms/Progress/Progress';
import Typography from '../../components/atoms/Typography/Typography';
const Features = lazy(() => import('../Features/Features'));
const Home = lazy(() => import('../Home/Home'));
const NotFound404 = lazy(() => import('../NotFound404/NotFound404'));
const TopItems = lazy(() => import('../TopItems/TopItems'));
const AppPlayer = lazy(() => import('../AppPlayer/AppPlayer'));
const SavedTracks = lazy(() => import('../SavedTracks/SavedTracks'));
const UserPlaylists = lazy(() => import('../UserPlaylists/UserPlaylists'));

const suspenseFallback = (
  <MainTemplate>
    <Progress center />
  </MainTemplate>
);

const Root = () => (
  <AllContextsProvider>
    <Router>
      <Suspense fallback={suspenseFallback}>
        <Switch>
          <Route path={routes.home.path} exact>
            <Home />
          </Route>
          <ProtectedRoute path={routes.features.path}>
            <Features />
          </ProtectedRoute>
          <ProtectedRoute path={routes.appPlayer.path}>
            <AppPlayer />
          </ProtectedRoute>
          <ProtectedRoute path={routes.topItems.path}>
            <TopItems />
          </ProtectedRoute>
          <ProtectedRoute path={[routes.existingPlaylists.path, routes.searchItems.path]}>
            <MainTemplate>
              <Typography>Feature currently unavailable</Typography>
            </MainTemplate>
          </ProtectedRoute>
          <ProtectedRoute path={routes.savedTracks.path}>
            <SavedTracks />
          </ProtectedRoute>
          <ProtectedRoute path={routes.userPlaylists.path}>
            <UserPlaylists />
          </ProtectedRoute>
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  </AllContextsProvider>
);

export default Root;
