"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartes_controller_1 = require("./cartes_controller");
const historique_controller_1 = require("./historique_controller");
const utils_1 = require("./utils");
const Jeux = () => __awaiter(void 0, void 0, void 0, function* () {
    let totalPoint = 0;
    const historique_carte_index = [];
    const listJoueur = yield (0, utils_1.getListeJoeur)();
    console.log("La partie commence. Et heureux de faire cette partie avec vous", listJoueur);
    for (let i = 0; i < 13; i++) {
        yield (0, historique_controller_1.resetFile)();
        const [firstJoueur, indexJoueur] = (0, utils_1.getJoueur)(listJoueur);
        console.log("La responsabilité reviens désormais à : ", firstJoueur);
        const { carte, randomIndex } = (0, cartes_controller_1.GetRandomCarteExceptTheseIndex)([]);
        historique_carte_index.push(randomIndex);
        console.log(firstJoueur, "à tirer la carte.");
        const chiffreChoisi = yield (0, utils_1.askNumberBetween1and5)(firstJoueur);
        const wordChoisi = carte[chiffreChoisi];
        for (let y = 0; y < 5; y++) {
            if (y != indexJoueur) {
                (0, utils_1.displayHashes)();
                yield (0, utils_1.askJoeurToChooseWord)(listJoueur[y], wordChoisi);
            }
        }
        (0, utils_1.displayHashes)();
        const listeSynonyme = yield (0, historique_controller_1.getSynonyms)(wordChoisi);
        console.log("Vous avez donc choisi les mot suivant : ", listeSynonyme);
        yield (0, utils_1.wait)(3);
        (0, utils_1.displayHashes)();
        const response = yield (0, utils_1.askJoeurToChooseReponse)(firstJoueur, listeSynonyme);
        totalPoint += (0, utils_1.afficheResultat)(response, wordChoisi, totalPoint);
        yield (0, utils_1.wait)(2);
    }
});
Jeux();
//# sourceMappingURL=index.js.map