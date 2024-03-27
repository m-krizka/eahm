import React from 'react';

import { TableAdd } from '../form/TableAdd';

import { TableEdit } from '../form/TableEdit';
import { TableList } from '../table/TableList';
import { TableListCollapsible } from '../table/TableListCollapsible';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { PassengerSeatsAdd } from '../form/PassengerSeatsAdd';
import { PassengerSeatsEdit } from '../form/PassengerSeatsEdit';

import { FuelDataAdd } from '../form/FuelDataAdd';
import { FuelDataEdit } from '../form/FuelDataEdit';

import { CargoHoldsAdd } from '../form/CargoHoldsAdd';
import { CargoHoldsEdit } from '../form/CargoHoldsEdit';

import { CGLimitsAdd } from '../form/CGLimitsAdd';
import { CGLimitsEdit } from '../form/CGLimitsEdit';

import { CrewSeatsAdd } from '../form/CrewSeatsAdd';
import { CrewSeatsEdit } from '../form/CrewSeatsEdit';

import { GalleysAdd } from '../form/GalleysAdd';
import { GalleysEdit } from '../form/GalleysEdit';

import { PotableWaterAdd } from '../form/PotableWaterAdd';
import { PotableWaterEdit } from '../form/PotableWaterEdit';

import { StabiliserTrimAdd } from '../form/StabiliserTrimAdd';
import { StabiliserTrimEdit } from '../form/StabiliserTrimEdit';

export const tableTypes = {
  defaultTable: {
    addForm: (props, table) => <TableAdd {...props} table={table} />,
    editForm: (props, table) => <TableEdit {...props} table={table} />,
    tableList: (props, table) => <TableList {...props} table={table} />,
  },
  collapsibleTable: {
    addForm: (props, table) => <TableAdd {...props} table={table} />,
    editForm: (props, table) => <TableEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  cabinTable: {
    addForm: (props, table) => <PassengerSeatsAdd {...props} table={table} />,
    editForm: (props, table) => <PassengerSeatsEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  fuelTanksTable: {
    addForm: (props, table) => <FuelDataAdd {...props} table={table} />,
    editForm: (props, table) => <FuelDataEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  cargoHoldsTable: {
    addForm: (props, table) => <CargoHoldsAdd {...props} table={table} />,
    editForm: (props, table) => <CargoHoldsEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  cgLimitsTable: {
    addForm: (props, table) => <CGLimitsAdd {...props} table={table} />,
    editForm: (props, table) => <CGLimitsEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  crewSeatsTable: {
    addForm: (props, table) => <CrewSeatsAdd {...props} table={table} />,
    editForm: (props, table) => <CrewSeatsEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  galleysTable: {
    addForm: (props, table) => <GalleysAdd {...props} table={table} />,
    editForm: (props, table) => <GalleysEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  potableWaterTable: {
    addForm: (props, table) => <PotableWaterAdd {...props} table={table} />,
    editForm: (props, table) => <PotableWaterEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
  stabiliserTrimTable: {
    addForm: (props, table) => <StabiliserTrimAdd {...props} table={table} />,
    editForm: (props, table) => <StabiliserTrimEdit {...props} table={table} />,
    tableList: (props, table) => <TableListCollapsible {...props} table={table} />,
  },
};

tableTypes.defaultTable.propTypes = {
};
