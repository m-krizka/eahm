/* eslint no-shadow: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NavTab } from 'react-router-tabs';


import { tableTypes } from './tableTypes';
import HistoryTab from '../misc/HistoryTab';

import { getCollectionFromUrl } from '../../_helpers/getCollectionFromUrl';

export default function TableInnerRoutes(props) {
  const { table } = props;
  const { match } = props;
  const { type } = table;
  const collectionUrl = getCollectionFromUrl(match.url);
  return (
    <div>
      <h3>{table.header}</h3>
      <div className="nav-tabs-wrapper">
        <NavTab allowClickOnActive to={`${match.url}/active`}>Active</NavTab>
        <NavTab allowClickOnActive to={`${match.url}/draft`}>Drafts</NavTab>
        <NavTab allowClickOnActive to={`${match.url}/inactive`}>Inactive</NavTab>
        <NavTab allowClickOnActive to={`${match.url}/history`}>History</NavTab>
      </div>

      <Switch>
        <Route exact path={`${match.path}`} render={() => <Redirect replace to={`${match.path}/active`} />} />
        <Route
          path={`${match.path}/:status/:id`}
          render={props => (
            tableTypes[type].editForm(props, table)
          )}
        />

        <Route
          exact
          path={`/${collectionUrl}/add`}
          render={props => (
            tableTypes[type].addForm(props, table)
          )}
        />

        <Route exact path={`${match.path}/history`} component={HistoryTab} />

        <Route
          path={`${match.path}/:status`}
          render={props => (
            tableTypes[type].tableList(props, table)
          )}
        />
      </Switch>
    </div>
  );
}

TableInnerRoutes.propTypes = {
  table: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
