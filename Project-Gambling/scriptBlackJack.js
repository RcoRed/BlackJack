function DeckManager(){
    this.cuori = ["carte_francesi/casso.png",
        "carte_francesi/c2.png",
        "carte_francesi/c3.png",
        "carte_francesi/c4.png",
        "carte_francesi/c5.png",
        "carte_francesi/c6.png",
        "carte_francesi/c7.png",
        "carte_francesi/c8.png",
        "carte_francesi/c9.png",
        "carte_francesi/c10.png",
        "carte_francesi/cj.png",
        "carte_francesi/cq.png",
        "carte_francesi/ck.png",];

    this.fiori = ["carte_francesi/fasso.png",
        "carte_francesi/f2.png",
        "carte_francesi/f3.png",
        "carte_francesi/f4.png",
        "carte_francesi/f5.png",
        "carte_francesi/f6.png",
        "carte_francesi/f7.png",
        "carte_francesi/f8.png",
        "carte_francesi/f9.png",
        "carte_francesi/f10.png",
        "carte_francesi/fj.png",
        "carte_francesi/fq.png",
        "carte_francesi/fk.png"];

    this.picche = ["carte_francesi/passo.png",
        "carte_francesi/p2.png",
        "carte_francesi/p3.png",
        "carte_francesi/p4.png",
        "carte_francesi/p5.png",
        "carte_francesi/p6.png",
        "carte_francesi/p7.png",
        "carte_francesi/p8.png",
        "carte_francesi/p9.png",
        "carte_francesi/p10.png",
        "carte_francesi/pj.png",
        "carte_francesi/pq.png",
        "carte_francesi/pk.png"];

    this.quadri = ["carte_francesi/qasso.png",
        "carte_francesi/q2.png",
        "carte_francesi/q3.png",
        "carte_francesi/q4.png",
        "carte_francesi/q5.png",
        "carte_francesi/q6.png",
        "carte_francesi/q7.png",
        "carte_francesi/q8.png",
        "carte_francesi/q9.png",
        "carte_francesi/q10.png",
        "carte_francesi/qj.png",
        "carte_francesi/qq.png",
        "carte_francesi/qk.png"];

    this.cardSeed = [this.cuori, this.fiori, this.picche, this.quadri];


}
DeckManager.prototype.getCard = function(){
        let randomValue = Math.floor(Math.random()*13);
        let randomSeed = Math.floor(Math.random()*4);

        let card = this.cardSeed[randomSeed][randomValue];
        console.log(randomValue);
        if(randomValue > 8){
            randomValue = 10;
        }else{
            randomValue++;
        }
        console.log(randomValue);

        let realCard = [randomValue, card];

        return realCard;
}

function BlackJack(){
    this.done = false;
    this.deckManager = new DeckManager();
    this.dealerDeck = [];
    this.userDeck = [];
    this.dealerTotal = 0;
    this.user = null;
    this.dealButton = document.querySelector("#deal-button");
    this.askButton = document.querySelector("#ask-button");
    this.standButton = document.querySelector("#stand-button");
    this.surrender = document.querySelector("#surrender");
}
BlackJack.prototype.start = function(){
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
BlackJack.prototype.updateScore = function(score){
    let span = document.querySelector("#punteggio");
    span.innerHTML = score;
}
BlackJack.prototype.userBet = function(){

}
BlackJack.prototype.deal = function(){
    this.dealButton.disabled = true;
    this.standButton.disabled = false;
    this.askButton.disabled = false;

    console.log("user1");
    let card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);

    console.log("bot1");
    card = this.deckManager.getCard();
    this.showCardBot(card[1]);
    this.dealerDeck.push(card[0]);
    this.dealerTotal=card[0];

    console.log("user2");
    card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);

    this.user.total = this.count(this.userDeck);
    this.updateScore(this.user.total);
} // chiedi la prima carta
BlackJack.prototype.count = function(deck){
    let total = 0;
    let asso = false;
    console.log("dentro count");
    console.log(total);
    for(let value of deck){
        if(value == 1){
            console.log("dentro in = 1");
            asso = true;
            total += 11;
            if(total > 21){
                console.log("dentro in > 21");
                total -= 10;
            }
        }else{
            console.log("dentro else");
            console.log(total);
            total += value;
            console.log("dentro else dopo addizione");
            console.log(total);
        }
    }
    console.log(total);

    if(total > 21){
        console.log("dentro controllo");
        if(asso){
            console.log("dentro asso");
            total -= 10;
        }
        if(total > 21){
            console.log("dentro secondo controllo");
            this.endGame();
            return "bust";
        }
        console.log("total dentro if");
        console.log(total);
    }
    console.log("total finale");
    console.log(total);
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
        return;
    }
    if(this.dealerTotal=="bust" || userScore>this.dealerTotal){
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
        let card = this.deckManager.getCard();
        this.showCardBot(card[1]);
        this.dealerDeck.push(card[0]);
        this.dealerTotal = this.count(this.dealerDeck);
    }while(this.dealerTotal<17)
    this.control(this.user.total);
} // chiedi il risultato

function User(nome, saldo){
    this.nome = nome;
    this.saldo = saldo;
    this.total = 0;
}
User.prototype.puntaSoldi = function(){
    this.saldo -= valore;
}
User.prototype.aggiungiSoldi = function(){
    this.saldo += valore;
}

let game = new BlackJack();
game.start();