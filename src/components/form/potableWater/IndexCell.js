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
    const { setBalanceArmPerUnit, row, indexColumn, balanceArmColumn, children, ...tdProps } = this.props;
    return (
      <td
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...tdProps}
      >
        <div className="wrapper-index-table-cell">
          <button
            onClick={() => setBalanceArmPerUnit(row, indexColumn, balanceArmColumn)}
            className={`${hideBtnClass} cell-calc-btn button-index-table-cell`}
            type="button"
          >
            <Glyphicon glyph="arrow-left" />
          </button>
          <div className="input-index-table-cell">{children}</div>
        </div>
      </td>
    );
  }
}
