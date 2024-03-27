/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Form, ButtonToolbar, Button } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';
import parseGridToDB from '../../_helpers/parseGridToDB';
import parseGridFromDB from '../../_helpers/parseGridFromDB';

import CabinSpreadsheet from './passengerSeats/Spreadsheet';
import CabinPlan from './passengerSeats/Plan';

import { formMethods } from './_formMethods';

import { history } from '../../_helpers';
import ModalDraftChanged from './misc/ModalDraftChanged';
import { getCollectionFromUrl } from '../../_helpers/getCollectionFromUrl';

import { renderFormFields } from '../../_helpers/renderFormFields';
import { constructRecordProperties } from '../../_helpers/constructRecordProperties';
import { constructDateFocusProperties } from '../../_helpers/constructDateFocusProperties';
import { tableDataActions } from '../../_actions/tableData.actions';

const columns = [
  { name: 'Row nr.', key: 'rowNumber' },
  { name: 'Cabin section', key: 'cabinSection' },
  { name: 'Balance Arm', key: 'balanceArm' },
  { name: 'Index/kg', key: 'indexPerKg' },
  { name: 'Nr. of seats', key: 'numberOfSeats' },
  { name: 'Max weight/seat', key: 'maxWeightPerSeat' },
];

class PassengerSeatsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // Add grid property to this.state.record
    const newState = Object.assign({}, this.state);
    newState.record.grid = [];
    this.state = newState;

    this.handleCellsChanged = this.handleCellsChanged.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.setIndexPerUnit = this.setIndexPerUnit.bind(this);
    this.setBalanceArmPerUnit = this.setBalanceArmPerUnit.bind(this);
    this.setIndexPerUnitForAll = this.setIndexPerUnitForAll.bind(this);
    this.setBalanceArmPerUnitForAll = this.setBalanceArmPerUnitForAll.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAircraftSelectChange = this.handleAircraftSelectChange.bind(this);
    this.handleModalDraftShow = this.handleModalDraftShow.bind(this);
    this.handleModalDraftClose = this.handleModalDraftClose.bind(this);
    this.handleDraftDiscardChanges = this.handleDraftDiscardChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, match, table } = this.props;
    const { id } = match.params;
    dispatch(tableDataActions.getById(id, table.url)).then(() => {
      const { tableRecord } = this.props;
      const record = tableRecord.item;

      const parsedRecord = { ...record };
      parsedRecord.grid = parseGridFromDB(record.grid, columns);

      this.setState({ record: parsedRecord }, () => {
        getAircraftConstantsForType(parsedRecord.aircraftType).then((data) => {
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

  handleCellsChanged(changes) {
    const grid = this.state.record.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    const newRecord = Object.assign({}, this.state.record);
    newRecord['grid'] = grid;
    this.setState({ record: newRecord });
  }

  addRow() {
    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    const { grid } = newRecord;
    const rowNumAbove = newRecord.grid[grid.length - 1]
      ? newRecord.grid[newRecord.grid.length - 1][0].value
      : 0;
    const newRowNum = rowNumAbove + 1;
    newRecord.grid.push([
      { value: newRowNum },
      { value: '' },
      { value: null },
      { value: null },
      { value: null },
      { value: '' },
      { value: null },
    ]);
    this.setState({ record: newRecord });
  }

  removeRow(index) {
    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.grid.splice(index, 1);
    this.setState({ record: newRecord });
  }

  handleModalDraftShow() {
    const { wasRecordChanged } = this.state;
    const { match } = this.props;
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
    const { match } = (this.props);
    const collection = getCollectionFromUrl(match.url);
    this.handleModalDraftClose();
    history.push(`/${collection}/draft`);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, table } = this.props;
    const { record } = this.state;

    const parsedRecord = { ...record };
    parsedRecord.grid = parseGridToDB(record.grid, columns);

    dispatch(tableDataActions.update(parsedRecord, table.url));
  }

  render() {
    const { props, state } = this;
    const { table } = props;
    const { fields } = table;
    const fieldHandlers = {
      string: this.handleFieldChange,
      number: this.handleFieldChange,
      date: this.handleDateChange,
      radioDouble: this.handleRadioChange,
      select: this.handleSelectChange,
      aircraftSelect: this.handleAircraftSelectChange,
      aircraftConstantsSelect: this.handleAircraftSelectChange,
    };
    const renderedFields = renderFormFields(this, fields, fieldHandlers);

    const { record } = state;
    const { grid } = record;
    return (
      <React.Fragment>
        <ModalDraftChanged
          showing={state.showModalDraft}
          onHide={this.handleModalDraftClose}
          onDiscard={this.handleDraftDiscardChanges}
        />
        <Panel>
          <Panel.Heading>
            <Panel.Title>Add Record</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              {renderedFields}
              <div
                className="cabin-edit-layout"
              >
                <CabinSpreadsheet
                  grid={grid}
                  handleCellsChanged={this.handleCellsChanged}
                  setIndexPerUnitForAll={this.setIndexPerUnitForAll}
                  setBalanceArmPerUnitForAll={this.setBalanceArmPerUnitForAll}
                  setIndexPerUnit={this.setIndexPerUnit}
                  setBalanceArmPerUnit={this.setBalanceArmPerUnit}
                  addRow={this.addRow}
                  removeRow={this.removeRow}
                />
                <CabinPlan
                  grid={grid}
                />
              </div>
              <br />
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.handleSubmit} disabled={false}>
                  Submit As Draft
                </Button>
                <Button onClick={this.handleModalDraftShow} bsStyle="default" type="button" disabled={false}>Back</Button>
              </ButtonToolbar>
            </Form>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}

PassengerSeatsEdit.prototype.handleFieldChange = formMethods.handleFieldChange;
PassengerSeatsEdit.prototype.handleSelectChange = formMethods.handleSelectChange;
PassengerSeatsEdit.prototype.handleDateChange = formMethods.handleDateChange;
PassengerSeatsEdit.prototype.handleRadioChange = formMethods.handleRadioChange;
PassengerSeatsEdit.prototype.handleAircraftSelectChange = formMethods.handleAircraftSelectChange;
PassengerSeatsEdit.prototype.setIndexPerUnit = formMethods.setIndexPerUnit;
PassengerSeatsEdit.prototype.setBalanceArmPerUnit = formMethods.setBalanceArmPerUnit;
PassengerSeatsEdit.prototype.setIndexPerUnitForAll = formMethods.setIndexPerUnitForAll;
PassengerSeatsEdit.prototype.setBalanceArmPerUnitForAll = formMethods.setBalanceArmPerUnitForAll;

function mapStateToProps(state) {
  const { tableRecord } = state;
  return {
    tableRecord,
  };
}

const connectedPassengerSeatsEdit = connect(mapStateToProps)(PassengerSeatsEdit);
export { connectedPassengerSeatsEdit as PassengerSeatsEdit };
