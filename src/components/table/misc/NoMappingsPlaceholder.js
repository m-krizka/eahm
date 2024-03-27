import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default function NoMappingsPlaceholder() {
  return (
    <div className="no-mappings-placeholder">
      <Glyphicon glyph="ban-circle" />
      &nbsp;
      No Mappings
    </div>
  );
}
