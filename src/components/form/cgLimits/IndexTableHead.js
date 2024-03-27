/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default function IndexTableHead(props) {
  const { type, setMacForAll, children } = props;

  return (
    <th>
      <div className="cg-wrapper-index-table-head">
        <div className="header-index-table-head">{children}</div>
        <button
          className="button-index-table-head cell-calc-btn"
          onClick={() => { setMacForAll(type); }}
          type="button"
        >
          <Glyphicon glyph="arrow-right" />
        </button>
      </div>
    </th>
  );
}
