import React from 'react';
import 'react-datasheet/lib/react-datasheet.css';

import PropTypes from 'prop-types';

export default function SeatRow(props) {
  const { row, balanceArm } = props;

  return (
    <React.Fragment>
      <rect
        x={20}
        y={balanceArm - 198}
        width="255"
        height="30"
        rx="5"
        ry="5"
        style={{ fill: '#1764d3' }}
      />
      <text style={{ fontSize: '11px', fontWeight: 600 }} x={25} y={balanceArm - 200 + 25} fill="white">{row}</text>
    </React.Fragment>
  );
}
