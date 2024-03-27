/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default class BalanceArmTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const hideBtnClass = !this.state.hover ? 'cell-calc-btn-hidden' : '';
    const { setIndexForAll, setWeightForAll } = this.props;
    return (
      <th
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div style={{float:'left', textAlign:'center', width:'80%', marginLeft: '6px', transform:'translateY(1px)', paddingRight:'-6px' }}>{this.props.children}</div>
        <button
          onClick={() => {
            setWeightForAll();
            setIndexForAll();
          }}
          type="button"
          className={hideBtnClass + ' cell-calc-btn'}
          style={{ float: 'right', color: 'rgb(23, 100, 211)' }}
        >
          <Glyphicon glyph="arrow-right" />
        </button>
      </th>
    );
  }
}
