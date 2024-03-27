import { loaderConstants } from '../_constants';

export const loaderActions = {
  start,
  stop,
};

function start() {
  return { type: loaderConstants.START };
}

function stop() {
  return { type: loaderConstants.STOP };
}
