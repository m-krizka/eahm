import { loaderConstants } from '../_constants';

export function loader(state = {}, action) {
  switch (action.type) {
    case loaderConstants.START:
      return {
        loading: 'true',
      };
    case loaderConstants.STOP:
      return {};
    default:
      return state;
  }
}
