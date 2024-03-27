/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Form, ButtonToolbar, Button } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

import { formMethods } from './_formMethods';

import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';
import parseGridToDB from '../../_helpers/parseGridToDB';
import parseGridFromDB from '../../_helpers/parseGridFromDB';

import Spreadsheet from './galleys/Spreadsheet';
import PlanPlaceholder from './galleys/PlanPlaceholder';
import constructGrid from './galleys/constructGrid';

import { history } from '../../_helpers';
import ModalDraftChanged from './misc/ModalDraftChanged';
import { getCollectionFromUrl } from '../../_helpers/getCollectionFromUrl';

import { renderFormFields } from '../../_helpers/renderFormFields';
import { constructRecordProperties } from '../../_helpers/constructRecordProperties';
import { constructDateFocusProperties } from '../../_helpers/constructDateFocusProperties';
import { tableDataActions } from '../../_actions/tableData.actions';

// Specify cell types for each column
const cellsConfig = {
  0: 'standard',
  1: 'standard',
  2: 'standard',
  3: 'balanceArm',
  4: 'index',
};

const columns = [
  { name: 'Type', key: 'type' },
  { name: 'Description', key: 'description' },
  { name: 'Max Weight', key: 'maxWeight' },
  { name: 'Balance Arm', key: 'balanceArm' },
  { name: 'Index/kg', key: 'indexPerKg' },
];

const balanceArmColumn = 3;
const indexColumn = 4;

const grid = constructGrid(columns);

class GalleysEdit extends React.Component {
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

    const rowNumAbove = newRecord.grid[grid.length - 1]
      ? newRecord.grid[newRecord.grid.length - 1][0].value
      : 0;
    const newRowNum = rowNumAbove + 1;

    const newRow = [];
    for (let i = 0; i < columns.length; i += 1) {
      newRow.push({ value: null });
    }

    newRecord.grid.push(newRow);
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
                <Spreadsheet
                  cellsConfig={cellsConfig}
                  columns={columns}
                  grid={grid}
                  handleCellsChanged={this.handleCellsChanged}
                  setIndexPerUnitForAll={this.setIndexPerUnitForAll}
                  setBalanceArmPerUnitForAll={this.setBalanceArmPerUnitForAll}
                  setIndexPerUnit={this.setIndexPerUnit}
                  setBalanceArmPerUnit={this.setBalanceArmPerUnit}
                  addRow={this.addRow}
                  removeRow={this.removeRow}
                  indexColumn={indexColumn}
                  balanceArmColumn={balanceArmColumn}
                />
                <PlanPlaceholder
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

GalleysEdit.prototype.handleFieldChange = formMethods.handleFieldChange;
GalleysEdit.prototype.handleSelectChange = formMethods.handleSelectChange;
GalleysEdit.prototype.handleDateChange = formMethods.handleDateChange;
GalleysEdit.prototype.handleRadioChange = formMethods.handleRadioChange;
GalleysEdit.prototype.handleAircraftSelectChange = formMethods.handleAircraftSelectChange;
GalleysEdit.prototype.setIndexPerUnit = formMethods.setIndexPerUnit;
GalleysEdit.prototype.setBalanceArmPerUnit = formMethods.setBalanceArmPerUnit;
GalleysEdit.prototype.setIndexPerUnitForAll = formMethods.setIndexPerUnitForAll;
GalleysEdit.prototype.setBalanceArmPerUnitForAll = formMethods.setBalanceArmPerUnitForAll;

function mapStateToProps(state) {
  const { tableRecord } = state;
  return {
    tableRecord,
  };
}

const connectedGalleysEdit = connect(mapStateToProps)(GalleysEdit);
export { connectedGalleysEdit as GalleysEdit };
