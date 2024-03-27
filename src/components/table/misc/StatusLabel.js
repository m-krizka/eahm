import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

const colors = {
  active: '#5cc992',
  draft: '#4986ff',
  inactive: '#a3a3a3',
};

export default function StatusLabel(props) {
  const { status } = props;
  return (
    <React.Fragment>
      <div
        style={{
          float: 'left',
          height: '10px',
          width: '10px',
          backgroundColor: colors[status],
          borderRadius: '50%',
          marginTop: '5px',
        }}
      />
      <div
        style={{
          float: 'left',
          marginLeft: '6px',
        }}
      >
        <em>{status}</em>
      </div>
    </React.Fragment>
  );
}

StatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
};
