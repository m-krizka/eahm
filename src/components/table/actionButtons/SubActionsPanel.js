import React from 'react';
import PropTypes from 'prop-types';

import ActivateButton from './ActivateButton';
import DeactivateButton from './DeactivateButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

import ModalMappingEdit from '../modals/ModalMappingEdit';

export default function SubActionsPanel(props) {
  const {
    status,
    match,
    row,
    handleStatusModalShow,
    handleMappingModalEditShow,
    handleDeletionModalShow,
  } = props;
  const isDraftsTable = status === 'draft';
  const isActiveTable = status === 'active';
  return (
    <React.Fragment>
      {isActiveTable && <DeactivateButton onClick={() => handleStatusModalShow(row, 'inactive')} />}

      {isDraftsTable && <ActivateButton onClick={() => handleStatusModalShow(row, 'active')} />}
      {isDraftsTable && <EditButton onClick={() => handleMappingModalEditShow(row)} />}
      {isDraftsTable && <DeleteButton onClick={() => handleDeletionModalShow(row)} />}
    </React.Fragment>
  );
}
