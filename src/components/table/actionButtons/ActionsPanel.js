import React from 'react';
import PropTypes from 'prop-types';

import ActivateButton from './ActivateButton';
import DeactivateButton from './DeactivateButton';
import EditLink from './EditLink';
import DeleteButton from './DeleteButton';

export default function ActionsPanel(props) {
  const { status, match, row, handleStatusModalShow, handleDeletionModalShow } = props;
  const isDraftsTable = status === 'draft';
  const isActiveTable = status === 'active';
  return (
    <React.Fragment>
      {isActiveTable && <DeactivateButton onClick={() => handleStatusModalShow(row, 'inactive')} />}

      {isDraftsTable && <ActivateButton onClick={() => handleStatusModalShow(row, 'active')} />}
      {isDraftsTable && <EditLink url={match.url} recordID={row._id} />}
      {isDraftsTable && <DeleteButton onClick={() => handleDeletionModalShow(row)} />}
    </React.Fragment>
  );
}
