class Pointage {
    constructor(pointDeDepart, conteneurHTML) {
        this.points = pointDeDepart;
        this.conteneurHTML = conteneurHTML;
        // console.log("classe", this);
    }

    // Reinitialiser
    afficherPointage() {
        this.conteneurHTML.innerHTML += `<div><h3>${this.points}</h3></div>`;
    }

    augmenterPointage(pointsObtenus) {
        this.points += pointsObtenus;
    }
}
