/**
 *  get random horse list out of given list
 *  @param horsesList Initial list of horses
 *  @param listLength Length of list needed to return
 *
 */
export const generateHorsesList = function (horsesList, listLength) {
  let newHorsesList = [];
  let idsList = [];
  while (idsList.length < listLength) {
    let index = Math.floor(Math.random()* horsesList.length);
    if (idsList.includes(horsesList[index].id)) {
      continue;
    }
    idsList.push(horsesList[index].id);
  }

  horsesList.map((item) => {
    if (idsList.includes(item.id )) {
      newHorsesList.push(item);
    }
  });

  return newHorsesList;
};
