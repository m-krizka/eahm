export default function computeFuelVolumeFromWeight(weight, FDCalcAt) {
  const volume = weight / FDCalcAt;
  return volume.toFixed(2);
}
