import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Glyphicon } from 'react-bootstrap';

import { alertActions } from '../../_actions';

class Toast extends React.Component {
  componentDidUpdate() {
    const { dispatch, alert } = this.props;
    if (alert.message) {
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 5000);
    }
  }

  render() {
    const { alert } = this.props;
    let icon;
    if (alert.message) {
      if (alert.type === 'success') {
        icon = 'ok-circle';
      } else {
        icon = 'remove-circle';
      }
      return (
        <Alert bsStyle={alert.type}>
          <Glyphicon glyph={icon} />
          &nbsp;&nbsp;
          {alert.message}
        </Alert>
      );
    }
    return null;
  }
}

Toast.propTypes = {
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedToast = connect(mapStateToProps)(Toast);
export { connectedToast as Toast };
