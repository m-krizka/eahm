import React from 'react';
import { FormControl, Radio } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import InputSelect from '../input/InputSelect';
import RegistrationSelect from '../input/RegistrationSelect';
import EffToTooltip from '../input/EffToTooltip';
import AircraftSelect from '../input/AircraftSelect';
import AircraftConstantsSelect from '../input/AircraftConstantsSelect';

export const simpleFields = {
  string: (props) => {
    const { field, value, onChange } = props;
    return (
      <FormControl
        name={field.fieldKey}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
      />
    );
  },
  number: (props) => {
    const { field, value, onChange } = props;
    return (
      <FormControl
        name={field.fieldKey}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        maxLength={field.maxLength ? field.maxLength : ''}
      />
    );
  },
  date: (props) => {
    const {
      field,
      date,
      focused,
      onDateChange,
      onFocusChange,
    } = props;
    const { fieldKey } = field;
    const toRenderEffToTooltip = field.fieldKey === 'effTo';
    return (
      <React.Fragment>
        <SingleDatePicker
          date={date}
          onDateChange={onDateChange}
          focused={focused}
          onFocusChange={onFocusChange}
          id={fieldKey}
          displayFormat="DD/MM/YYYY"
          hideKeyboardShortcutsPanel
        />
        {toRenderEffToTooltip && <EffToTooltip />}
      </React.Fragment>
    );
  },
  radioDouble: (props) => {
    const { value, onChange } = props;
    return (
      <React.Fragment>
        <Radio name="structural" value="true" checked={value === true} onChange={onChange} inline>
          &nbsp;Yes
        </Radio>
        &nbsp;&nbsp;
        <Radio name="structural" value="false" checked={value === false} onChange={onChange} inline>
          &nbsp;No
        </Radio>
      </React.Fragment>
    );
  },
  select: (props) => {
    const { field, value, onChange } = props;
    return <InputSelect name={field.fieldKey} value={value} onChange={onChange} />;
  },
  aircraftSelect: (props) => {
    const { field, value, onChange } = props;
    return <AircraftSelect name={field.fieldKey} value={value} onChange={onChange} />;
  },
  aircraftConstantsSelect: (props) => {
    const { field, value, onChange } = props;
    return <AircraftConstantsSelect name={field.fieldKey} value={value} onChange={onChange} />;
  },
  registrationSelect: (props) => {
    const { field, value, onChange } = props;
    return <RegistrationSelect name={field.fieldKey} value={value} onChange={onChange} />;
  },
  // grid: () => {
  //   return null;
  // },
};

simpleFields.string.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.number.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.date.propTypes = {
  field: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired,
};

simpleFields.radioDouble.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.select.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.aircraftSelect.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.aircraftConstantsSelect.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

simpleFields.registrationSelect.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
