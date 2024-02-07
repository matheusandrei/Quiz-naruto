"use strict";

// console.log("variable globale", this);

(function () {
    const quiz = new Quiz();

    console.log(quiz);

    //setTimeout permet de créer un délai. Se déclanche une seule fois
    // Il est possible d'utiliser une fonction anonyme ou une fonction nommée
    // Dans le cas d'une fct nommée qui a besoin de param, on les ajoute après le délai
    // window.setTimeout(function () {
    //     console.log("Allo après 3 secondes");
    //     window.setTimeout(patate, 3000, "string", 454);
    // }, 3000);

    // function patate(param, param2) {
    //     console.log(param, param2);
    // }

    // SetInterval, à l'infini
    // let compteur = 0;
    // let interval = window.setInterval(function () {
    //     if (compteur >= 10) {
    //         //Permet d'arrêter l'interval
    //         window.clearInterval(interval);
    //     } else {
    //         compteur++;
    //         console.log(compteur);
    //     }
    // }, 1000);
})();
