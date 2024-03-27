import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function LoaderLinear(props) {
  const { loader } = props;
  if (loader.loading) {
    return (
      <div className="progress"><div className="indeterminate" /></div>
    );
  }
  return null;
}

LoaderLinear.propTypes = {
  loader: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loader } = state;
  return {
    loader,
  };
}

const connectedLoaderLinear = connect(mapStateToProps)(LoaderLinear);
export { connectedLoaderLinear as LoaderLinear };
