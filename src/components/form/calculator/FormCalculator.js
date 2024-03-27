import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import IndexCalculator from './default/IndexCalculator';
import BalanceArmCalculator from './default/BalanceArmCalculator';
import BasicIndexCalculator from './bw-bi/BasicIndexCalculator';
import BasicBalanceArmCalculator from './bw-bi/BasicBalanceArmCalculator';

export default function FormCalculator(props) {
  const {
    field,
    record,
    setIndex,
    setBalanceArm,
    setBasicIndex,
    setBasicBalanceArm,
  } = props;

  const {
    weight,
    balanceArm,
    index,
    basicBalanceArm,
    basicIndex,
  } = record;

  const { fieldKey } = field;

  const toRenderIndexCalculator = fieldKey === 'index';
  const toRenderBalanceArmCalculator = fieldKey === 'balanceArm';

  const toRenderBasicIndexCalculator = fieldKey === 'basicIndex';
  const toRenderBasicBalanceArmCalculator = fieldKey === 'basicBalanceArm';

  return (
    <Col
      sm={4}
      md={4}
      lg={3}
      className="field-calculator"
    >
      {toRenderIndexCalculator && (
        <IndexCalculator
          setIndex={setIndex}
          weight={weight}
          balanceArm={balanceArm}
        />
      )
      }
      {toRenderBalanceArmCalculator && (
        <BalanceArmCalculator
          setBalanceArm={setBalanceArm}
          weight={weight}
          index={index}
        />
      )
      }

      {toRenderBasicIndexCalculator && (
        <BasicIndexCalculator
          setIndex={setBasicIndex}
          weight={weight}
          balanceArm={basicBalanceArm}
        />
      )
      }
      {toRenderBasicBalanceArmCalculator && (
        <BasicBalanceArmCalculator
          setBalanceArm={setBasicBalanceArm}
          weight={weight}
          index={basicIndex}
        />
      )
      }
    </Col>
  );
}

FormCalculator.propTypes = {
  field: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  setIndex: PropTypes.func.isRequired,
  setBalanceArm: PropTypes.func.isRequired,
  setBasicIndex: PropTypes.func.isRequired,
  setBasicBalanceArm: PropTypes.func.isRequired,
};
