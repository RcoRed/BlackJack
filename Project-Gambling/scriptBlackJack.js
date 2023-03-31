function BlackJack(){
    this.counterCards = 0;
    this.bet = 0;
    this.done = false;
    this.deckManager = new DeckManager();
    this.dealerDeck = [];
    this.userDeck = [];
    this.dealerTotal = 0;
    this.user = null;
    this.inputBet = document.querySelector("#bet");
    this.betTotal = document.querySelector(".side h2");
    this.dealButton = document.querySelector("#deal-button");
    this.askButton = document.querySelector("#ask-button");
    this.standButton = document.querySelector("#stand-button");
    this.surrender = document.querySelector("#surrender");
}
BlackJack.prototype.start = function(){
    this.betTotal.innerHTML = "0";
    this.dealButton.disabled = false;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
    let name = null;
    let cash = null;
    do{
        name = prompt("Inserisci il tuo nome");
        if(name){
            break;
        }
        alert("IL NOME È E NON PUO NON ESSERE");
    } while(true)

    do{
        cash = prompt("Quanti soldi hai?");
        cash = +cash;
        if(cash > 50){
            break;
        }
        alert("VATTENE VIA PEZZENTE O INSERISCI ALTRI SOLDI");
    } while(true);

    this.user = new User(name, cash);

    if(this.user.nome.toLowerCase() == "riccardo"){
        alert(`Benvenuto babbo di minchia, comincerai con un saldo di ${cash}`);
    } else{
        alert(`Benvenuto Egregio ${name}, comincerai con un saldo di ${cash}`);
    }

    this.showUser();
    this.menu();
};
BlackJack.prototype.menu = function(){// ascolta gli eventi
    this.dealButton.addEventListener('click', this.deal.bind(this));
    this.askButton.addEventListener('click', this.hit.bind(this));
    this.standButton.addEventListener('click', this.stand.bind(this));
    this.surrender.addEventListener('click', this.stopGame.bind(this));
}
BlackJack.prototype.showCard = function(image){
    let div = document.querySelector(".user-cards");
    let card = document.createElement("img");
    card.src = image;
    div.appendChild(card);
}
BlackJack.prototype.showCardBot = function(image){
    let div = document.querySelector(".cpu");
    let card = document.createElement("img");
    card.src = image;
    div.appendChild(card);
}
BlackJack.prototype.showUser = function(){
    let div = document.querySelector("#data");
    div.removeChild(div.firstChild);
    let h3 = document.createElement("h3");
    h3.innerHTML = `${this.user.saldo}$ ${this.user.nome}`;
    div.appendChild(h3);
}
BlackJack.prototype.updateScore = function(score){
    let span = document.querySelector("#punteggio");
    span.innerHTML = score;
}
BlackJack.prototype.userBet = function(valore){
    if(valore < 10){//decide la puntata minima
        this.dealButton.disabled = false;
        this.standButton.disabled = true;
        this.askButton.disabled = true;
        let resultH2 = document.querySelector(".result");
        resultH2.innerHTML = `LA PUNTATA MINIMA È DI 10$`;
        return false;
    }

    if(!this.user.puntaSoldi(valore)){
        this.dealButton.disabled = false;
        this.standButton.disabled = true;
        this.askButton.disabled = true;
        let resultH2 = document.querySelector(".result");
        resultH2.innerHTML = `NON HAI ABBASTANZA SOLDI`;
        return false;
    }
    this.betTotal.innerHTML = valore*2;
    return true;
}
BlackJack.prototype.deal = function(){
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = "";
    this.betTotal.innerHTML = "0";

    if(this.counterCards>20){
        console.log("nuovo mazzo");
        this.deckManager = new DeckManager();
        this.counterCards = 0;
    }

    this.dealButton.disabled = true;
    this.standButton.disabled = false;
    this.askButton.disabled = false;

    this.bet = +this.inputBet.value;
    if(!this.userBet(this.bet)){
        return;
    }

    this.showUser();

    let card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);

    card = this.deckManager.getCard();
    this.showCardBot(card[1]);
    this.dealerDeck.push(card[0]);
    this.dealerTotal=this.count(this.dealerDeck);

    card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);

    if((this.userDeck[1] == 0 || this.userDeck[0] == 0) && (this.userDeck[1] == 1 || this.userDeck[0] == 1)){
        this.standButton.disabled = true;
        this.askButton.disabled = true;
        if(this.dealerDeck[0] == 11 || this.dealerDeck[0] == 0 || this.dealerDeck[0] == 1){
            this.controlBlackJack();
            return;
        }
        this.user.aggiungiSoldi(this.bet*2);
        let resultH2 = document.querySelector(".result");
        resultH2.innerHTML = `${this.user.nome} HA VINTO PER BLACK JACK!`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
    }

    this.counterCards += 3;
    this.user.total = this.count(this.userDeck);
    this.updateScore(this.user.total);
} // chiedi la prima carta
BlackJack.prototype.controlBlackJack = function(){
    let card = this.deckManager.getCard();
    this.showCardBot(card[1]);
    this.dealerDeck.push(card[0]);
    //this.dealerTotal=this.count(this.dealerDeck);
    if(this.dealerDeck[1] == 11 || this.dealerDeck[1] == 0 || this.dealerDeck[1] == 1){
        let resultH2 = document.querySelector(".result");
        resultH2.innerHTML = `IL DEALER HA VINTO. PER BLACK JACK.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    this.user.aggiungiSoldi(this.bet*2);
    this.showUser();
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = `${this.user.nome} HA VINTO PER BLACK JACK!`;
    let buttons = document.querySelectorAll("button");
    buttons.disabled = true;
}
BlackJack.prototype.count = function(deck){
    let total = 0;
    let asso = 0;
    for(let value of deck){
        if(value == 0){
            value = 10;
        }
        if(value == 1){
            total += 11;
            if(total > 21){
                total -= 10;
            }else{
                asso++;
            }
        }else{
            total += value;
        }
    }

    if(total > 21){
        for(let i = 0;i<asso;i++){
            total -= 10;
        }
        if(total > 21){
            this.endGame();
            return "bust";
        }
    }
    return total;
}
BlackJack.prototype.control = function(userScore){
    let resultH2 = document.querySelector(".result");
    if(userScore=="bust"){
        resultH2.innerHTML = `IL DEALER HA VINTO.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    if(!this.done){
        if(userScore==21){
            this.stand();
            return;
        }
        return;
    }
    this.done = false;
    if(this.dealerTotal=="bust" || userScore>this.dealerTotal){
        this.user.aggiungiSoldi(this.bet*2);
        this.showUser();
        resultH2.innerHTML = `${this.user.nome} HA VINTO!`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    if(userScore<this.dealerTotal){
        resultH2.innerHTML = `IL DEALER HA VINTO.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    this.user.aggiungiSoldi(this.bet);
    this.showUser();
    resultH2.innerHTML = `PAREGGIO.`;
    let buttons = document.querySelectorAll("button");
    buttons.disabled = true;
}
BlackJack.prototype.endGame = function(){
    this.dealButton.disabled = true;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
}
BlackJack.prototype.stopGame = function(){
    this.betTotal.innerHTML = "0";
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = "";
    this.dealerDeck  = [];
    this.userDeck = [];
    this.dealButton.disabled = false;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
    let imgCpu = document.querySelector(".cpu");
    while(imgCpu.firstChild){
        imgCpu.removeChild(imgCpu.firstChild);
    }
    let imgUser = document.querySelector(".user-cards");
    while(imgUser.firstChild){
        imgUser.removeChild(imgUser.lastChild);
    }
    let span = document.querySelector("#punteggio");

    span.innerHTML = 0;
}
BlackJack.prototype.hit = function(){
    this.counterCards++;
    this.showUser();
    let card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);

    this.user.total = this.count(this.userDeck);
    this.updateScore(this.user.total);
    this.control(this.user.total);
} // chiedi un'altra carta
BlackJack.prototype.stand = function(){
    this.done = true;
    this.dealButton.disabled = true;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
    do{
        this.counterCards++;
        let card = this.deckManager.getCard();
        this.showCardBot(card[1]);
        this.dealerDeck.push(card[0]);
        this.dealerTotal = this.count(this.dealerDeck);
    }while(this.dealerTotal<17)
    this.control(this.user.total);
} // chiedi il risultato

let game = new BlackJack();
game.start();