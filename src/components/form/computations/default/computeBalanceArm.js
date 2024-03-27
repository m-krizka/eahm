export default function computeBalanceArm(weight, index, cConstant, referenceStation) {
  const balanceArm = ((index * cConstant) / weight) + referenceStation;
  return balanceArm.toFixed(2);
}
