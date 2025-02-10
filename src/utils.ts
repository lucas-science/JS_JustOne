import * as readline from "readline";
import { addSynonym } from "./historique_controller";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

export const askNumberBetween1and5 = (name: string): Promise<number> => {
  return new Promise((resolve) => {
    const question = name + ",choisissez un chiffre entre 1 et 5 (inclus)";
    rl.question(question, (answer: string) => {
      resolve(Number(answer) - 1);
    });
  });
};

const askSynonyme = (): Promise<string> => {
  return new Promise((resolve) => {
    const question =
      "Donne le synonyme (éssaye pas de m'entourlouper je te vois venir !) : ";
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

export const askJoeurToChooseReponse = (
  name: string,
  synonymes: string[]
): Promise<string> => {
  return new Promise((resolve) => {
    const question =
      "Alors " +
      name +
      ", voici la liste de synonyme : " +
      synonymes +
      "\n Devine quel est le mot : ";
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

export const getListeJoeur = async (): Promise<string[]> => {
  const response: string = await askQuestion(
    "Entrez la liste de vos prénoms séparés par un espace (5 joeurs):  "
  );
  return response.split(" ");
};

export const getJoueur = (listName: string[]): [string, number] => {
  const randomIndex = Math.floor(Math.random() * 4);
  return [listName[randomIndex], randomIndex];
};

export const askJoeurToChooseWord = async (name: string, word: string) => {
  console.log(
    `%c${name}, à toi de choisir un synonyme au mot : ${word}`, 
    "background: green; color: white; font-weight: bold; padding: 5px; font-size: 14px;"
  );
  const response = await askSynonyme();
  await addSynonym(word, response);
};


export const afficheResultat = (
  response: string,
  mot: string,
  totalPoint: number
): number => {
  if (response.toLocaleLowerCase() == mot) {
    console.log("Bravo ! vous formez une super team !");
    console.log("Votre score actuel est : ", totalPoint + 1);
    return 1;
  }
  console.log(
    "Vous n'êtes vraisemblablement pas les couteaux les plus affûtés du tiroir. Donc 0 point pour ce tour !"
  );
  return 0;
};

export const displayHashes = () => {
  const terminalHeight = process.stdout.rows;
  const terminalWidth = process.stdout.columns;

  for (let i = 0; i < terminalHeight; i++) {
    process.stdout.write("#".repeat(terminalWidth) + "\n");
  }
};
