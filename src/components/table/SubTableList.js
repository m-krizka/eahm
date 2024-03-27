/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Glyphicon } from 'react-bootstrap';

import SubTableModalGroup from './modals/SubTableModalGroup';
import SubTableLoader from './misc/SubTableLoader';
import NoMappingsPlaceholder from './misc/NoMappingsPlaceholder';
import ActivePointers from './misc/ActivePointers';

import { mappingTable } from '../../config/_mappingTable';
import { subTableDataActions } from '../../_actions/subTableData.actions';
import generateSubTableColumns from '../../_helpers/generateSubTableColumns';
import orderSubtableRows from '../../_helpers/orderSubtableRow';

class SubTableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMappingModalAdd: false,
      showMappingModalEdit: false,
      showStatusModal: false,
      statusToSet: 'active',
      recordToSetStatus: null,
      recordToEdit: null,
      recordToDelete: null,
      showDeletionModal: false,
    };
    this.loadData = this.loadData.bind(this);
    this.handleMappingModalShow = this.handleMappingModalShow.bind(this);
    this.handleMappingModalClose = this.handleMappingModalClose.bind(this);
    this.handleMappingModalEditShow = this.handleMappingModalEditShow.bind(this);
    this.handleMappingModalEditClose = this.handleMappingModalEditClose.bind(this);
    this.handleStatusModalShow = this.handleStatusModalShow.bind(this);
    this.handleStatusModalClose = this.handleStatusModalClose.bind(this);
    this.handleDeletionModalShow = this.handleDeletionModalShow.bind(this);
    this.handleDeletionModalClose = this.handleDeletionModalClose.bind(this);
    this.handleSetStatus = this.handleSetStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { location } = this.props;

    const oldStatus = prevProps.match.params.status;
    const newStatus = match.params.status;
    const oldQuery = prevProps.location.search;
    const newQuery = location.search;

    if (oldStatus !== newStatus || oldQuery !== newQuery) {
      this.loadData();
    }
  }

  loadData() {
    const { parentRecord, dispatch, table } = this.props;
    console.log(this.props);
    dispatch(subTableDataActions.getAll(parentRecord.id, '', `${table.url}-mapping`));
  }

  handleMappingModalShow() {
    this.setState({
      showMappingModalAdd: true,
    });
  }

  handleMappingModalClose() {
    this.setState({
      showMappingModalAdd: false,
    });
  }

  handleMappingModalEditShow(record) {
    this.setState({
      showMappingModalEdit: true,
      recordToEdit: record,
    });
  }

  handleMappingModalEditClose() {
    this.setState({
      showMappingModalEdit: false,
    });
  }

  handleStatusModalShow(record, statusToSet) {
    this.setState({
      showStatusModal: true,
      recordToSetStatus: record,
      statusToSet,
    });
  }

  handleStatusModalClose() {
    this.setState({
      showStatusModal: false,
      recordToSetStatus: null,
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

  handleSetStatus() {
    const { dispatch, table } = this.props;
    const { recordToSetStatus, statusToSet } = this.state;
    const newRecord = {
      _id: recordToSetStatus._id,
      status: statusToSet,
      toSetStatus: true,
    };

    dispatch(subTableDataActions.update(newRecord, `${table.url}-mapping`)).then(() => {
      this.handleStatusModalClose();
      this.loadData();
    });
  }

  handleDelete() {
    const { dispatch, table } = this.props;
    const { recordToDelete } = this.state;
    const id = recordToDelete._id;
    dispatch(subTableDataActions.delete(id, `${table.url}-mapping`)).then(() => {
      this.handleDeletionModalClose();
      this.loadData();
    });
  }

  render() {
    const {
      subTableData,
      parentRecord,
      match,
      table,
    } = this.props;
    const { handleStatusModalShow, handleMappingModalEditShow, handleDeletionModalShow } = this;

    if (subTableData.loading) {
      return (
        <div className="loader-shift-left">
          <SubTableLoader />
        </div>
      );
    }

    if (subTableData.items) {
      const { items } = subTableData;
      const { _id } = parentRecord;

      const subTableColumns = generateSubTableColumns(
        mappingTable,
        handleStatusModalShow,
        handleMappingModalEditShow,
        handleDeletionModalShow,
        match,
      );

      if (typeof items[_id] === 'undefined') {
        return (
          <div className="loader-shift-left">
            <SubTableLoader />
          </div>
        );
      }

      let subRecordsToRender = items[_id];
      subRecordsToRender = orderSubtableRows(subRecordsToRender);

      // Compute pointer SVGs here
      let activeSubRecordsNumber = 0;
      subRecordsToRender.forEach((record) => {
        if (record.status === 'active') activeSubRecordsNumber += 1;
      });
      return (
        <React.Fragment>
          <SubTableModalGroup
            caller={this}
            table={table}
            parentRecord={parentRecord}
          />
          {subTableData.items[parentRecord._id].length > 0
            ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '75px auto',
              }}
              >
                <svg
                  style={{
                    width: '78',
                    height: 50 + (activeSubRecordsNumber * 40),
                    border: 'solid 0px grey',
                  }}
                >
                  <ActivePointers activeSubRecordsNumber={activeSubRecordsNumber} />
                </svg>
                <div>
                  <BootstrapTable
                    keyField="id"
                    data={subRecordsToRender}
                    columns={subTableColumns}
                    hover
                  />
                </div>
              </div>
            )
            : <NoMappingsPlaceholder />
          }
          <Button
            className="btn-primary btn-subtable-add"
            onClick={this.handleMappingModalShow}
          >
            <Glyphicon glyph="plus" />
            &nbsp;Map Registration
          </Button>
        </React.Fragment>
      );
    }

    return <SubTableLoader />;
  }
}

SubTableList.propTypes = {
  table: PropTypes.object.isRequired,
  parentRecord: PropTypes.object.isRequired,
  subTableData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { subTableData } = state;
  return {
    subTableData,
  };
}

const connectedTableSubTableList = connect(mapStateToProps)(SubTableList);
export { connectedTableSubTableList as SubTableList };
