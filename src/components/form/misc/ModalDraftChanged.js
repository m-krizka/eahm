import React from 'react';
import { Modal, Link, Table, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';


export default function ModalDraftChanged(props) {
  const { showing } = props;
  const { onHide } = props;
  const { handleDelete } = props;
  const { onDiscard } = props;
  return (
    <Modal show={showing} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Draft has been changed</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to discard unsaved changes?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          Cancel
        </Button>
        <Button bsStyle="danger" onClick={onDiscard}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
