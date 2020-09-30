import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';

const Router = ({ user }) => (
  <HashRouter>
    <Switch>
      {user
        ? (
          <>
            <Route exact path="/">
              <Home />
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
};

Router.defaultProps = {
  user: null,
};

export default Router;
