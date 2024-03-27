/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

export default function MacTableHead(props) {
  const { type, setIndexForAll, children } = props;

  return (
    <th>
      <div className="wrapper-mac-table-head">
        <button
          className="button-mac-table-head cell-calc-btn"
          onClick={() => { setIndexForAll(type); }}
          type="button"
        >
          <Glyphicon glyph="arrow-left" />
        </button>
        <div className="header-mac-table-head">{children}</div>
      </div>
    </th>
  );
}
