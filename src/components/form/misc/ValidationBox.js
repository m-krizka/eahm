import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validationActions } from '../../../_actions/validation.actions';

class ValidationBox extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(validationActions.clear());
  }

  render() {
    const { validation } = this.props;
    if (validation.validationArr) {
      // If data returned is not array of errors, don't show the box
      if (typeof validation.validationArr !== 'object') {
        return null;
      }

      const { validationArr } = validation;
      const listItems = [];
      for (let index = 0; index < validationArr.length; index += 1) {
        listItems.push(<li key={index}>{validationArr[index]}</li>);
      }
      return (
        <div className="alert-danger-validation">
          {listItems}
        </div>
      );
    }
    return null;
  }
}

ValidationBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { validation } = state;
  return {
    validation,
  };
}

const connectedValidationBox = connect(mapStateToProps)(ValidationBox);
export { connectedValidationBox as ValidationBox };
