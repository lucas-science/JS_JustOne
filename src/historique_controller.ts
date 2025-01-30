import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "data/historique.json");

interface Jeu {
  mot: string;
  synonymes: string[];
}

const isSimilar = (mot: string, synonyme: string): boolean => {
  const tolerance = 130;

  const maxLength = Math.max(mot.length, synonyme.length);
  const paddedMot = mot.padEnd(maxLength, " ");
  const paddedSynonyme = synonyme.padEnd(maxLength, " ");

  let sumOfSquares = 0;

  for (let i = 0; i < maxLength; i++) {
    const diff = paddedMot.charCodeAt(i) - paddedSynonyme.charCodeAt(i);
    sumOfSquares += diff * diff;
  }

  const distance = Math.sqrt(sumOfSquares);

  return distance <= tolerance;
};

export const addSynonym = async (
  mot: string,
  synonyme: string
): Promise<void> => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const database = JSON.parse(data);

    const existingMot = database.jeux.find((jeu: Jeu) => jeu.mot === mot);
    if (!isSimilar(mot, synonyme)) {
      if (existingMot) {
        if (!existingMot.synonymes.includes(synonyme)) {
          existingMot.synonymes.push(synonyme);
          console.log(
            `Le synonyme "${synonyme}" a été ajouté au mot "${mot}".`
          );
        } else {
          console.log(
            `Le synonyme "${synonyme}" existe déjà pour le mot "${mot}".`
          );
        }
      } else {
        database.jeux.push({
          mot: mot,
          synonymes: [synonyme],
        });
        console.log(
          `Le mot "${mot}" a été ajouté avec le synonyme "${synonyme}".`
        );
      }
    }

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(database, null, 2),
      "utf8"
    );
    console.log("Modifications enregistrées avec succès.");
  } catch (err) {
    console.error("Erreur lors de la gestion du fichier :", err);
  }
};

export const getSynonyms = (mot: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erreur lors de la lecture du fichier : " + err);
        return;
      }

      const database = JSON.parse(data);

      const jeu = database.jeux.find((jeu: Jeu) => jeu.mot === mot);

      if (jeu) {
        resolve(jeu.synonymes);
      } else {
        resolve([]);
      }
    });
  });
};

export const resetFile = async (): Promise<void> => {
  const emptyData = {
    jeux: [],
  };

  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      JSON.stringify(emptyData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          reject("Erreur lors de l'écriture du fichier : " + err);
        } else {
          //console.log('Le fichier a été réinitialisé avec succès.');
          resolve();
        }
      }
    );
  });
};
