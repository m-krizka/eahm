import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

import { tableDataActions } from '../../_actions';
import generateTableColumns from '../../_helpers/generateTableColumns';
import TableLoader from './misc/TableLoader';
import NoDataPlaceholder from './misc/NoDataPlaceholder';
import withModal from './modals/withModal';

class TableList extends React.Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
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

  render() {
    const {
      tableData,
      match,
      table,
      handleStatusModalShow,
      handleDeletionModalShow,
    } = this.props;
    const columns = generateTableColumns(
      table, handleStatusModalShow, handleDeletionModalShow, match,
    );
    return (
      <React.Fragment>
        {tableData.loading && <TableLoader />}
        {tableData.items
          && (
          <React.Fragment>
            <BootstrapTable
              keyField="_id"
              data={tableData.items}
              columns={columns}
            />
            {tableData.items.length === 0 && <NoDataPlaceholder />}
            <Link to={`/${table.url}/add`} className="btn btn-primary btn-table-add">

              <Glyphicon glyph="plus" />
              &nbsp;Add Record
            </Link>
          </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

TableList.propTypes = {
  table: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  tableData: PropTypes.object.isRequired,
  handleStatusModalShow: PropTypes.func.isRequired,
  handleDeletionModalShow: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { tableData } = state;
  return {
    tableData,
  };
}

const TableListWithModal = withModal(TableList);

const connectedTableList = connect(mapStateToProps)(TableListWithModal);
export { connectedTableList as TableList };
