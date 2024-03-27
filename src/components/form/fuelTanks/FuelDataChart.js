import React from 'react';
import PropTypes from 'prop-types';
import 'react-datasheet/lib/react-datasheet.css';

function AxisX(props) {
  const {
    boxHeight,
    boxWidth,
    margins,
    xValues,
  } = props;

  if (xValues.length === 0) return null;

  const chartWidth = boxWidth - margins.left - margins.right;

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  const axisLowerBound = Math.floor(minX) - 1;
  const axisUpperBound = Math.ceil(maxX) + 1;

  const increment = (axisUpperBound - axisLowerBound) / 3;
  const textLabels = [0, 1, 2, 3].map((count) => {
    const label = axisLowerBound + (count * increment);
    const labelFormatted = Number.isInteger(label) ? label : label.toFixed(2);
    return (
      <text
        key={count}
        x={count * (chartWidth / 3) + margins.left - 10}
        y={boxHeight - 6}
        fontSize="9px"
        strokeWidth="0.2px"
      >
        {labelFormatted}
      </text>
    );
  });

  const ticks = [0, 1, 2, 3].map((count) => {
    return (
      <line
        key={count}
        x1={count * (chartWidth / 3) + margins.left}
        x2={count * (chartWidth / 3) + margins.left}
        y1={boxHeight - margins.bottom}
        y2={boxHeight - margins.bottom + 5}
        strokeWidth="0.5px"
        stroke="black"
      />
    );
  });

  return (
    <React.Fragment>
      <line
        x1={margins.left}
        x2={boxWidth - margins.right}
        y1={boxHeight - margins.bottom}
        y2={boxHeight - margins.bottom}
        strokeWidth="0.5px"
        stroke="black"
      />
      {ticks}
      {textLabels}
    </React.Fragment>
  );
}

function AxisY(props) {
  const {
    boxHeight,
    boxWidth,
    margins,
    yValues,
  } = props;

  if (yValues.length === 0) return null;

  const chartHeight = boxHeight - margins.top - margins.bottom;

  const maxY = Math.max(...yValues);

  const axisLowerBound = 0;
  const axisUpperBound = Math.ceil(maxY) + 1;

  const lines = [0, 1, 2, 3].map((count) => {
    return (
      <line
        key={count}
        x1={margins.left}
        x2={boxWidth - margins.right}
        y1={count * (chartHeight / 4) + margins.top}
        y2={count * (chartHeight / 4) + margins.top}
        strokeWidth="0.5px"
        stroke="black"
      />
    );
  });

  const increment = (axisUpperBound - axisLowerBound) / 4;

  const marginsForLengths = {
    5: 0,
    4: 5,
    3: 10,
    2: 15,
    1: 20,
  };

  const textLabels = [0, 1, 2, 3, 4].map((count) => {
    const label = axisUpperBound - (count * increment);
    const labelFormatted = Number.isInteger(label) ? label : label.toFixed(0);
    const extraMargin = marginsForLengths[labelFormatted.toString().length];
    return (
      <text
        key={count}
        x={5 + extraMargin}
        y={count * (chartHeight / 4) + margins.top + 3}
        fontSize="9px"
        strokeWidth="0.2px"
      >
        {labelFormatted}
      </text>
    );
  });

  return (
    <React.Fragment>
      {lines}
      {textLabels}
    </React.Fragment>
  );
}

function Plot(props) {
  const {
    boxHeight,
    boxWidth,
    margins,
    xValues,
    yValues,
  } = props;

  const chartHeight = boxHeight - margins.top - margins.bottom;
  const chartWidth = boxWidth - margins.left - margins.right;

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const axisXLowerBound = Math.floor(minX) - 1;
  const axisXUpperBound = Math.ceil(maxX) + 1;

  const axisYLowerBound = 0;
  const axisYUpperBound = Math.ceil(maxY) + 1;

  const rangeX = axisXUpperBound - axisXLowerBound;
  const rangeY = axisYUpperBound - axisYLowerBound;

  // Offset x by left margin of the range
  const offsetX = minX - axisXLowerBound;

  const circles = xValues.map((xValue, index) => {
    const yValue = yValues[index];

    const diffX = xValue - minX;
    const diffY = maxY - yValue;

    return (
      <circle
        key={index}
        cx={diffX * (chartWidth / rangeX) + margins.left + (offsetX * (chartWidth / rangeX))}
        cy={diffY * (chartHeight / rangeY) + margins.top}
        r="1.5"
        stroke="#0069ff"
        strokeWidth="1"
        fill="transparent"
      />
    );
  });

  return (
    <React.Fragment>
      {circles}
    </React.Fragment>
  );
}

export default function FuelDataChart(props) {
  const boxHeight = 300;
  const boxWidth = 300;

  const margins = {
    left: 40,
    right: 20,
    top: 40,
    bottom: 20,
  };

  const { title, xValues, yValues } = props;

  if (!xValues || xValues.length === 0) return null;
  if (!yValues || yValues.length === 0) return null;

  return (
    <div>
      <br />
      <div id="cabin-plan" style={{ width: '300px', height: '300px', border: '2px solid #f1f1f1' }}>
        <svg style={{ height: '100%' }}>
          <text
            x={boxWidth / 2 - 55}
            y="20"
            fontSize="10px"
            strokeWidth="1px"
          >
            {title}
          </text>
          <AxisX
            boxHeight={boxHeight}
            boxWidth={boxWidth}
            margins={margins}
            xValues={xValues}
          />
          <AxisY
            boxHeight={boxHeight}
            boxWidth={boxWidth}
            margins={margins}
            yValues={yValues}
          />
          <Plot
            boxHeight={boxHeight}
            boxWidth={boxWidth}
            margins={margins}
            xValues={xValues}
            yValues={yValues}
          />
        </svg>
      </div>
    </div>
  );
}

FuelDataChart.propTypes = {
};
