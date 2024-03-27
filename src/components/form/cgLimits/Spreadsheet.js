/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import MacTableHead from './MacTableHead';
import IndexTableHead from './IndexTableHead';

import { cellTypes } from './cellTypes';

export default function Spreadsheet(props) {
  const {
    cellsConfig,
    columns,
    gridFwd,
    gridAft,
    handleCellsChanged,
    setIndexForAll,
    setMacForAll,
    setMac,
    setIndex,
    addRow,
    removeRow,
  } = props;

  return (
    <div style={{ marginTop: '2px' }}>
      <br />
      {/* Two DataSheets side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 20px auto' }}>
        <div>
          <div className="cg-limits-table-head-upper">
            FWD
          </div>
          <ReactDataSheet
            data={gridFwd}
            valueRenderer={cell => cell.value}
            onCellsChanged={(changes) => { handleCellsChanged(changes, 'Fwd'); }}
            sheetRenderer={props => (
              <div style={{ width: '100% !important' }}>
                <table className={`${props.className} cabin-table`}>
                  <thead>
                    <tr>
                      {columns.map((col) => {
                        if (col.name === '%MAC') {
                          return (
                            <MacTableHead
                              type="Fwd"
                              key={col.name}
                              setIndexForAll={setIndexForAll}
                            >
                              {col.name}
                            </MacTableHead>
                          );
                        }
                        if (col.name === 'Index') {
                          return (
                            <IndexTableHead
                              type="Fwd"
                              key={col.name}
                              setMacForAll={setMacForAll}
                            >
                              {col.name}
                            </IndexTableHead>
                          );
                        }
                        return (
                          <th key={col.name} className="cabin-th">
                            {col.name}
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
              </div>
            )}
            cellRenderer={(props) => {
              const { col } = props;
              const cellType = cellsConfig[col];

              const extendedProps = {
                type: 'Fwd',
                setMac,
                setIndex,
                ...props,
              };

              return cellTypes[cellType](extendedProps);
            }}
            rowRenderer={(props) => {
              const { row, children } = props;
              return (
                <React.Fragment>
                  <tr style={{ paddingRight: '20px' }} className="">
                    {children}
                  </tr>
                </React.Fragment>
              );
            }}
          />
        </div>

        {/* Separator */}
        <div className="cg-limits-separator" />

        {/* 2nd */}
        <div>
          <div className="cg-limits-table-head-upper">
            AFT
          </div>
          <ReactDataSheet
            data={gridAft}
            valueRenderer={cell => cell.value}
            onCellsChanged={(changes) => { handleCellsChanged(changes, 'Aft'); }}
            sheetRenderer={props => (
              <div style={{ width: '100% !important' }}>
                <table className={`${props.className} cabin-table`}>
                  <thead>
                    <tr>
                      {columns.map((col) => {
                        if (col.name === '%MAC') {
                          return (
                            <MacTableHead
                              type="Aft"
                              key={col.name}
                              setIndexForAll={setIndexForAll}
                            >
                              {col.name}
                            </MacTableHead>
                          );
                        }
                        if (col.name === 'Index') {
                          return (
                            <IndexTableHead
                              type="Aft"
                              key={col.name}
                              setMacForAll={setMacForAll}
                            >
                              {col.name}
                            </IndexTableHead>
                          );
                        }
                        return (
                          <th key={col.name} className="cabin-th">
                            {col.name}
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
              </div>
            )}
            cellRenderer={(props) => {
              const { col } = props;
              const cellType = cellsConfig[col];

              const extendedProps = {
                type: 'Aft',
                setMac,
                setIndex,
                ...props,
              };

              return cellTypes[cellType](extendedProps);
            }}
            rowRenderer={(props) => {
              const { row, children } = props;
              return (
                <React.Fragment>
                  <tr style={{ paddingRight: '20px' }} className="">
                    {children}
                    <td className="td-hidden">
                      <span style={{ float: 'right', marginRight: '-1.7em', fontWeight: 'bold' }}>
                        <button
                          onClick={() => removeRow(row)}
                          type="button"
                          className="cabin-table-remove-btn"
                        >
                          <Glyphicon glyph="remove" />
                        </button>
                      </span>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }}
          />
        </div>
      </div>
      <Button onClick={addRow} className="cabin-table-btn">
        <Glyphicon style={{ fontSize: '12px' }} glyph="plus" />
        &nbsp;&nbsp;Add Row
      </Button>
    </div>
  );
}

Spreadsheet.propTypes = {
  gridFwd: PropTypes.array.isRequired,
  gridAft: PropTypes.array.isRequired,
  handleCellsChanged: PropTypes.func.isRequired,
  setIndexForAll: PropTypes.func.isRequired,
  setMacForAll: PropTypes.func.isRequired,
  setMac: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};
