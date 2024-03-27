import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

export default function BasicIndexCalculator(props) {
  const { weight } = props;
  const { balanceArm } = props;
  const { setIndex } = props;
  return (
    <div className="calculator-wrapper">
      <div className="calculator-left">
        <button
          type="button"
          className="calculator-button"
          onClick={() => { setIndex(weight, balanceArm); }}
        >
          <Glyphicon glyph="refresh" className="field-calculator-icon" />
        </button>
      </div>
      <div className="calculator-right">
        <span className="calculator-label">Calculate Basic Index from Balance Arm</span>
      </div>
    </div>
  );
}

BasicIndexCalculator.propTypes = {
  // weight: PropTypes.any.isRequired,
  // balanceArm: PropTypes.any.isRequired,
  // setIndex: PropTypes.func.isRequired,
};
