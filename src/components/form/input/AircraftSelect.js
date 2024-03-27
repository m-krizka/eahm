import React from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AircraftSelect(props) {
  const selectOptions = aircraftTypes.map((type) => {
    return <option key={type} value={type}>{type}</option>;
  });
  const { value, name, onChange } = props;
  return (
    <FormControl value={value} name={name} componentClass="select" placeholder="select" onChange={onChange}>
      <option disabled key="default" value="" style={{ display: 'none' }} />
      {selectOptions}
    </FormControl>
  );
}

const aircraftTypes = [
  'A318 ceo',
  'A319 ceo',
  'A320 ceo',
  'A321 ceo',
  'A319 neo',
  'A320 neo',
  'A321 neo',
  'B737-300',
  'B737-400',
  'B737-500',
  'B737-600',
  'B737-700',
  'B737-800',
  'B737-900',
  'B737-7',
  'B737-8',
  'B737-9',
];

AircraftSelect.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
