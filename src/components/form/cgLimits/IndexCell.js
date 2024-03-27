/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default class IndexCell extends React.Component {
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
    const { type, setMac, row, indexColumn, balanceArmColumn, children, ...tdProps } = this.props;
    return (
      <td
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...tdProps}
      >
        <div className="cg-wrapper-index-table-cell">
          <div className="input-index-table-cell">{this.props.children}</div>
          <button
            onClick={() => setMac(row, type)}
            className={`${hideBtnClass} cell-calc-btn button-index-table-cell`}
            type="button"
          >
            <Glyphicon glyph="arrow-right" />
          </button>
        </div>
      </td>
    );
  }
}
