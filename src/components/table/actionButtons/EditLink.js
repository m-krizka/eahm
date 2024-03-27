import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function EditLink(props) {
  const { url } = props;
  const { recordID } = props;
  return (
    <OverlayTrigger placement="top" overlay={tooltip} delayShow={800} delayHide={200}>
      <Link
        className="button-set-status link-edit"
        to={`${url}/${recordID}`}
        style={{
          paddingTop: '3px',
          paddingBottom: '2px',
        }}
      >
        <Glyphicon glyph="pencil" />
      </Link>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip-edit">Edit</Tooltip>
);

EditLink.propTypes = {
  url: PropTypes.string.isRequired,
  recordID: PropTypes.string.isRequired,
};
