/* global fetch window  localStorage */

import React from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import config from '../../../../config';
import { authHeader } from '../../../_helpers';

function logout() {
  localStorage.removeItem('user');
}

class RegistrationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), apiurl: 'fleet-identifiers' },
    };

    fetch(`${config.apiUrl}/api/fleet-identifiers?&_status=active&_status=draft`, requestOptions).then((response) => {
      response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            logout();
            window.location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (this._isMounted) this.setState({ records: data.records });
        return true;
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { name, value, onChange } = this.props;
    const { records } = this.state;
    const selectOptions = records.map((record) => {
      return (
        <option
          key={record._id}
          value={record.registration}
        >
          {`${record.registration} (${record.aircraftType})`}
        </option>
      );
    });
    selectOptions.push(<option disabled key="default" value="" style={{ display: 'none' }} />);
    return (
      <FormControl value={value} name={name} componentClass="select" placeholder="select" onChange={onChange}>
        {selectOptions}
      </FormControl>
    );
  }
}

RegistrationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RegistrationSelect;
