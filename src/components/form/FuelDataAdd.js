/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Form, ButtonToolbar, Button } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

import computeIndex from './computations/default/computeIndex';
import computeBalanceArm from './computations/default/computeBalanceArm';
import computeFuelVolumeFromWeight from './computations/fuel/computeFuelVolumeFromWeight';
import computeFuelWeightFromVolume from './computations/fuel/computeFuelWeightFromVolume';

import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';
import parseGridToDB from '../../_helpers/parseGridToDB';

import { history } from '../../_helpers';
import ModalDraftChanged from './misc/ModalDraftChanged';
import { getCollectionFromUrl } from '../../_helpers/getCollectionFromUrl';

import FuelTanksSpreadsheet from './fuelTanks/FuelTanksSpreadsheet';
import FuelDataChart from './fuelTanks/FuelDataChart';
import { grid } from './fuelTanks/grid';

import { renderFormFields } from '../../_helpers/renderFormFields';
import { constructRecordProperties } from '../../_helpers/constructRecordProperties';
import { constructDateFocusProperties } from '../../_helpers/constructDateFocusProperties';
import { tableDataActions } from '../../_actions/tableData.actions';

const columns = [
  { name: 'Volume', key: 'volume' },
  { name: 'Balance Arm', key: 'balanceArm' },
  { name: 'Index', key: 'index' },
  { name: 'Weight', key: 'weight' },
];

class FuelDataAdd extends React.Component {
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
    newState.record['grid'] = grid;
    this.state = newState;

    this.handleCellsChanged = this.handleCellsChanged.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.setBalanceArm = this.setBalanceArm.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.setIndexForAll = this.setIndexForAll.bind(this);
    this.setBalanceArmForAll = this.setBalanceArmForAll.bind(this);
    this.setVolumeForAll = this.setVolumeForAll.bind(this);
    this.setWeightForAll = this.setWeightForAll.bind(this);
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

    const rowNumAbove = newRecord.grid[grid.length - 1]
      ? newRecord.grid[newRecord.grid.length - 1][0].value
      : 0;
    const newRowNum = rowNumAbove + 1;
    newRecord.grid.push([
      { value: null },
      { value: null },
      { value: null },
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

  setIndex(row) {
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);

    const weight = newRecord.grid[row][3].value;
    const balanceArm = newRecord.grid[row][1].value;
    const { cConstant, referenceStation } = constants;

    if (!weight || !balanceArm || !cConstant || !referenceStation) return;
    newRecord.grid[row][2].value = computeIndex(weight, balanceArm, cConstant, referenceStation);
    this.setState({ record: newRecord });
  } 

  setBalanceArm(row) {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    const weight = newRecord.grid[row][3].value;
    const index = newRecord.grid[row][2].value;
    const { cConstant, referenceStation } = constants;

    if (!weight || !index || !cConstant || !referenceStation || !FDCalcAt) return;
    newRecord.grid[row][1].value = computeBalanceArm(weight, index, cConstant, referenceStation);
    this.setState({ record: newRecord });
  }

  setVolume(row) {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    const weight = newRecord.grid[row][3].value;
    const { cConstant, referenceStation } = constants;

    if (!weight || !FDCalcAt || !cConstant || !referenceStation) return;
    newRecord.grid[row][0].value = computeFuelVolumeFromWeight(weight, FDCalcAt);
    this.setState({ record: newRecord });
  }

  setWeight(row) {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    const volume = newRecord.grid[row][0].value;
    const { cConstant, referenceStation } = constants;

    if (!volume || !FDCalcAt || !cConstant || !referenceStation) return;
    newRecord.grid[row][3].value = computeFuelWeightFromVolume(volume, FDCalcAt);
    this.setState({ record: newRecord });
  }

  setIndexForAll() {
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);

    newRecord.grid.forEach((row, i) => {
      const weight = row[3].value;
      const balanceArm = row[1].value;
      const { cConstant, referenceStation } = constants;

      if (!weight || !balanceArm || !cConstant || !referenceStation) return;
      newRecord.grid[i][2].value = computeIndex(weight, balanceArm, cConstant, referenceStation);
    });
    this.setState({ record: newRecord });
  }

  setBalanceArmForAll() {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    newRecord.grid.forEach((row, i) => {
      const weight = row[3].value;
      const index = row[2].value;
      const { cConstant, referenceStation } = constants;

      if (!weight || !index || !cConstant || !referenceStation || !FDCalcAt) return;
      newRecord.grid[i][1].value = computeBalanceArm(weight, index, cConstant, referenceStation);
    });
    this.setState({ record: newRecord });
  }

  setVolumeForAll() {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    newRecord.grid.forEach((row, i) => {
      const weight = row[3].value;
      const { cConstant, referenceStation } = constants;

      if (!weight || !FDCalcAt || !cConstant || !referenceStation) return;
      newRecord.grid[i][0].value = computeFuelVolumeFromWeight(weight, FDCalcAt);
    });
    this.setState({ record: newRecord });
  }

  setWeightForAll() {
    const { record, constants } = this.state;
    const { FDCalcAt } = record;
    const newRecord = Object.assign({}, record);

    newRecord.grid.forEach((row, i) => {
      const volume = row[0].value;
      const { cConstant, referenceStation } = constants;

      if (!volume || !FDCalcAt || !cConstant || !referenceStation) return;
      newRecord.grid[i][3].value = computeFuelWeightFromVolume(volume, FDCalcAt);
    });
    this.setState({ record: newRecord });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, table } = this.props;
    const { record } = this.state;

    const parsedRecord = { ...record };
    parsedRecord.grid = parseGridToDB(record.grid, columns);

    dispatch(tableDataActions.create(parsedRecord, table.url));
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
    const cleanGrid = grid.filter(row => row[0].value || row[1].value || row[2].value || row[3].value);

    const balanceArmValues = cleanGrid.map(row => Number(row[1].value));
    const volumeValues = cleanGrid.map(row => Number(row[0].value));

    const indexValues = cleanGrid.map(row => Number(row[2].value));
    const weightValues = cleanGrid.map(row => Number(row[3].value));
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
              {/* CSS Grid below; 1st column spreadsheet, 2nd column seat plan */}
              <div
                className="cabin-edit-layout"
              >
                <FuelTanksSpreadsheet
                  grid={grid}
                  handleCellsChanged={this.handleCellsChanged}
                  setIndexForAll={this.setIndexForAll}
                  setBalanceArmForAll={this.setBalanceArmForAll}
                  setVolumeForAll={this.setVolumeForAll}
                  setWeightForAll={this.setWeightForAll}
                  setIndex={this.setIndex}
                  setBalanceArm={this.setBalanceArm}
                  setVolume={this.setVolume}
                  setWeight={this.setWeight}
                  addRow={this.addRow}
                  removeRow={this.removeRow}
                />
                <div>
                  <FuelDataChart
                    title="Volume/Balance Arm"
                    grid={cleanGrid}
                    xValues={balanceArmValues}
                    yValues={volumeValues}
                  />
                  <FuelDataChart
                    title="Weight/Index"
                    grid={cleanGrid}
                    xValues={indexValues}
                    yValues={weightValues}
                  />
                </div>
              </div>
              <br />
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" disabled={false}>
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

function mapStateToProps(state) {
  const { tableRecord } = state;
  return {
    tableRecord,
  };
}

const connectedFuelDataAdd = connect(mapStateToProps)(FuelDataAdd);
export { connectedFuelDataAdd as FuelDataAdd };
