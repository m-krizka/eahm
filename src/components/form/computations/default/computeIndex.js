export default function computeIndex(weight, balanceArm, cConstant, referenceStation) {
  const index = (weight * (balanceArm - referenceStation)) / cConstant;
  return index.toFixed(6);
}
