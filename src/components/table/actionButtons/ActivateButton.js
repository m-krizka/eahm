import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function ActivationButton(props) {
  const { onClick } = props;
  return (
    <OverlayTrigger placement="top" overlay={tooltip} delayShow={800} delayHide={200}>
      <button
        type="button"
        className="button-set-status btn-activate"
        onClick={onClick}
      >
        <Glyphicon glyph="check" />
      </button>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip-activate">Activate</Tooltip>
);

ActivationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
