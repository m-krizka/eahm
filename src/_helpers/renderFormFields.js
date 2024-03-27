import React from 'react';
import moment from 'moment';

import { SimpleFieldWrapper } from '../components/form/misc/SimpleFieldWrapper';

export const renderFormFields = (caller, fields, fieldHandlers) => {
  const { state } = caller;

  const isModalForm = Object.prototype.hasOwnProperty.call(caller.props, 'parentTableURL');

  // The below is temporary; should be handled in Redux
  state.record.effFrom = state.record.effFrom === null ? null : moment(new Date(state.record['effFrom']));
  state.record.effTo = state.record.effTo === null ? null : moment(new Date(state.record['effTo']));

  const { setIndex } = caller;
  const { setBalanceArm } = caller;

  const { setBasicIndex } = caller;
  const { setBasicBalanceArm } = caller;

  return fields.map((field) => {
    const { fieldKey, fieldType } = field;
    const focusProp = `${field.fieldKey}Focus`;
    return (
      <SimpleFieldWrapper
        key={fieldKey}
        field={field}
        fields={fields}
        onChange={fieldHandlers[fieldType]}
        value={state.record[fieldKey]}
        record={state.record}

        date={state.record[fieldKey]}
        onDateChange={date => fieldHandlers.date(date, fieldKey)}
        focused={state[focusProp]}
        onFocusChange={({ focused }) => caller.setState({ [focusProp]: focused })}

        setIndex={setIndex}
        setBalanceArm={setBalanceArm}

        setBasicIndex={setBasicIndex}
        setBasicBalanceArm={setBasicBalanceArm}

        isModalForm={isModalForm}
      />
    );
  });
};
