import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';

const Router = ({ user, refreshUser }) => (
  <HashRouter>
    {!!user && <Navigation user={user} /> }
    <Switch>
      {user
        ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route path="/profile">
              <Profile
                user={user}
                refreshUser={refreshUser}
              />
            </Route>
          </>
        )
        : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
    </Switch>
  </HashRouter>
);

Router.propTypes = {
  user: PropTypes.shape({}),
  refreshUser: PropTypes.func,
};

Router.defaultProps = {
  user: null,
  refreshUser: () => {},
};

export default Router;
