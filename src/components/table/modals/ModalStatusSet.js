import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import ModalRecordRow from './ModalRecordRow';

export default function ModalStatusSet(props) {
  const dummyObj = {
    registration: '',
    setName: '',
    effFrom: '',
    effTo: '',
  };
  const modalCustomizations = {
    active: {
      action: 'activate',
      header: 'Record Activation',
      buttonText: 'Activate',
      buttonStyle: 'primary',
    },
    inactive: {
      action: 'deactivate',
      header: 'Record Deactivation',
      buttonText: 'Deactivate',
      buttonStyle: 'danger',
    },
  };
  const { table } = props;
  const { showing } = props;
  const { onHide } = props;
  const { statusToSet } = props;
  const { setStatus } = props;
  const record = props.record || dummyObj;
  const content = modalCustomizations[statusToSet];
  const tableHeaders = table.fields.map((field) => {
    if (field.fieldType === 'grid') return;
    return <th key={field.fieldKey}>{field.fieldName}</th>;
  });
  return (
    <Modal dialogClassName="modal-wide" show={showing} onHide={onHide} className="modal-wide">
      <Modal.Header closeButton>
        <Modal.Title><strong>{content.header}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to
        <strong>
          &nbsp;
          {content.action}
          &nbsp;
        </strong>
        this record?
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
        <Button bsStyle={content.buttonStyle} onClick={setStatus}>
          {content.buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
