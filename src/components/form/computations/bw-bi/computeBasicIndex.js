export default function computeBasicIndex(
  basicWeight,
  basicBalanceArm,
  kConstant,
  cConstant,
  referenceStation,
) {
  const basicIndex = (basicWeight * (basicBalanceArm - referenceStation)) / cConstant + kConstant;
  return basicIndex.toFixed(6);
}
