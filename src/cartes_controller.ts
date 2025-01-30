import data from "./data/cartes.json";

export const GetRandomCarteExceptTheseIndex = (listIndex: number[]) => {
  type Cartes = string[][];
  const Carte: Cartes = data.cartes;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 29);
  } while (listIndex.includes(randomIndex));

  return {
    carte: Carte[randomIndex],
    randomIndex,
  };
};
