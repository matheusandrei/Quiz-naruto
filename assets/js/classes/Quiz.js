class Quiz {
    constructor() {
        // debugger;
        //Créer les propriétés
        this.indexQuestion = 0;
        this.questionsMax = 5;
        this.questions = listeQuestions;

        this.boitePointage = document.querySelector("[data-pointage]");

        this.panneauDebut = document.querySelector("[data-panneau-debut]");
        this.panneauQuestion = document.querySelector("[data-panneau-question]");
        this.panneauFin = document.querySelector("[data-panneau-fin]");

        this.boutonDemarrer = this.panneauDebut.querySelector("[data-btn-demarrer]");

        this.boutonsReponse = document.querySelectorAll("[data-btn-reponse]");
        this.dataScore=document.querySelector("[data-score]");
        this.finalScore=0;
        this.boutonsReponse=document.querySelectorAll("[data-liste-reponses]")
        this.questionActuelle;
        this.messageFinal=document.querySelector("[data-message]");


        this.pointage = new Pointage(0, this.boitePointage);

        // Démarrer l'affichage au besoin.
        // S'exécute lors de l'instanciation

        // Écouteur événements
        // let that = this;
        // console.log("instanceClasse", instanceClasse);
        this.boutonDemarrer.addEventListener("click", this.afficherProchaineQuestion.bind(this));

        this.afficherPanneauDebut();

        this.onFinTransition = this.onFinTransition.bind(this);
    }

    // Pourrait trier de façon aléatoire
    preparerQuiz() {
        this.questions.sort(() => Math.random() - 0.5);
    }

    cacherPanneaux() {
        this.panneauDebut.classList.add("invisible");
        this.panneauQuestion.classList.add("invisible");
        this.panneauFin.classList.add("invisible");
    }

    afficherPanneauDebut() {
        this.cacherPanneaux();
        this.panneauDebut.classList.remove("invisible");
    }

    afficherProchaineQuestion() {
        if (this.indexQuestion < this.questionsMax) {
            this.indexQuestion++;
            this.cacherPanneaux();
            this.panneauQuestion.classList.remove("invisible");
    
            // Mélanger les questions de manière aléatoire
            this.preparerQuiz();
    
            // Récupérer la prochaine question du tableau listeQuestions
            const questionData = this.questions[this.indexQuestion - 1];
    
            // Créer une nouvelle instance de Question avec les données de la question actuelle
            this.questionActuelle = new Question(
                questionData.question,
                questionData.reponseCorrecte,
                questionData.options,
                this.panneauQuestion
            );
    
            // Réactiver les interactions sur les boutons
            this.ajouterListenersBoutonsReponse();
        } else {
            this.afficherPanneauFin();
        }
    }
    ajouterListenersBoutonsReponse() {
        this.boutonsReponse.forEach(bouton => {
            bouton.removeEventListener("click", this.validerReponse);
            bouton.addEventListener("click", this.validerReponse.bind(this));
        });
    }
    

    afficherPanneauFin() {
        this.cacherPanneaux();
        this.mettreAJourPointage()
        this.panneauFin.classList.remove("invisible");
        const boutonRecommencer = this.panneauFin.querySelector(".recommencer");
        // Ajout un event pour recharger la page
        boutonRecommencer.addEventListener("click", () => {
            location.reload();
    });
        
    }

    onFinTransition(evenement) {
        const declencheur = evenement.target;
        declencheur.removeEventListener("transitionend", this.onFinTransition);
        console.log("fin transition");
        //On nettoie les boutons
        declencheur.classList.remove("succes");
        declencheur.classList.remove("erreur");

        //On passe à la prochaine question
        this.afficherProchaineQuestion();
    }

    validerReponse(evenement) {
        // Récuperer la réponse d'un bouton
        const declencheur = evenement.target;
        declencheur.addEventListener("transitionend", this.onFinTransition);

        //Récupérer la réponse qui est associée au bouton
        //Le dataset contient tous les paramètres data dans le HTML
        const reponseChoisie = declencheur.dataset.btnReponse;

        // Valide si la réponse est bonne ou non
        const estValide = this.questionActuelle.validerReponse(reponseChoisie);

        //Désactiver les autres boutons
        // à faire

        if (estValide == true) {
            // Si la réponse est bonne
            // On change la couleur du bouton
            declencheur.classList.add("succes");
            // On peut modifier le texte
            // On augmente les points
            this.pointage.augmenterPointage(1);
            this.finalScore +=1;
            console.log(this.finalScore)
            // Lorsque la transition est terminée, on affiche la prochaine question
        } else {
            // Si la réponse  est mauvaise
            // On change la couleur du bouton
            declencheur.classList.add("erreur");
            // On peut modifier le texte
            // Lorsque la transition est terminée, on affiche la prochaine question
        }
        // Après l'animation afficher la prochaine question.

        //Ajouter une pause de 3-4 secondes avant de passer à la prochaine question
        // window.setTimeout(
        //     function () {
        //         const estValide = this.questionActuelle.validerReponse("Patate");
        //         console.log(estValide);
        //         this.afficherProchaineQuestion();
        //     }.bind(this),
        //     3000
        // );
    }
    mettreAJourPointage() {
        this.dataScore.textContent = `${this.finalScore}/5`;
        if(this.finalScore >3){
            this.messageFinal.textContent= 'Tu est un vrai ninja.'
        }else{
            this.messageFinal.textContent= 'C\'est bien, mais vous pouvez faire mieux.'
        }
    }
}
