import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

export default function BalanceArmCalculator(props) {
  const { weight } = props;
  const { index } = props;
  const { setBalanceArm } = props;
  return (
    <div className="calculator-wrapper">
      <div className="calculator-left">
        <button
          type="button"
          className="calculator-button"
          onClick={() => { setBalanceArm(weight, index); }}
        >
          <Glyphicon glyph="refresh" className="field-calculator-icon" />
        </button>
      </div>
      <div className="calculator-right">
        <span className="calculator-label">Calculate Balance Arm from Index</span>
      </div>
    </div>
  );
}

BalanceArmCalculator.propTypes = {
  weight: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  setBalanceArm: PropTypes.func.isRequired,
};
