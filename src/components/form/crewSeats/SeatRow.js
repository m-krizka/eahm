import React from 'react';
import 'react-datasheet/lib/react-datasheet.css';

const seatColumns = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
};

function Seat(props) {
  const { index, row, column, balanceArm } = props;
  const rightOffset = (index > 2) ? 35 : 0;
  const seatColumn = seatColumns[column];
  return (
    <React.Fragment>
      <rect
        x={(index * 35) + 27 + rightOffset}
        y={balanceArm - 200}
        width="30"
        height="30"
        rx="5"
        ry="5"
        style={{ fill: 'rgb(23, 100, 211)' }}
      />
      <text style={{ fontSize: '11px', fontWeight: 600 }} x={(index * 35) + 30 + rightOffset} y={balanceArm - 200 + 25} fill="white">{`${row}${seatColumn}`}</text>
    </React.Fragment>
  );
}

export default function SeatRow(props) {
  const { row, balanceArm } = props;
  const rowArray = [];
  let counter = 0;
  while (counter < 6) {
    rowArray.push(<Seat key={counter} index={counter} row={row} column={counter + 1} balanceArm={balanceArm} />);
    counter += 1;
  }
  return (
    <React.Fragment>
      {rowArray}
    </React.Fragment>
  );
}
