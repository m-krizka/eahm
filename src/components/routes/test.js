/* global localStorage */

import React from 'react';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavTab } from 'react-router-tabs';
import { Jumbotron, Button, Tabs, Accordion, Panel, Glyphicon } from 'react-bootstrap';

import { TableList } from '../table/TableList';
import { TableEdit } from '../form/TableEdit';
import { TableAdd } from '../form/TableAdd';

// HERE
import { tableTypes } from '../tableTypes';

import NavVertical from './NavVertical';
import { NavHorizontal } from './NavHorizontal';
import Footer from './Footer';
import { LoaderLinear } from './LoaderLinear';
import { Toast } from './Toast';

import { tables } from '../_tables';

import { getCollectionFromUrl } from '../_helpers/getCollectionFromUrl';

const Dashboard = () => {
  return (
    <div />
  );
};

const History = () => <div>You are on the History Tab</div>;

const TableInnerRoutes = (props) => {
  const { table } = props;
  const { type } = table;
  const { match } = props;
  const collectionUrl = getCollectionFromUrl(match.url);
  return (
    <div>
      <h3>{table.header}</h3>
      <div className="nav-tabs-wrapper">
        <NavTab allowClickOnActive to={`${match.url}/active`}>Active</NavTab>
        <NavTab allowClickOnActive to={`${match.url}/drafts`}>Drafts</NavTab>
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

        <Route exact path={`${match.path}/history`} component={History} />

        <Route
          path={`${match.path}/:status`}
          render={props => (
            tableTypes[type].tableList(props, table)
          )}
        />
      </Switch>
    </div>
  );
};

function NavAccordion(props) {
  const { name, items } = props;
  const NavSubItems = items.map(item => (
    <NavLink key={item.key} to={`/${item.key}`} activeClassName="sidebar-active">{`${item.header}`}</NavLink>
  ));
  return (
    <Panel className="nav-accordion">
      <Panel.Heading className="nav-accordion-title">
        <Panel.Title toggle>
          {name}
          &nbsp;&nbsp;
          <Glyphicon style={{ fontSize: '12px' }} glyph="menu-down" />
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body className="nav-accordion">
          {NavSubItems}
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );
}

function generateNavItems(tablesArray) {
  const output = [];
  for (let i = 0; i < tablesArray.length; i += 1) {
    const table = tablesArray[i];
    if (Object.prototype.hasOwnProperty.call(table, 'navGroup')) {
      if (Object.prototype.hasOwnProperty.call(output[output.length - 1], 'navGroup')) {
        output[output.length - 1].items.push({ header: table.header, key: table.collectionKey });
      } else {
        output.push({ navGroup: table.navGroup, items: [{ header: table.header, key: table.collectionKey }] });
      }
    } else {
      output.push(<NavLink key={table.id} to={`/${table.collectionKey}`} activeClassName="sidebar-active">{table.header}</NavLink>);
    }
  }
  for (let i = 0; i < output.length; i += 1) {
    const item = output[i];
    if (Object.prototype.hasOwnProperty.call(item, 'navGroup')) {
      output[i] = <NavAccordion key={item.navGroup} name={item.navGroup} items={item.items} />;
    }
  }

  return output;
}

export const PrivateRoute = ({ match }) => {
  // Dynamically render NavItems
  const NavItems = generateNavItems(tables);

  // Dynamically render Table Routes
  const TableRoutes = tables.map(table => (
    <Route
      key={table.id}
      path={`${match.path}${table.collectionKey}`}
      render={(props) => {
        return <TableInnerRoutes {...props} table={table} />;
      }}
    />
  ));

  return (
    localStorage.getItem('user')
      ? (
        <div className="wrapper">
          <div className="left-side-menu">
            <div className="logo-wrapper">
              <div className="outer-logo">
                <div className="middle-logo">
                  <a href="/"><i className="far fa-paper-plane logo-plane" /></a>
                </div>
              </div>
            </div>
            <div className="sidebar">
              <div className="logo-wrapper">
                <div className="outer-logo">
                  <div className="middle-logo">
                    <a href="/"><i className="far fa-paper-plane logo-plane" /></a>
                  </div>
                </div>
              </div>
              <div className="sidebar-header">Manage</div>
              {NavItems}
              <div className="sidebar-header">Account</div>
              <a href="/">Profile</a>
            </div>
          </div>
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
};
