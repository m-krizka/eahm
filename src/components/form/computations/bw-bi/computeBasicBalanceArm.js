export default function computeBasicBalanceArm(
  basicIndex,
  basicWeight,
  kConstant,
  cConstant,
  referenceStation,
) {
  const balanceArm = (((basicIndex - kConstant) * cConstant) / basicWeight) + referenceStation;
  return balanceArm.toFixed(2);
}
