/**
 *  get random horse list out of given list
 *  @param horsesList Initial list of horses
 *  @param listLength Length of list needed to return
 *
 */
export const generateHorsesList = function (horsesList, listLength) {
  let newHorsesList = [];
  let indexesList = [];
  while (indexesList.length < listLength) {
    let index = Math.floor((Math.random()* horsesList.length) + 1);
    if (indexesList.includes(index)) {
      continue;
    }
    indexesList.push(index);
  }

  horsesList.map((item) => {
    if (indexesList.includes(item.id )) {
      newHorsesList.push(item);
    }
  });

  return newHorsesList;
};
