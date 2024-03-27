/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import { cellTypes } from './cellTypes';

export default function Spreadsheet(props) {
  const {
    cellsConfig,
    grid,
    handleCellsChanged,
    addRow,
  } = props;
  console.log('here');
  return (
    <div style={{ marginTop: '2px' }}>
      <br />

      <div className="cg-limits-table-head-upper">
        %MAC and Corresponding Stabiliser Setting
      </div>
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        onCellsChanged={(changes) => { handleCellsChanged(changes, 'Fwd'); }}
        sheetRenderer={props => (
          <div style={{ width: '100% !important' }}>
            <table className={`${props.className} cabin-table`}>
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

      <Button onClick={addRow} className="cabin-table-btn">
        <Glyphicon style={{ fontSize: '12px' }} glyph="plus" />
        &nbsp;&nbsp;Add Row
      </Button>
    </div>
  );
}

Spreadsheet.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellsChanged: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};
