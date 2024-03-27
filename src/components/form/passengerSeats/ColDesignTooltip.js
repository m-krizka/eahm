import React from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ColDesigTooltip() {
  return (
    <React.Fragment>
    &nbsp;&nbsp;
      <OverlayTrigger
        placement="right"
        overlay={
          (
            <Tooltip id="tooltip_1">
              - (dash) indicates the cabin aisle
            </Tooltip>
          )
        }
      >
        <Glyphicon glyph="info-sign" />
      </OverlayTrigger>
    </React.Fragment>
  );
}
