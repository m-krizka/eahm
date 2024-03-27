/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

export default function computeIndexFromMac({ MAC, weight, cConstant, kConstant, referenceStation, lemac, lengthOfMAC }) {
  return ((MAC * 0.01 * lengthOfMAC + lemac - referenceStation) * weight / cConstant + kConstant).toFixed(2);
}
