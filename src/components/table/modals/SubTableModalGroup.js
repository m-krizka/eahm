import React from 'react';
import PropTypes from 'prop-types';

import ModalStatusSet from './ModalStatusSet';
import ModalDelete from './ModalDelete';
import ModalMappingAdd from './ModalMappingAdd';
import ModalMappingEdit from './ModalMappingEdit';

import { mappingTable } from '../../../config/_mappingTable';

export default function SubTableModalGroup(props) {
  const { caller, table, parentRecord } = props;
  const { state } = caller;
  const {
    showMappingModalAdd,
    showMappingModalEdit,
    showStatusModal,
    showDeletionModal,
    recordToSetStatus,
    recordToEdit,
    recordToDelete,
    statusToSet,
  } = state;
  return (
    <React.Fragment>
      <ModalMappingAdd
        showing={showMappingModalAdd}
        onHide={caller.handleMappingModalClose}
        mappingTable={mappingTable}
        parentTableURL={table.url}
        parentSetId={parentRecord._id}
        closeModal={caller.handleMappingModalClose}
        loadData={caller.loadData}
      />
      <ModalMappingEdit
        showing={showMappingModalEdit}
        mappingTable={mappingTable}
        onHide={caller.handleMappingModalEditClose}
        closeModal={caller.handleMappingModalEditClose}
        parentTableURL={table.url}
        record={recordToEdit}
        loadData={caller.loadData}
      />
      <ModalStatusSet
        table={mappingTable}
        showing={showStatusModal}
        onHide={caller.handleStatusModalClose}
        setStatus={caller.handleSetStatus}
        statusToSet={statusToSet}
        record={recordToSetStatus}
      />
      <ModalDelete
        table={mappingTable}
        showing={showDeletionModal}
        onHide={caller.handleDeletionModalClose}
        handleDelete={caller.handleDelete}
        record={recordToDelete}
      />
    </React.Fragment>
  );
}

SubTableModalGroup.propTypes = {
  table: PropTypes.object.isRequired,
  parentRecord: PropTypes.object.isRequired,
  caller: PropTypes.object.isRequired,
};
