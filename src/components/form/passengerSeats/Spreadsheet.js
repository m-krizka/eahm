/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import BalanceArmTableHead from './BalanceArmTableHead';
import IndexTableHead from './IndexTableHead';
import BalanceArmCell from './BalanceArmCell';
import IndexCell from './IndexCell';

const columns = [
  { name: 'Row nr.' },
  { name: 'Cabin section' },
  { name: 'Balance Arm' },
  { name: 'Index/kg' },
  { name: 'Nr. of seats' },
  { name: 'Max weight/seat' },
];

const weightColumn = 5;
const balanceArmColumn = 2;
const indexColumn = 3;

export default function CabinSpreadsheet(props) {
  const {
    grid,
    handleCellsChanged,
    setIndexPerUnitForAll,
    setBalanceArmPerUnitForAll,
    setIndexPerUnit,
    setBalanceArmPerUnit,
    addRow,
    removeRow,
  } = props;

  return (
    <div style={{ marginTop: '2px' }}>
      <br />
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        onCellsChanged={handleCellsChanged}
        sheetRenderer={props => (
          <div style={{ overflowX: 'scroll' }} style={{ width: '100% !important' }}>
            <table className={props.className + ' cabin-table'}>
              <thead>
                <tr>
                  {columns.map((col) => {
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
                      </th>
                    );
                  })}
                  <th style={{ width: '0px' }}></th>
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
          const {
            children,
            cell,
            className,
            col,
            editing,
            onContextMenu,
            onDoubleClick,
            onKeyUp,
            onMouseDown,
            onMouseOver,
            row,
            selected,
            style,
            updated,
          } = props;
          if (col === 2) {
            return (
              <BalanceArmCell
                cell={cell}
                className={className}
                col={col}
                editing={editing ? 1 : 0}
                onContextMenu={onContextMenu}
                onDoubleClick={onDoubleClick}
                onKeyUp={onKeyUp}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}
                row={row}
                selected={selected}
                style={style}
                updated={updated ? 1 : 0}
                setIndexPerUnit={setIndexPerUnit}
                indexColumn={indexColumn}
                balanceArmColumn={balanceArmColumn}
              >
                {children}
              </BalanceArmCell>
            );
          }
          if (col === 3) {
            return (
              <IndexCell
                cell={cell}
                className={className}
                col={col}
                editing={editing ? 1 : 0}
                onContextMenu={onContextMenu}
                onDoubleClick={onDoubleClick}
                onKeyUp={onKeyUp}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}
                row={row}
                selected={selected}
                style={style}
                updated={updated ? 1 : 0}
                setBalanceArmPerUnit={setBalanceArmPerUnit}
                indexColumn={indexColumn}
                balanceArmColumn={balanceArmColumn}
              >
                {children}
              </IndexCell>
            );
          }
          return (
            <td
              cell={cell}
              className={className}
              col={col}
              editing={editing ? 1 : 0}
              onContextMenu={onContextMenu}
              onDoubleClick={onDoubleClick}
              onKeyUp={onKeyUp}
              onMouseDown={onMouseDown}
              onMouseOver={onMouseOver}
              row={row}
              selected={selected}
              style={style}
              updated={updated ? 1 : 0}
            >
              {children}
            </td>
          );
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

CabinSpreadsheet.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellsChanged: PropTypes.func.isRequired,
  setIndexPerUnitForAll: PropTypes.func.isRequired,
  setBalanceArmPerUnitForAll: PropTypes.func.isRequired,
  setIndexPerUnit: PropTypes.func.isRequired,
  setBalanceArmPerUnit: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};
