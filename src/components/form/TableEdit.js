import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FormGroup, ButtonToolbar, Button, Panel, Form, Col,
} from 'react-bootstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { tableDataActions } from '../../_actions/tableData.actions';
import { ValidationBox } from './misc/ValidationBox';

import { history } from '../../_helpers';

import FormLoader from './misc/FormLoader';
import ModalDraftChanged from './misc/ModalDraftChanged';
import { renderFormFields } from '../../_helpers/renderFormFields';
import { constructRecordProperties } from '../../_helpers/constructRecordProperties';
import { constructDateFocusProperties } from '../../_helpers/constructDateFocusProperties';
import { getCollectionFromUrl } from '../../_helpers/getCollectionFromUrl';

import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';
import computeIndex from './computations/default/computeIndex';
import computeBalanceArm from './computations/default/computeBalanceArm';
import getAircraftConstantsForRegistration from '../../_services/getAircraftConstantsForRegistration';
import computeBasicIndex from './computations/bw-bi/computeBasicIndex';
import computeBasicBalanceArm from './computations/bw-bi/computeBasicBalanceArm';

class TableEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wasRecordChanged: false,
      showModalDraft: false,
      constants: {
        referenceStation: null,
        kConstant: null,
        cConstant: null,
        lengthOfMAC: null,
        lemac: null,
      },
    };

    const { table } = props;
    const { fields } = table;
    this.state = constructDateFocusProperties(this.state, fields);
    this.state.record = constructRecordProperties(fields);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAircraftSelectChange = this.handleAircraftSelectChange.bind(this);
    this.handleRegistrationSelectChange = this.handleRegistrationSelectChange.bind(this);
    this.handleSetFocus = this.handleSetFocus.bind(this);
    this.handleModalDraftShow = this.handleModalDraftShow.bind(this);
    this.handleModalDraftClose = this.handleModalDraftClose.bind(this);
    this.handleDraftDiscardChanges = this.handleDraftDiscardChanges.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.setBalanceArm = this.setBalanceArm.bind(this);
    this.setBasicIndex = this.setBasicIndex.bind(this);
    this.setBasicBalanceArm = this.setBasicBalanceArm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, match, table } = this.props;
    const { id } = match.params;
    dispatch(tableDataActions.getById(id, table.url)).then(() => {
      const { tableRecord } = this.props;
      const record = tableRecord.item;
      this.setState({ record }, () => {
        const { record } = this.state;
        const { registration } = record;
        console.log(registration);
        getAircraftConstantsForRegistration(registration).then((data) => {
          const {
            referenceStation,
            kConstant,
            cConstant,
            lengthOfMAC,
            lemac,
          } = data;
          const newState = Object.assign({}, this.state);

          newState.constants.referenceStation = referenceStation;
          newState.constants.kConstant = kConstant;
          newState.constants.cConstant = cConstant;
          newState.constants.lengthOfMAC = lengthOfMAC;
          newState.constants.lemac = lemac;

          this.setState(newState);
        });
      });
    });
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

  handleAircraftSelectChange(event) {
    event.persist();
    const { value } = event.target;
    const { state } = this;
    getAircraftConstantsForType(value).then((data) => {
      const {
        referenceStation,
        kConstant,
        cConstant,
        lengthOfMAC,
        lemac,
      } = data;
      const newState = Object.assign({}, state);

      newState.record[event.target.name] = value;

      newState.constants.referenceStation = referenceStation;
      newState.constants.kConstant = kConstant;
      newState.constants.cConstant = cConstant;
      newState.constants.lengthOfMAC = lengthOfMAC;
      newState.constants.lemac = lemac;

      this.setState(newState);
    });
  }

  handleRegistrationSelectChange(event) {
    event.persist();
    const { state } = this;
    const { value } = event.target;
    getAircraftConstantsForRegistration(value).then((data) => {
      const {
        referenceStation,
        kConstant,
        cConstant,
        lengthOfMAC,
        lemac,
      } = data;
      const newState = Object.assign({}, state);
      newState.record[event.target.name] = value;

      newState.constants.referenceStation = referenceStation;
      newState.constants.kConstant = kConstant;
      newState.constants.cConstant = cConstant;
      newState.constants.lengthOfMAC = lengthOfMAC;
      newState.constants.lemac = lemac;

      this.setState(newState);
    });
  }

  handleSetFocus(focusedInput, fieldKey) {
    const { state } = this;
    const newState = Object.assign({}, state);
    newState[`${fieldKey}Focus`] = focusedInput;
    this.setState(newState);
  }

  handleModalDraftShow() {
    const { wasRecordChanged } = this.state;
    const { match } = (this.props);
    const collection = getCollectionFromUrl(match.url);
    if (wasRecordChanged) {
      this.setState({
        showModalDraft: true,
      });
    } else {
      history.push(`/${collection}/draft`);
    }
  }

  handleModalDraftClose() {
    this.setState({
      showModalDraft: false,
    });
  }

  handleDraftDiscardChanges() {
    this.handleModalDraftClose();
    history.push('/maxweights/draft');
  }

  setIndex(weight, balanceArm) {
    if (!weight || !balanceArm || weight === 0 || balanceArm === 0) return;

    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.index = computeIndex(weight, balanceArm);
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  setBalanceArm(weight, index) {
    if (!weight || !index || weight === 0 || index === 0) return;

    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.balanceArm = computeBalanceArm(weight, index);
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  setBasicIndex(basicWeight, basicBalanceArm) {
    if (!basicWeight || !basicBalanceArm || basicWeight === 0 || basicBalanceArm === 0) return;
    const { constants } = this.state;
    const { kConstant, cConstant, referenceStation } = constants;
    // Check if all contants are present

    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.basicIndex = computeBasicIndex(
      basicWeight,
      basicBalanceArm,
      kConstant,
      cConstant,
      referenceStation,
    );
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  setBasicBalanceArm(basicWeight, basicIndex) {
    if (!basicWeight || !basicIndex || basicWeight === 0 || basicIndex === 0) return;

    const { constants } = this.state;
    const { kConstant, cConstant, referenceStation } = constants;
    // Check if all contants are present
    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.basicBalanceArm = computeBasicBalanceArm(
      basicIndex,
      basicWeight,
      kConstant,
      cConstant,
      referenceStation,
    );
    this.setState({ record: newRecord, wasRecordChanged: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, table } = this.props;
    const { record } = this.state;
    dispatch(tableDataActions.update(record, table.url));
  }

  render() {
    const { props, state } = this;
    const { tableRecord } = props;
    const { table } = props;
    const { fields } = table;
    const fieldHandlers = {
      string: this.handleFieldChange,
      number: this.handleFieldChange,
      date: this.handleDateChange,
      radioDouble: this.handleRadioChange,
      select: this.handleSelectChange,
      aircraftSelect: this.handleSelectChange,
      aircraftConstantsSelect: this.handleAircraftSelectChange,
      registrationSelect: this.handleRegistrationSelectChange,
    };
    const renderedFields = renderFormFields(this, fields, fieldHandlers);
    return (
      tableRecord.item
        ? (
          <div>
            <ModalDraftChanged
              showing={state.showModalDraft}
              onHide={this.handleModalDraftClose}
              onDiscard={this.handleDraftDiscardChanges}
            />
            <Panel>
              <Panel.Heading>
                <Panel.Title>Edit Record</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal onSubmit={this.handleSubmit}>
                  {renderedFields}
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
                        <Button onClick={this.handleModalDraftShow} bsStyle="default" type="button" disabled={false}>Back</Button>
                      </ButtonToolbar>
                    </Col>
                  </FormGroup>
                </Form>
              </Panel.Body>
            </Panel>
          </div>
        )
        : <FormLoader />
    );
  }
}

TableEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  table: PropTypes.object.isRequired,
  tableRecord: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { tableRecord } = state;
  return {
    tableRecord,
  };
}

const connectedTableEdit = connect(mapStateToProps)(TableEdit);
export { connectedTableEdit as TableEdit };
