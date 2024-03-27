import React from 'react';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';

export const DateRangeFieldWrapper = (props) => {
  const {
    field,
    startDate,
    endDate,
    onDatesChange,
    focusedInput,
    onFocusChange,
  } = props;
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={3}>{field.fieldName}</Col>
      <Col sm={9}>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={onFocusChange}
          displayFormat="DD/MM/YYYY"
          isOutsideRange={() => false}
          hideKeyboardShortcutsPanel
        />
      </Col>
    </FormGroup>
  );
};

DateRangeFieldWrapper.defaultProps = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

DateRangeFieldWrapper.propTypes = {
  field: PropTypes.object.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onDatesChange: PropTypes.func.isRequired,
  focusedInput: PropTypes.any,
  onFocusChange: PropTypes.func.isRequired,
};
