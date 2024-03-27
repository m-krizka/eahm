import React from 'react';
import SubActionsPanel from '../components/table/actionButtons/SubActionsPanel';
import StatusLabel from '../components/table/misc/StatusLabel';
import formatTableCell from './formatTableCell';

export default function generateSubTableColumns(
  table,
  handleStatusModalShow,
  handleMappingModalEditShow,
  handleDeletionModalShow,
  match,
) {
  const { params } = match;
  const { status } = params;
  const toDisplayActionsColumn = status === 'draft' || status === 'active';
  const output = [];
  table.fields.forEach((field) => {
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
          <SubActionsPanel
            table={table}
            status={row.status}
            row={row}
            match={match}
            handleStatusModalShow={handleStatusModalShow}
            handleMappingModalEditShow={handleMappingModalEditShow}
            handleDeletionModalShow={handleDeletionModalShow}
          />
        );
      },
    });
  }
  return output;
}
