/**
 *  increase progress according to horse condition
 *  @param currentProgress Current horse progress
 *  @param horseCondition Horse condition
 *  @param lapDistance Race lap disctance
 *
 */
export const increaseHorseProgress = function (currentProgress, horseCondition, lapDistance) {
  let newProgress = currentProgress;
  newProgress = newProgress + getProgressPerSecond(horseCondition, lapDistance);
  if (newProgress > 100) {
    newProgress = 100;
  }
  return newProgress;
};

function getProgressPerSecond(horseCondition, lapDistance) {
  const horseSpeed = getHorseSpeed(horseCondition);
  return horseSpeed/lapDistance * 100;
}

function getHorseSpeed(horseCondition) {
  // avarage speed for race horse is from 50 to 65 km per hour (from 13.8888889 to 18.0555556 m per second)
  // assume it is based on horse condition (from 1 to 100)
  return 13.8888889 + (18.0555556 - 13.8888889)/99 * (horseCondition - 1);
}
