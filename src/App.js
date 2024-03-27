import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './components/authentication/LoginPage';
import { RegisterPage } from './components/authentication/RegisterPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/" component={PrivateRoute} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { tableRecord } = state;
  return {
    alert,
    tableRecord,
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
