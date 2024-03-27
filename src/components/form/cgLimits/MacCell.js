/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default class MacCell extends React.Component {
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
    const { type, setIndex, row, indexColumn, balanceArmColumn, children, ...tdProps } = this.props;
    return (
      <td
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...tdProps}
      >
        <div className="wrapper-mac-table-cell">
          <button
            onClick={() => setIndex(row, type)}
            type="button"
            className={`${hideBtnClass} cell-calc-btn button-mac-table-cell`}
          >
            <Glyphicon glyph="arrow-left" />
          </button>
          <div className="input-mac-table-cell">{children}</div>
        </div>
      </td>
    );
  }
}
