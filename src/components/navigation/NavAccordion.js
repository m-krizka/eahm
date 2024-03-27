import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Panel, Glyphicon } from 'react-bootstrap';

class NavAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.setExpanded = this.setExpanded.bind(this);
  }

  setExpanded() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { name, items } = this.props;
    const { expanded } = this.state;
    const NavSubItems = items.map(item => (
      <NavLink key={item.key} to={`/${item.key}`} activeClassName="sidebar-active">{`${item.header}`}</NavLink>
    ));
    return (
      <Panel className="nav-accordion">
        <Panel.Heading className="nav-accordion-title">
          <Panel.Title toggle onClick={this.setExpanded}>
            {name}
            &nbsp;&nbsp;
            <Glyphicon className="navgroup-glyph" style={{ fontSize: '12px' }} glyph={expanded ? 'menu-down' : 'menu-right'} />
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
}

export default NavAccordion;

NavAccordion.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
