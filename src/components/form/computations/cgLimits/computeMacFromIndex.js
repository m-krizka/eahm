/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

export default function computeMacFromIndex({ index, weight, cConstant, kConstant, referenceStation, lemac, lengthOfMAC }) {
  return (((cConstant * (index - kConstant) / weight) + referenceStation - lemac) / (lengthOfMAC * 0.01)).toFixed(2);
}
