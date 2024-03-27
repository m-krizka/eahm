import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { tableDataActions } from '../../../_actions';

import ModalStatusSet from './ModalStatusSet';
import ModalDelete from './ModalDelete';


export default function withModal(Component) {
  class WithModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        recordToActivate: null,
        recordToDelete: null,
        showStatusModal: false,
        showDeletionModal: false,
        statusToSet: 'active',
      };
      this.handleSetStatus = this.handleSetStatus.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleStatusModalShow = this.handleStatusModalShow.bind(this);
      this.handleStatusModalClose = this.handleStatusModalClose.bind(this);
      this.handleDeletionModalShow = this.handleDeletionModalShow.bind(this);
      this.handleDeletionModalClose = this.handleDeletionModalClose.bind(this);
    }

    loadData() {
      const { table } = this.props;
      const { match } = this.props;
      const { location } = this.props;
      const { dispatch } = this.props;
      const query = queryString.parse(location.search);
      const pageStr = query._page || 1;
      if (pageStr) {
        delete query._page;
        query._offset = (parseInt(pageStr, 10) - 1) * 10;
      }
      query._limit = 10;
      let search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
      search += `&_status=${match.params.status}`;
      dispatch(tableDataActions.getAll(search, pageStr, table.url));
    }

    handleSetStatus() {
      const { dispatch, table } = this.props;
      const { recordToActivate } = this.state;
      const { statusToSet } = this.state;
      const newRecord = {
        _id: recordToActivate._id,
        status: statusToSet,
        toSetStatus: true,
      };
      dispatch(tableDataActions.update(newRecord, table.url)).then(() => {
        this.handleStatusModalClose();
        this.loadData();
      });
    }

    handleDelete() {
      const { dispatch, table } = this.props;
      const { recordToDelete } = this.state;
      const id = recordToDelete._id;
      dispatch(tableDataActions.delete(id, table.url)).then(() => {
        this.handleDeletionModalClose();
        this.loadData();
      });
    }

    handleStatusModalShow(record, statusToSet) {
      this.setState({
        showStatusModal: true,
        recordToActivate: record,
        statusToSet,
      });
    }

    handleStatusModalClose() {
      this.setState({
        showStatusModal: false,
        recordToActivate: null,
      });
    }

    handleDeletionModalShow(record) {
      this.setState({
        showDeletionModal: true,
        recordToDelete: record,
      });
    }

    handleDeletionModalClose() {
      this.setState({
        showDeletionModal: false,
        recordToDelete: null,
      });
    }

    render() {
      const { table } = this.props;
      const {
        statusToSet,
        recordToDelete,
        recordToActivate,
        showStatusModal,
        showDeletionModal,
      } = this.state;
      return (
        <React.Fragment>
          <ModalStatusSet
            table={table}
            showing={showStatusModal}
            onHide={this.handleStatusModalClose}
            setStatus={this.handleSetStatus}
            statusToSet={statusToSet}
            record={recordToActivate}
          />
          <ModalDelete
            table={table}
            showing={showDeletionModal}
            onHide={this.handleDeletionModalClose}
            handleDelete={this.handleDelete}
            record={recordToDelete}
          />
          <br />
          <Component
            handleStatusModalShow={this.handleStatusModalShow}
            handleDeletionModalShow={this.handleDeletionModalShow}
            {...this.props}
          />
        </React.Fragment>
      );
    }
  }

  WithModal.propTypes = {
    table: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  return WithModal;
}
