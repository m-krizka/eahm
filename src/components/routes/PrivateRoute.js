/* global localStorage */
/* eslint no-shadow: 0 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import TableInnerRoutes from './TableInnerRoutes';
import SideBar from '../navigation/SideBar';
import { NavHorizontal } from '../navigation/NavHorizontal';
import Footer from '../navigation/Footer';
import { LoaderLinear } from '../misc/LoaderLinear';
import { Toast } from '../misc/Toast';

import { tables } from '../../config/_tables';

const Dashboard = () => (<div />);

export const PrivateRoute = ({ match }) => {
  const TableRoutes = tables.map(table => (
    <Route
      key={table.id}
      path={`${match.path}${table.url}`}
      render={(props) => {
        return <TableInnerRoutes {...props} table={table} />;
      }}
    />
  ));

  return (
    localStorage.getItem('user')
      ? (
        <div className="wrapper">
          <SideBar />
          <div className="content-page">
            <div className="content">
              <NavHorizontal />
              <LoaderLinear />
              <Toast />
              <div className="container-fluid content-wrapper">
                <Route exact path={match.url} component={Dashboard} />
                {TableRoutes}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      )
      : <Redirect to="/login" />
  );
};

PrivateRoute.propTypes = {
  match: PropTypes.object.isRequired,
};

TableInnerRoutes.propTypes = {
  table: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
