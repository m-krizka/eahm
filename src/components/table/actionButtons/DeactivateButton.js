import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function DeactivationButton(props) {
  const { onClick } = props;
  return (
    <OverlayTrigger placement="top" overlay={tooltip} delayShow={800} delayHide={200}>
      <button type="button" className="button-set-status btn-deactivate" onClick={onClick}>
        <Glyphicon glyph="remove" />
      </button>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip-deactivate">Deactivate</Tooltip>
);

DeactivationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
