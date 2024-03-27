import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Col, ButtonToolbar,
} from 'react-bootstrap';

import { subTableDataActions } from '../../_actions';
import { ValidationBox } from './misc/ValidationBox';
import ModalDraftChanged from './misc/ModalDraftChanged';
import { renderFormFields } from '../../_helpers/renderFormFields';
import { constructRecordProperties } from '../../_helpers/constructRecordProperties';
import { constructDateFocusProperties } from '../../_helpers/constructDateFocusProperties';

class SubTableAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wasRecordChanged: false,
      showModalDraft: false,
    };

    const { table, parentSetId } = props;
    const { fields } = table;
    this.state = constructDateFocusProperties(this.state, fields);
    this.state.record = constructRecordProperties(fields);
    this.state.record.setId = parentSetId; // eslint-disable-line react/destructuring-assignment

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange(event) {
    const { record } = this.state;
    const { value } = event.target;
    const newRecord = Object.assign({}, record);
    newRecord[event.target.name] = value;
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  handleDateChange(date, fieldKey) {
    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord[fieldKey] = date;
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  handleRadioChange(event) {
    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    let value;
    if (event.target.value === 'true') {
      value = true;
    } else {
      value = false;
    }
    newRecord[event.target.name] = value;
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  handleSelectChange(event) {
    const { record } = this.state;
    const { value } = event.target;
    const newRecord = Object.assign({}, record);
    newRecord[event.target.name] = value;
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      dispatch,
      parentTableURL,
      closeModal,
      loadData,
    } = this.props;
    const { record } = this.state;
    dispatch(subTableDataActions.create(record, `${parentTableURL}-mapping`));
    closeModal();
    loadData();
  }

  render() {
    const { props, state } = this;
    const { table, closeModal } = props;
    const { fields } = table;
    const fieldHandlers = {
      string: this.handleFieldChange,
      number: this.handleFieldChange,
      date: this.handleDateChange,
      radioDouble: this.handleRadioChange,
      select: this.handleSelectChange,
    };
    const fieldsToRender = renderFormFields(this, fields, fieldHandlers);
    return (
      <React.Fragment>
        <ModalDraftChanged
          showing={state.showModalDraft}
          onHide={this.handleModalDraftClose}
          onDiscard={this.handleDraftDiscardChanges}
        />
        <Form horizontal onSubmit={this.handleSubmit} className="mapping-fields-expand">
          {fieldsToRender}
          <FormGroup>
            <Col sm={3} />
            <Col sm={9}>
              <ValidationBox />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" disabled={false}>
                  Submit As Draft
                </Button>
                <Button onClick={closeModal} bsStyle="default" type="button">Back</Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </React.Fragment>
    );
  }
}

SubTableAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
  parentSetId: PropTypes.string.isRequired,
  parentTableURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { creating } = state.tableRecord;
  return {
    creating,
  };
}

const connectedSubTableAdd = connect(mapStateToProps)(SubTableAdd);
export { connectedSubTableAdd as SubTableAdd };
