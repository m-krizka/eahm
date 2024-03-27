/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default class BalanceArmCell extends React.Component {
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
    const { setIndex, setWeight, row, children, ...tdProps } = this.props;
    return (
      <td
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...tdProps}
      >
        <div style={{float:'left', textAlign:'center', width:'80%', marginTop:'3px', transform:'translateX(15px)'}}>{this.props.children}</div>
        <button
          onClick={() => {
            setWeight(row);
            setIndex(row);
          }}
          type="button"
          className={hideBtnClass + ' cell-calc-btn'}
          style={{ float: 'right', color: 'rgb(23, 100, 211)' }}
        >
          <Glyphicon glyph="arrow-right" />
        </button>
      </td>
    );
  }
}
