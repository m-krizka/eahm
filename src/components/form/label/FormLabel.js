import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'react-bootstrap';

export default function FormLabel(props) {
  const { fieldName } = props;
  return (
    <Col componentClass={ControlLabel} sm={3}>{fieldName}</Col>
  );
}

FormLabel.propTypes = {
  fieldName: PropTypes.string.isRequired,
};
