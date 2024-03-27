import React from 'react';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function EffToTooltip() {
  return (
    <React.Fragment>
    &nbsp;&nbsp;
      <OverlayTrigger
        placement="right"
        overlay={
          (
            <Tooltip id="tooltip_1">
              If End Date is left blank, record will be valid indefinitely
            </Tooltip>
          )
        }
      >
        <Glyphicon glyph="info-sign" />
      </OverlayTrigger>
    </React.Fragment>
  );
}
