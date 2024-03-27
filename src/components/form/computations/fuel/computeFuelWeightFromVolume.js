export default function computeFuelWeightFromVolume(volume, FDCalcAt) {
  const weight = volume * FDCalcAt;
  return weight.toFixed(2);
}
