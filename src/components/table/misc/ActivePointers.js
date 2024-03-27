import React from 'react';
import PropTypes from 'prop-types';

export default function ActivePointers(props) {
  const { activeSubRecordsNumber } = props;
  const pointers = [];
  for (let index = 0; index < activeSubRecordsNumber; index += 1) {
    if (index === 0) {
      pointers.push(
        <React.Fragment key={index}>
          <line x1="25" y1={68} x2="78" y2={68} style={{ stroke: '#C6CCD1', strokeWidth: '1' }} />
          <line x1="25" y1={0} x2="25" y2={68} style={{ stroke: '#C6CCD1', strokeWidth: '1' }} />
        </React.Fragment>,
      );
    } else {
      pointers.push(
        <React.Fragment key={index}>
          <line x1="25" y1={68 + (index * 40)} x2="78" y2={68 + (index * 40)} style={{ stroke: '#C6CCD1', strokeWidth: '1' }} />
          <line x1="25" y1={28 + (index * 40)} x2="25" y2={68 + (index * 40)} style={{ stroke: '#C6CCD1', strokeWidth: '1' }} />
        </React.Fragment>,
      );
    }
  }
  return (
    <React.Fragment>
      {pointers}
    </React.Fragment>
  );
}

ActivePointers.propTypes = {
  activeSubRecordsNumber: PropTypes.number.isRequired,
};
