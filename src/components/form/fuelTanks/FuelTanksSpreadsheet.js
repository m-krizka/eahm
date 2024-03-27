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

import ColDesigTooltip from './ColDesignTooltip';

const columns = [
  { name: 'Volume' },
  { name: 'Balance Arm' },
  { name: 'Index' },
  { name: 'Weight' },
];

export default function FuelTanksSpreadsheet(props) {
  const {
    grid,
    handleCellsChanged,
    setIndexForAll,
    setBalanceArmForAll,
    setVolumeForAll,
    setWeightForAll,
    setIndex,
    setBalanceArm,
    setVolume,
    setWeight,
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
                    const toRenderColDesignatorsTooltip = col.name === 'Col. designators';
                    if (col.name === 'Balance Arm') {
                      return (
                        <BalanceArmTableHead
                          key={col.name}
                          setIndexForAll={setIndexForAll}
                          setWeightForAll={setWeightForAll}
                        >
                          {col.name}
                        </BalanceArmTableHead>
                      );
                    }
                    if (col.name === 'Index') {
                      return (
                        <IndexTableHead
                          key={col.name}
                          setBalanceArmForAll={setBalanceArmForAll}
                          setVolumeForAll={setVolumeForAll}
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
          if (col === 1) {
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
                setIndex={setIndex}
                setWeight={setWeight}
              >
                {children}
              </BalanceArmCell>
            );
          }
          if (col === 2) {
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
                setBalanceArm={setBalanceArm}
                setVolume={setVolume}
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

FuelTanksSpreadsheet.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellsChanged: PropTypes.func.isRequired,
  setIndexForAll: PropTypes.func.isRequired,
  setBalanceArmForAll: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  setBalanceArm: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  setWeight: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};
