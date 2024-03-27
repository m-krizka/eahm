/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default function IndexTableHead(props) {
  const { setBalanceArmPerUnitForAll, indexColumn, balanceArmColumn } = props;

  return (
    <th>
      <div className="wrapper-index-table-head">
        <button
          className="button-index-table-head cell-calc-btn"
          onClick={() => { setBalanceArmPerUnitForAll(indexColumn, balanceArmColumn); }}
          type="button"
        >
          <Glyphicon glyph="arrow-left" />
        </button>
        <div className="header-index-table-head">{props.children}</div>
      </div>
    </th>
  );
}
