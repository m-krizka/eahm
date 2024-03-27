import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function EditButton(props) {
  const { onClick } = props;
  return (
    <OverlayTrigger placement="top" overlay={tooltip} delayShow={800} delayHide={200}>
      <button
        type="button"
        className="button-set-status btn-edit"
        onClick={onClick}
      >
        <Glyphicon glyph="pencil" />
      </button>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip-edit">Edit</Tooltip>
);

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
