import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Nav,
  NavDropdown,
  Navbar,
  Col,
  MenuItem,
} from 'react-bootstrap';

import { userActions } from '../../_actions';
import { history } from '../../_helpers';

class NavHorizontal extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
    history.push('/login');
  }

  render() {
    const { user } = this.props;
    return (
      <Navbar fluid>
        <Col sm={5} />
        <Col sm={4}>
          <div style={{ paddingTop: 8 }} />
        </Col>
        <Col sm={3}>
          <Nav pullRight>
            <NavDropdown eventKey="1" title={`${user.email}`} id="nav-dropdown">
              <MenuItem eventKey="1.1" onClick={this.logout}>Sign out</MenuItem>
            </NavDropdown>
          </Nav>
        </Col>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

const connectedNavHorizontal = connect(mapStateToProps)(NavHorizontal);
export { connectedNavHorizontal as NavHorizontal };
