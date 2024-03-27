/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React from 'react';

import BalanceArmCell from './BalanceArmCell';
import IndexCell from './IndexCell';

export const cellTypes = {
  standard: (props) => {
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

    return (
      <td
        cell={cell}
        className={className}
        col={col}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        onKeyUp={onKeyUp}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        row={row}
        selected={selected}
        style={style}
        editing={editing ? 1 : 0}
        updated={updated ? 1 : 0}
      >
        {children}
      </td>
    );
  },
  index: (props) => {
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
      setBalanceArmPerUnit,
      indexColumn,
      balanceArmColumn,
    } = props;

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
  },
  balanceArm: (props) => {
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
      setIndexPerUnit,
      indexColumn,
      balanceArmColumn,
    } = props;

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
  },
};
