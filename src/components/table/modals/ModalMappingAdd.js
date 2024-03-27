import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import { SubTableAdd } from '../../form/SubTableAdd';

export default function ModalTableAdd(props) {
  const {
    showing,
    onHide,
    mappingTable,
    parentTableURL,
    parentSetId,
    closeModal,
    loadData,
  } = props;
  return (
    <Modal show={showing} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><strong>New Mapping</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SubTableAdd
          table={mappingTable}
          parentTableURL={parentTableURL}
          parentSetId={parentSetId}
          closeModal={closeModal}
          loadData={loadData}
        />
      </Modal.Body>
    </Modal>
  );
}

ModalTableAdd.propTypes = {
  showing: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  mappingTable: PropTypes.object.isRequired,
  parentTableURL: PropTypes.string.isRequired,
  // parentSetId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};
