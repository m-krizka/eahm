/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React from 'react';

import MacCell from './MacCell';
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
      type,
      setMac,
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
      indexColumn,
      balanceArmColumn,
    } = props;

    return (
      <IndexCell
        type={type}
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
        setMac={setMac}
        indexColumn={indexColumn}
        balanceArmColumn={balanceArmColumn}
      >
        {children}
      </IndexCell>
    );
  },
  mac: (props) => {
    const {
      type,
      setIndex,
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
      indexColumn,
      balanceArmColumn,
    } = props;

    return (
      <MacCell
        type={type}
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
        indexColumn={indexColumn}
        balanceArmColumn={balanceArmColumn}
      >
        {children}
      </MacCell>
    );
  },
};
