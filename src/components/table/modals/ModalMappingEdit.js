import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import { SubTableEdit } from '../../form/SubTableEdit';

export default function ModalMappingEdit(props) {
  const {
    showing,
    onHide,
    record,
    mappingTable,
    parentTableURL,
    parentSetId,
    closeModal,
    loadData,
  } = props;
  return (
    <Modal show={showing} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Edit Mapping</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SubTableEdit
          table={mappingTable}
          parentTableURL={parentTableURL}
          parentSetId={parentSetId}
          closeModal={closeModal}
          loadData={loadData}
          record={record}
        />
      </Modal.Body>
    </Modal>
  );
}

ModalMappingEdit.propTypes = {
  // record: PropTypes.object.isRequired,
  showing: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  mappingTable: PropTypes.object.isRequired,
  parentTableURL: PropTypes.string.isRequired,
  // parentSetId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};
