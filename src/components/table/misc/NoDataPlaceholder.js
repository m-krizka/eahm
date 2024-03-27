import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default function NoDataPlaceholder() {
  return (
    <div className="no-data-placeholder">
      <Glyphicon glyph="ban-circle" />
      &nbsp;
      No Data
    </div>
  );
}
