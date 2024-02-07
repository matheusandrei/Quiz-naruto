class Question {
    constructor(question, reponse, optionsReponse, conteneurHTML) {
        this.question = question;
        this.reponse = reponse;
        this.optionsReponse = optionsReponse;
        this.conteneurHTML = conteneurHTML;
        this.reponseCorrect=this.conteneurHTML.querySelector("[data-reponse]")
        this.questionTexteHTML = this.conteneurHTML.querySelector("[data-question]");
        this.dataBtnReponse= this.conteneurHTML.querySelectorAll("[data-btn-reponse]");
        console.log(this.dataBtnReponse)
        this.afficherQuestion();
        
    }

    afficherQuestion() {
        this.questionTexteHTML.textContent = this.question;
        this.reponseCorrect.setAttribute("data-reponse", this.reponse); 

        for(let i=0;i<this.optionsReponse.length;i++){
            this.dataBtnReponse[i].textContent=this.optionsReponse[i];
        }
    }

    validerReponse(reponseChoisie) {
        if (reponseChoisie == this.reponse) {
            return true;
        } else {
            return false;
        }
    }
}
