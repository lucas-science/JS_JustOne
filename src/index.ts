import { GetRandomCarteExceptTheseIndex } from "./cartes_controller";
import { getSynonyms, resetFile } from "./historique_controller";
import {
  getListeJoeur,
  getJoueur,
  askNumberBetween1and5,
  askJoeurToChooseWord,
  askJoeurToChooseReponse,
  wait,
  afficheResultat,
  displayHashes,
} from "./utils";

const Jeux = async () => {
  let totalPoint: number = 0;
  const historique_carte_index = [];
  const listJoueur: string[] = await getListeJoeur();
  console.log(
    "La partie commence. Et heureux de faire cette partie avec vous",
    listJoueur
  );

  for (let i = 0; i < 13; i++) {
    await resetFile();
    const [firstJoueur, indexJoueur] = getJoueur(listJoueur);
    console.log("La responsabilité reviens désormais à : ", firstJoueur);

    const { carte, randomIndex } = GetRandomCarteExceptTheseIndex([]);
    historique_carte_index.push(randomIndex);

    console.log(firstJoueur, "à tirer la carte.");
    const chiffreChoisi = await askNumberBetween1and5(firstJoueur);

    const wordChoisi = carte[chiffreChoisi];
    for (let y = 0; y < 5; y++) {
      if (y != indexJoueur) {
        displayHashes();
        await askJoeurToChooseWord(listJoueur[y], wordChoisi);
      }
    }
    displayHashes();
    const listeSynonyme = await getSynonyms(wordChoisi);
    console.log("Vous avez donc choisi les mot suivant : ", listeSynonyme);
    await wait(3);

    displayHashes();
    const response = await askJoeurToChooseReponse(firstJoueur, listeSynonyme);
    totalPoint += afficheResultat(response, wordChoisi, totalPoint);
    await wait(2);
  }
};

Jeux();
