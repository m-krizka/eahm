import React from 'react';
import PropTypes from 'prop-types';
import 'react-datasheet/lib/react-datasheet.css';
import SeatRow from './SeatRow';

function getFurthestBalanceArm(grid) {
  let furthestBalanceArm = 0;
  for (let index = 0; index < grid.length; index += 1) {
    const current = parseFloat(grid[index][2].value);
    if (current > furthestBalanceArm) furthestBalanceArm = current;
  }
  return furthestBalanceArm;
}

function getSeatPlanHeight(furthestBalanceArm) {
  return furthestBalanceArm - 150 > 315 ? furthestBalanceArm - 150 : 315;
}

export default function CabinPlan(props) {
  const { grid } = props;
  const rows = grid.map((row) => {
    const rowNumber = row[0].value;
    const balanceArm = row[2].value;
    return <SeatRow key={rowNumber} row={rowNumber} balanceArm={balanceArm} />;
  });
  const seatPlanHeight = getSeatPlanHeight(getFurthestBalanceArm(grid));
  return (
    <div>
      <br />
      <div id="cabin-plan" style={{ width: '298px', height: `${seatPlanHeight}px`, border: '2px solid #f1f1f1' }}>
        <svg height={`${seatPlanHeight}px`} width="300">
          {rows}
        </svg>
      </div>
    </div>
  );
}

CabinPlan.propTypes = {
  grid: PropTypes.array.isRequired,
};
