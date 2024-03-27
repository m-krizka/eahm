import { subTableDataConstants } from '../_constants';

function adjustTotalPages(count) {
  return count === 0 ? 1 : count;
}

export function subTableData(state = {}, action) {
  switch (action.type) {
    case subTableDataConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case subTableDataConstants.GETALL_SUCCESS: {
      const newSubTable = { [action.setId]: action.subTableData.records };
      return {
        items: { ...state.items, ...newSubTable },
        pagination: {
          totalCount: action.subTableData.metadata.totalCount,
          // no API calls in the reducer - refactor/move into actions?
          totalPages: adjustTotalPages(Math.ceil(action.subTableData.metadata.totalCount / 10)),
          currentPage: parseInt(action.page, 10),
        },
      };
    }
    case subTableDataConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case subTableDataConstants.SETPAGE_SUCCESS:
      return {
        pagination: {
          currentPage: action.page,
        },
      };

    default:
      return state;
  }
}
