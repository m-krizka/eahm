/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import BalanceArmTableHead from './BalanceArmTableHead';
import IndexTableHead from './IndexTableHead';

import { cellTypes } from './cellTypes';

import ColDesigTooltip from './ColDesignTooltip';

export default function Spreadsheet(props) {
  const {
    cellsConfig,
    columns,
    grid,
    handleCellsChanged,
    setIndexPerUnitForAll,
    setBalanceArmPerUnitForAll,
    setIndexPerUnit,
    setBalanceArmPerUnit,
    addRow,
    removeRow,
    indexColumn,
    balanceArmColumn,
  } = props;

  return (
    <div style={{ marginTop: '2px' }}>
      <br />
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        onCellsChanged={handleCellsChanged}
        sheetRenderer={props => (
          <div style={{ width: '100% !important' }}>
            <table className={`${props.className} cabin-table`}>
              <thead>
                <tr>
                  {columns.map((col) => {
                    const toRenderColDesignatorsTooltip = col.name === 'Col. designators';
                    if (col.name === 'Balance Arm') {
                      return (
                        <BalanceArmTableHead
                          key={col.name}
                          setIndexPerUnitForAll={setIndexPerUnitForAll}
                          indexColumn={indexColumn}
                          balanceArmColumn={balanceArmColumn}
                        >
                          {col.name}
                        </BalanceArmTableHead>
                      );
                    }
                    if (col.name === 'Index/kg') {
                      return (
                        <IndexTableHead
                          key={col.name}
                          setBalanceArmPerUnitForAll={setBalanceArmPerUnitForAll}
                          indexColumn={indexColumn}
                          balanceArmColumn={balanceArmColumn}
                        >
                          {col.name}
                        </IndexTableHead>
                      );
                    }
                    return (
                      <th key={col.name} className="cabin-th">
                        {col.name}
                        {toRenderColDesignatorsTooltip && <ColDesigTooltip />}
                      </th>
                    );
                  })}
                  <th style={{ width: '0px' }} />
                </tr>
              </thead>
              <tbody className="cabin-tbody">
                {props.children}
              </tbody>
            </table>
            <Button onClick={addRow} className="cabin-table-btn">
              <Glyphicon style={{ fontSize: '12px' }} glyph="plus" />
              &nbsp;&nbsp;Add Row
            </Button>
          </div>
        )}
        cellRenderer={(props) => {
          const { col } = props;
          const cellType = cellsConfig[col];

          const extendedProps = {
            setIndexPerUnit,
            setBalanceArmPerUnit,
            indexColumn,
            balanceArmColumn,
            ...props,
          };

          return cellTypes[cellType](extendedProps);
        }}
        rowRenderer={(props) => {
          const { row, children } = props;
          return (
            <React.Fragment>
              <tr style={{ paddingRight: '20px' }} className="cabin-tr">
                {children}
                <td className="td-hidden">
                  <span style={{ float: 'right', marginRight: '-1.7em', fontWeight: 'bold' }}>
                    <button onClick={() => removeRow(row)} type="button" className="cabin-table-remove-btn"><Glyphicon glyph="remove" /></button>
                  </span>
                </td>
              </tr>
            </React.Fragment>
          );
        }}
      />
    </div>
  );
}

Spreadsheet.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellsChanged: PropTypes.func.isRequired,
  setIndexPerUnitForAll: PropTypes.func.isRequired,
  setBalanceArmPerUnitForAll: PropTypes.func.isRequired,
  setIndexPerUnit: PropTypes.func.isRequired,
  setBalanceArmPerUnit: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};
