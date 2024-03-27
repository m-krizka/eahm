import { validationConstants } from '../_constants';

export function validation(state = {}, action) {
  switch (action.type) {
    case validationConstants.ERROR:
      return {
        validationArr: action.errorArr,
      };
    case validationConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
