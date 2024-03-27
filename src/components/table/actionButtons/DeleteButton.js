import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function DeleteButton(props) {
  const { onClick } = props;
  return (
    <OverlayTrigger placement="top" overlay={tooltip} delayShow={800} delayHide={200}>
      <button
        type="button"
        className="button-set-status btn-delete"
        onClick={onClick}
      >
        <Glyphicon glyph="trash" />
      </button>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip-delete">Delete</Tooltip>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
