import { validationConstants } from '../_constants';

export const validationActions = {
  error,
  clear,
};

function error(errorArr) {
  return { type: validationConstants.ERROR, errorArr };
}

function clear() {
  return { type: validationConstants.CLEAR };
}
