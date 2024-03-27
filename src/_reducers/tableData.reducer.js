import { tableDataConstants } from '../_constants';

function adjustTotalPages(count) {
  return count === 0 ? 1 : count;
}

export function tableData(state = {}, action) {
  switch (action.type) {
    case tableDataConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case tableDataConstants.GETALL_SUCCESS:
      return {
        items: action.tableData.records,
        pagination: {
          totalCount: action.tableData.metadata.totalCount,
          totalPages: adjustTotalPages(Math.ceil(action.tableData.metadata.totalCount / 10)),
          currentPage: parseInt(action.page, 10),
        },
      };
    case tableDataConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case tableDataConstants.SETPAGE_SUCCESS:
      return {
        pagination: {
          currentPage: action.page,
        },
      };

    default:
      return state;
  }
}
