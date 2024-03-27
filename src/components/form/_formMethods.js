import computeIndex from './computations/default/computeIndex';
import computeBalanceArm from './computations/default/computeBalanceArm';
import getAircraftConstantsForType from '../../_services/getAircraftConstantsForType';

function handleFieldChange(event) {
  const { record } = this.state;
  const { value } = event.target;
  const newRecord = Object.assign({}, record);
  newRecord[event.target.name] = value;
  this.setState({ record: newRecord, wasRecordChanged: true });
}

function handleSelectChange(event) {
  const { record } = this.state;
  const { value } = event.target;
  const newRecord = Object.assign({}, record);
  newRecord[event.target.name] = value;
  this.setState({ record: newRecord, wasRecordChanged: true });
}

function handleDateChange(date, fieldKey) {
  const { record } = this.state;
  const newRecord = Object.assign({}, record);
  newRecord[fieldKey] = date;
  this.setState({ record: newRecord, wasRecordChanged: true });
}

function handleRadioChange(event) {
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

function handleAircraftSelectChange(event) {
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

// PER SPECIFIED WEIGHT


// PER UNIT

function setIndexPerUnit(row, indexColumn, balanceArmColumn) {
  const { record, constants } = this.state;
  const newRecord = Object.assign({}, record);

  const weight = 1;
  const balanceArm = newRecord.grid[row][balanceArmColumn].value;
  const { cConstant, referenceStation } = constants;

  if (!weight || !balanceArm || !cConstant || !referenceStation) return;
  newRecord.grid[row][indexColumn].value = computeIndex(
    weight,
    balanceArm,
    cConstant,
    referenceStation,
  );

  this.setState({ record: newRecord });
}

function setBalanceArmPerUnit(row, indexColumn, balanceArmColumn) {
  const { record, constants } = this.state;
  const newRecord = Object.assign({}, record);

  const weight = 1;
  const index = newRecord.grid[row][indexColumn].value;
  const { cConstant, referenceStation } = constants;

  if (!weight || !index || !cConstant || !referenceStation) return;

  if (!weight || !index) return;
  newRecord.grid[row][balanceArmColumn].value = computeBalanceArm(
    weight,
    index,
    cConstant,
    referenceStation,
  );

  this.setState({ record: newRecord });
}

function setIndexPerUnitForAll(indexColumn, balanceArmColumn) {
  const { record, constants } = this.state;
  const newRecord = Object.assign({}, record);

  newRecord.grid.forEach((row, i) => {
    const weight = 1;
    const balanceArm = row[balanceArmColumn].value;
    const { cConstant, referenceStation } = constants;

    if (!weight || !balanceArm || !cConstant || !referenceStation) return;

    newRecord.grid[i][indexColumn].value = computeIndex(
      weight,
      balanceArm,
      cConstant,
      referenceStation,
    );
  });
  this.setState({ record: newRecord });
}

function setBalanceArmPerUnitForAll(indexColumn, balanceArmColumn) {
  const { record, constants } = this.state;
  const newRecord = Object.assign({}, record);

  newRecord.grid.forEach((row, i) => {
    const weight = 1;
    const index = row[indexColumn].value;
    const { cConstant, referenceStation } = constants;

    if (!weight || !index || !cConstant || !referenceStation) return;
    newRecord.grid[i][balanceArmColumn].value = computeBalanceArm(
      weight,
      index,
      cConstant,
      referenceStation,
    );
  });
  this.setState({ record: newRecord });
}

export const formMethods = {
  handleFieldChange,
  handleSelectChange,
  handleDateChange,
  handleRadioChange,
  handleAircraftSelectChange,
  setIndexPerUnit,
  setBalanceArmPerUnit,
  setIndexPerUnitForAll,
  setBalanceArmPerUnitForAll,
};
