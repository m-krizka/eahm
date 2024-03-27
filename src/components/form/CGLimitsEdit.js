/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Form, ButtonToolbar, Button } from 'react-bootstrap';
import 'react-datasheet/lib/react-datasheet.css';

import { formMethods } from './_formMethods';
import computeMacFromIndex from './computations/cgLimits/computeMacFromIndex';
import computeIndexFromMac from './computations/cgLimits/computeIndexFromMac';

import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';
import parseGridToDB from '../../_helpers/parseGridToDB';
import parseGridFromDB from '../../_helpers/parseGridFromDB';

import Spreadsheet from './cgLimits/Spreadsheet';
import PlanPlaceholder from './cgLimits/PlanPlaceholder';
import constructGrid from './cgLimits/constructGrid';
import assignLimitsType from './cgLimits/assignLimitsType';
import formatLimitsType from './cgLimits/formatLimitsType';

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
  2: 'index',
  3: 'mac',
};

const columns = [
  { name: 'Limits Type', key: 'limitsType' },
  { name: 'Weight', key: 'weight' },
  { name: 'Index', key: 'index' },
  { name: '%MAC', key: '%MAC' },
];

const weightColumn = 1;
const indexColumn = 2;
const macColumn = 3;

const gridFwd = constructGrid(columns);
const gridAft = constructGrid(columns);

class CGLimitsEdit extends React.Component {
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
    newState.record.gridFwd = gridFwd;
    newState.record.gridAft = gridAft;

    this.handleCellsChanged = this.handleCellsChanged.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.setMac = this.setMac.bind(this);
    this.setIndexForAll = this.setIndexForAll.bind(this);
    this.setMacForAll = this.setMacForAll.bind(this);
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

      parsedRecord.gridFwd = formatLimitsType(parsedRecord.gridFwd);
      parsedRecord.gridAft = formatLimitsType(parsedRecord.gridAft);

      parsedRecord.gridFwd = parseGridFromDB(parsedRecord.gridFwd, columns);
      parsedRecord.gridAft = parseGridFromDB(parsedRecord.gridAft, columns);

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

  setIndex(row, type) {
    // type is one of: Fwd, Aft
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);
    const weight = newRecord[`grid${type}`][row][weightColumn].value;
    const MAC = newRecord[`grid${type}`][row][macColumn].value;
    const {
      cConstant,
      kConstant,
      referenceStation,
      lemac,
      lengthOfMAC,
    } = constants;

    if (!MAC || !weight || !cConstant || !kConstant || !referenceStation || !lemac || !lengthOfMAC) return;
    newRecord[`grid${type}`][row][indexColumn].value = computeIndexFromMac({
      MAC,
      weight,
      cConstant,
      kConstant,
      referenceStation,
      lemac,
      lengthOfMAC,
    });

