import React from 'react';
import ActionsPanel from '../components/table/actionButtons/ActionsPanel';
import StatusLabel from '../components/table/misc/StatusLabel';
import formatTableCell from './formatTableCell';

export default function generateTableColumns(
  table,
  handleStatusModalShow,
  handleDeletionModalShow,
  match,
) {
  const { params } = match;
  const { status } = params;
  const toDisplayActionsColumn = status === 'draft' || status === 'active';
  const output = [];
  table.fields.forEach((field) => {
    if (field.fieldType === 'grid') {
      return null;
    }
    output.push({
      dataField: field.fieldKey,
      text: field.fieldName,
      formatter: (fieldValue) => {
        if (field.fieldKey === 'status') {
          return <StatusLabel status={fieldValue} />;
        }
        return formatTableCell(field, fieldValue);
      },
    });
  });
  if (toDisplayActionsColumn) {
    output.push({
      dataField: 'actions',
      text: 'Actions',
      formatter: (cellContent, row) => {
        return (
          <ActionsPanel
            table={table}
            status={row.status}
            row={row}
            match={match}
            handleStatusModalShow={handleStatusModalShow}
            handleDeletionModalShow={handleDeletionModalShow}
          />
        );
      },
    });
  }
  return output;
}
