import React from 'react';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { simpleFields } from './SimpleFields';
import FormLabel from '../label/FormLabel';
import FormInput from '../input/FormInput';
import FormCalculator from '../calculator/FormCalculator';

export const SimpleFieldWrapper = (props) => {
  const { field, fields, record, onChange, isModalForm } = props;
  const { fieldKey, fieldType } = field;

  const toRenderFormCalculator = (fieldKey === 'index')
    || (fieldKey === 'balanceArm')
    || (fieldKey === 'basicIndex')
    || (fieldKey === 'basicBalanceArm');

  if (fieldKey === 'status' || fieldType === 'grid') return null;

  if (field.hasOwnProperty('range')) {
    if (field.range.type === 'end') return null;
    const fieldStart = field;
    let fieldEnd;
    fields.forEach((selectedField) => {
      if (selectedField.hasOwnProperty('range')) {
        if (selectedField.range.name === field.range.name && selectedField.range.type === 'end') {
          fieldEnd = selectedField;
        }
      }
    });
    return (
      <FormGroup>
        <FormLabel fieldName={fieldStart.fieldName} />
        <Col
          sm={5}
          md={4}
          lg={2}
        >
        <div style={{ display: 'inline-flex' }}>
          <FormControl
            name={fieldStart.fieldKey}
            value={record[fieldStart.fieldKey]}
            onChange={onChange}
            placeholder={fieldStart.placeholder}
            maxLength={fieldStart.maxLength ? fieldStart.maxLength : ''}
          />
          <span className="input-range-separator-to">&nbsp;&nbsp;to&nbsp;&nbsp;</span>
          <FormControl
            name={fieldEnd.fieldKey}
            value={record[fieldEnd.fieldKey]}
            onChange={onChange}
            placeholder={fieldEnd.placeholder}
            maxLength={fieldEnd.maxLength ? fieldStart.maxLength : ''}
          />
        </div>
        </Col>
      </FormGroup>
    );
  }

  return (
    <FormGroup>
      <FormLabel fieldName={field.fieldName} />
      <FormInput inputField={simpleFields[field.fieldType](props)} isModalForm={isModalForm} />
      {toRenderFormCalculator && <FormCalculator {...props} />}
    </FormGroup>
  );
};

SimpleFieldWrapper.propTypes = {
  field: PropTypes.object.isRequired,
  isModalForm: PropTypes.bool.isRequired,
};