    this.setState({ record: newRecord });
  }

  setMac(row, type) {
    // type is one of: Fwd, Aft
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);
    const weight = newRecord[`grid${type}`][row][weightColumn].value;
    const index = newRecord[`grid${type}`][row][indexColumn].value;
    const {
      cConstant,
      kConstant,
      referenceStation,
      lemac,
      lengthOfMAC,
    } = constants;

    if (!index || !weight || !cConstant || !kConstant || !referenceStation || !lemac || !lengthOfMAC) return;
    newRecord[`grid${type}`][row][macColumn].value = computeMacFromIndex({
      index,
      weight,
      cConstant,
      kConstant,
      referenceStation,
      lemac,
      lengthOfMAC,
    });

    this.setState({ record: newRecord });
  }

  setIndexForAll(type) {
    // type is one of: Fwd, Aft
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);

    newRecord[`grid${type}`].forEach((row, i) => {
      const weight = row[weightColumn].value;
      const MAC = row[macColumn].value;

      const {
        cConstant,
        kConstant,
        referenceStation,
        lemac,
        lengthOfMAC,
      } = constants;
  
      if (!MAC || !weight || !cConstant || !kConstant || !referenceStation || !lemac || !lengthOfMAC) return;
  
      newRecord[`grid${type}`][i][indexColumn].value = computeIndexFromMac({
        MAC,
        weight,
        cConstant,
        kConstant,
        referenceStation,
        lemac,
        lengthOfMAC,
      });
    });
    this.setState({ record: newRecord });
  }

  setMacForAll(type) {
    // type is one of: Fwd, Aft
    const { record, constants } = this.state;
    const newRecord = Object.assign({}, record);

    newRecord[`grid${type}`].forEach((row, i) => {
      const weight = row[weightColumn].value;
      const index = row[indexColumn].value;

      const {
        cConstant,
        kConstant,
        referenceStation,
        lemac,
        lengthOfMAC,
      } = constants;

      if (!index || !weight || !cConstant || !kConstant || !referenceStation || !lemac || !lengthOfMAC) return;

      newRecord[`grid${type}`][i][macColumn].value = computeMacFromIndex({
        index,
        weight,
        cConstant,
        kConstant,
        referenceStation,
        lemac,
        lengthOfMAC,
      });
    });
    this.setState({ record: newRecord });
  }

  handleCellsChanged(changes, type) {
    // type can be one of: Fwd, Aft

    const { record } = this.state;

    const grid = record[`grid${type}`].map(row => [...row]);

    changes.forEach(({ row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    const newRecord = Object.assign({}, record);
    newRecord[`grid${type}`] = grid;
    this.setState({ record: newRecord });
  }

  addRow() {
    // Both grids have equal number of rows

    const { record } = this.state;
    const newRecord = Object.assign({}, record);

    const rowNumAbove = newRecord.gridFwd[gridFwd.length - 1]
      ? newRecord.gridFwd[newRecord.gridFwd.length - 1][0].value
      : 0;
    const newRowNum = rowNumAbove + 1;

    const newRow = [];
    for (let i = 0; i < columns.length; i += 1) {
      newRow.push({ value: null });
    }

    newRecord.gridFwd.push(newRow);
    newRecord.gridAft.push(newRow);

    this.setState({ record: newRecord });
  }

  removeRow(index) {
    // Both grids have equal number of rows

    const { record } = this.state;
    const newRecord = Object.assign({}, record);
    newRecord.gridFwd.splice(index, 1);
    newRecord.gridAft.splice(index, 1);
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
    parsedRecord.gridFwd = parseGridToDB(record.gridFwd, columns);
    parsedRecord.gridAft = parseGridToDB(record.gridAft, columns);

    parsedRecord.gridFwd = assignLimitsType(parsedRecord.gridFwd);
    parsedRecord.gridAft = assignLimitsType(parsedRecord.gridAft);

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
    const { gridFwd, gridAft } = record;

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

                  gridFwd={gridFwd}
                  gridAft={gridAft}

                  handleCellsChanged={this.handleCellsChanged}
                  setIndex={this.setIndex}
                  setMac={this.setMac}
                  setIndexForAll={this.setIndexForAll}
                  setMacForAll={this.setMacForAll}
                  addRow={this.addRow}
                  removeRow={this.removeRow}
                />
                <PlanPlaceholder />
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

CGLimitsEdit.prototype.handleFieldChange = formMethods.handleFieldChange;
CGLimitsEdit.prototype.handleSelectChange = formMethods.handleSelectChange;
CGLimitsEdit.prototype.handleDateChange = formMethods.handleDateChange;
CGLimitsEdit.prototype.handleRadioChange = formMethods.handleRadioChange;
CGLimitsEdit.prototype.handleAircraftSelectChange = formMethods.handleAircraftSelectChange;

function mapStateToProps(state) {
  const { tableRecord } = state;
  return {
    tableRecord,
  };
}

const connectedCGLimitsEdit = connect(mapStateToProps)(CGLimitsEdit);
export { connectedCGLimitsEdit as CGLimitsEdit };
