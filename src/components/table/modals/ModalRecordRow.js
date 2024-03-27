import React from 'react';
import formatTableCell from '../../../_helpers/formatTableCell';

export default function ModalRecordRow(props) {
  const { table } = props;
  const { record } = props;
  const tableData = table.fields.map((field) => {
    if (field.fieldType === 'grid') return;
    let fieldValue = record[field.fieldKey];
    fieldValue = formatTableCell(field, fieldValue);
    return <td key={field.fieldKey}>{fieldValue}</td>;
  });
  return (
    <tr>
      {tableData}
    </tr>
  );
}
