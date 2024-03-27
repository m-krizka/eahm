/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default function BalanceArmTableHead(props) {
  const { setIndexPerUnitForAll, indexColumn, balanceArmColumn } = props;

  return (
    <th>
      <div className="wrapper-balance-arm-table-head">
        <div className="header-balance-arm-table-head">{props.children}</div>
        <button
          className="button-balance-arm-table-head cell-calc-btn"
          onClick={() => { setIndexPerUnitForAll(indexColumn, balanceArmColumn); }}
          type="button"
        >
          <Glyphicon glyph="arrow-right" />
        </button>
      </div>
    </th>
  );
}
