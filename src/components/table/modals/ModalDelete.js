import React from 'react';
import {
  Modal,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Glyphicon,
} from 'react-bootstrap';
import ModalRecordRow from './ModalRecordRow';

export default function DeletionModal(props) {
  const dummyObj = {
    registration: '',
    setName: '',
    effFrom: '',
    effTo: '',
  };
  const { table } = props;
  const { showing } = props;
  const { onHide } = props;
  const { handleDelete } = props;
  const { handleClose } = props;
  const content = { action: 'delete' };
  const record = props.record || dummyObj;
  const tableHeaders = table.fields.map((field) => {
    if (field.fieldType === 'grid') return;
    return <th key={field.fieldKey}>{field.fieldName}</th>;
  });
  return (
    <Modal dialogClassName="modal-wide" show={showing} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Record Deletion</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to
        <strong>
          &nbsp;
          {content.action}
          &nbsp;
        </strong>
        this record?
        &nbsp;
        <OverlayTrigger
          placement="right"
          overlay={
            (
              <Tooltip id="tooltip_3">
                This action cannot be undone
              </Tooltip>
            )
          }
        >
          <Glyphicon glyph="warning-sign tooltip-danger" />
        </OverlayTrigger>
        <p />
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            <ModalRecordRow
              {...props}
              key={record._id}
              record={record}
            />
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          Cancel
        </Button>
        <Button bsStyle="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
