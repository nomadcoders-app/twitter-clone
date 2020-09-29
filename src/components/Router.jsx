import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';

const Router = ({ isSignedIn }) => (
  <HashRouter>
    <Switch>
      {isSignedIn
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
  isSignedIn: PropTypes.bool.isRequired,
};

export default Router;
