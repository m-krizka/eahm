import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Glyphicon, Button } from 'react-bootstrap';

import { tableDataActions } from '../../_actions';
import generateTableColumns from '../../_helpers/generateTableColumns';
import { SubTableList } from './SubTableList';
import TableLoader from './misc/TableLoader';
import NoDataPlaceholder from './misc/NoDataPlaceholder';
import withModal from './modals/withModal';

class TableListCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    };
    this.handleOnExpand = this.handleOnExpand.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleCollapseAll = this.handleCollapseAll.bind(this);
  }

  handleOnExpand = (row, isExpand) => {
    const { expanded } = this.state;
    if (isExpand) {
      this.setState(() => ({
        expanded: [...expanded, row._id],
      }));
    } else {
      this.setState(() => ({
        expanded: expanded.filter(x => x !== row._id),
      }));
    }
  }

  handleExpandAll() {
    const { tableData } = this.props;
    const { items } = tableData;
    const rowIDs = items.map(row => row._id);
    this.setState(() => ({
      expanded: [...rowIDs],
    }));
  }

  handleCollapseAll() {
    this.setState(() => ({
      expanded: [],
    }));
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
    const { expanded } = this.state;
    const columns = generateTableColumns(
      table, handleStatusModalShow, handleDeletionModalShow, match,
    );
    const expandRow = {

      expanded,
      showExpandColumn: true,
      expandByColumnOnly: true,
      onExpand: this.handleOnExpand,
      renderer: (row) => {
        return (
          <SubTableList parentRecord={row} {...this.props} />
        );
      },
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <Button onClick={this.handleCollapseAll} className="btn-row-expandable">–</Button>;
        }
        return <Button onClick={this.handleExpandAll} className="btn-row-expandable">+</Button>;
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <React.Fragment>
              <Button className="btn-row-expandable">–</Button>
            </React.Fragment>
          );
        }
        return (
          <Button className="btn-row-expandable">+</Button>
        );
      },
    };
    let rowClasses;
    if (tableData.items) {
      rowClasses = (row) => {
        let classes = null;
        if (expanded.includes(row._id)) {
          classes = 'row-expanded';
        }
        return classes;
      };
    }
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
              expandRow={expandRow}
              rowClasses={rowClasses}
              hover
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

TableListCollapsible.propTypes = {
  table: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  tableData: PropTypes.object.isRequired,
  handleStatusModalShow: PropTypes.func.isRequired,
  handleDeletionModalShow: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { tableData, subTableData } = state;
  return {
    tableData,
    subTableData,
  };
}

const TableListCollapsibleWithModal = withModal(TableListCollapsible);

const connectedTableListCollapsible = connect(mapStateToProps)(TableListCollapsibleWithModal);
export { connectedTableListCollapsible as TableListCollapsible };
