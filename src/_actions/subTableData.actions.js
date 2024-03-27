/* global dispatch */
import { subTableDataConstants } from '../_constants';
import { tableService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';
import { validationActions } from '.';

export const subTableDataActions = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  setPage,
};

function getAll(setId, page, url) {
  return (dispatch) => {
    // dispatch(request());

    const setIdParam = `_setId=${setId}`;
    tableService.getAll(setIdParam, url)
      .then(
        subTableData => dispatch(success(subTableData)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: subTableDataConstants.GETALL_REQUEST }; }
  function success(subTableData) {
    return { type: subTableDataConstants.GETALL_SUCCESS, subTableData, page, setId };
  }
  function failure(error) { return { type: subTableDataConstants.GETALL_FAILURE, error }; }
}

function getById(id, url) {
  return (dispatch) => {
    dispatch(request());
    return tableService.getById(id, url)
      .then(
        tableRecord => dispatch(success(tableRecord)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: subTableDataConstants.GETBYID_REQUEST }; }
  function success(tableRecord) {
    return { type: subTableDataConstants.GETBYID_SUCCESS, tableRecord };
  }
  function failure(error) { return { type: subTableDataConstants.GETBYID_FAILURE, error }; }
}

function create(data, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());

    return tableService.create(data, url)
      .then(
        () => {
          dispatch(loaderActions.stop());
          dispatch(success());
          dispatch(alertActions.success('Record has been added'));
        },
        (errorArr) => {
          dispatch(loaderActions.stop());
          dispatch(validationActions.error(errorArr));
        },
      );
  };

  function request(rec) { return { type: subTableDataConstants.CREATE_REQUEST, rec }; }
  function success(rec) { return { type: subTableDataConstants.CREATE_SUCCESS, rec }; }
  function failure(err) { return { type: subTableDataConstants.CREATE_FAILURE, err }; }
}

function update(record, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());

    return tableService.update(record, url)
      .then(
        () => {
          dispatch(loaderActions.stop());
          dispatch(success());
          dispatch(alertActions.success('Update successful'));
        },
        (errorArr) => {
          console.log(errorArr);
          dispatch(loaderActions.stop());
          dispatch(validationActions.error(errorArr));
        },
      );
  };

  function request() { return { type: subTableDataConstants.UPDATE_REQUEST }; }
  function success() { return { type: subTableDataConstants.UPDATE_SUCCESS }; }
  function failure() { return { type: subTableDataConstants.UPDATE_FAILURE }; }
}

function _delete(id, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());
    dispatch(request(id));

    return tableService.delete(id, url)
      .then(
        () => {
          dispatch(loaderActions.stop());
          dispatch(success(id));
        },
        (error) => {
          dispatch(loaderActions.stop());
          dispatch(failure(id, error.toString()));
        },
      )
      .then(() => {
        dispatch(alertActions.success('Record has been deleted'));
      });
  };

  function request() { return { type: subTableDataConstants.DELETE_REQUEST }; }
  function success() { return { type: subTableDataConstants.DELETE_SUCCESS }; }
  function failure() { return { type: subTableDataConstants.DELETE_FAILURE }; }
}

function setPage(page) {
  dispatch(success(page));

  function success(page) { return { type: subTableDataConstants.SETPAGE_SUCCESS, page }; }
}
