import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

export default function FormInput(props) {
  const { inputField, isModalForm } = props;
  // Use different columns for Modal form
  if (isModalForm) {
    return (
      <Col
        sm={8}
        md={6}
        lg={4}
      >
        {inputField}
      </Col>
    );
  }
  return (
    <Col
      sm={5}
      md={4}
      lg={2}
    >
      {inputField}
    </Col>
  );
}

FormInput.propTypes = {
  inputField: PropTypes.object.isRequired,
};
