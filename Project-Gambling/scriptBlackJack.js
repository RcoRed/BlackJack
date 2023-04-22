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

    this.getCard = function(){
        let randomValue = Math.floor(Math.random()*13);
        let randomSeed = Math.floor(Math.random()*4);

        let card = this.cardSeed[randomSeed][randomValue];

        if(randomValue > 8){
            randomValue = 10;
        }else{
            randomValue++;
        }

        let realCard = [randomValue, card];

        return realCard;
    }
}

function BlackJack(){
    this.deckManager = new DeckManager();
<<<<<<< HEAD
    this.dealerDeck = [];
    this.userDeck = [];
=======
    this.user = null;

    this.counterCards = 0;
    this.bet = 0;
    this.done = false;
    this.dealerDeck = [];
    this.userDeck = [];
    this.dealerTotal = 0;

    this.inputBet = document.querySelector("#bet");
    this.betTotal = document.querySelector(".side h2");

>>>>>>> origin/main
    this.dealButton = document.querySelector("#deal-button");
    this.askButton = document.querySelector("#ask-button");
    this.standButton = document.querySelector("#stand-button");
    this.surrender = document.querySelector("#surrender");
<<<<<<< HEAD

    this.start = function() {
        this.standButton.disabled = true;
        let name = undefined;
        let cash = undefined;
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

        let user = new User(name, cash);

        if(user.nome.toLowerCase() == "riccardo"){
            alert(`Benvenuto babbo di minchia, comincerai con un saldo di ${cash}`);
        } else{
            alert(`Benvenuto Egregio ${name}, comincerai con un saldo di ${cash}`);
=======
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

BlackJack.prototype.userBet = function(valore){// controlla il bet dell'utente
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

BlackJack.prototype.deal = function(){// chiedi la prime carta
    //reset
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = "";
    this.betTotal.innerHTML = "0";
    //carte
    if(this.counterCards>20){
        console.log("nuovo mazzo");
        this.deckManager = new DeckManager();
        this.counterCards = 0;
    }
    //bottoni
    this.dealButton.disabled = true;
    this.standButton.disabled = false;
    this.askButton.disabled = false;
    //controllo user bet
    this.bet = +this.inputBet.value;
    if(!this.userBet(this.bet)){
        return;
    }
    //aggiorna visivamente cash dopo la puntata
    this.showUser();
    //prima carta
    let card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);
    //seconda
    card = this.deckManager.getCard();
    this.showCardBot(card[1]);
    this.dealerDeck.push(card[0]);
    this.dealerTotal=this.count(this.dealerDeck);
    //terza
    card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);
    //controllo BlackJack
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
    //conta e fa l'update dello score
    this.counterCards += 3;
    this.user.total = this.count(this.userDeck);
    this.updateScore(this.user.total);
}
BlackJack.prototype.controlBlackJack = function(){//controlla se il dealer vince contro il blackJack o no
    //Bot pesca seconda carta
    let card = this.deckManager.getCard();
    this.showCardBot(card[1]);
    this.dealerDeck.push(card[0]);
    //controlla blackJack del dealer
    if(this.dealerDeck[1] == 11 || this.dealerDeck[1] == 0 || this.dealerDeck[1] == 1){
        let resultH2 = document.querySelector(".result");
        resultH2.innerHTML = `IL DEALER HA VINTO. PER BLACK JACK.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    //se arriviamo qui il dealer ha perso automaticamente
    this.user.aggiungiSoldi(this.bet*2);
    //aggiorno visivamente saldo utente
    this.showUser();
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = `${this.user.nome} HA VINTO PER BLACK JACK!`;
    let buttons = document.querySelectorAll("button");
    buttons.disabled = true;
}

BlackJack.prototype.count = function(deck){//conta valore del deck
    let total = 0;
    let asso = false;
    //cicla sul deck
    for(let value of deck){
        //ritrasforma le figure nei loro valori effettivi
        if(value == 0){
            value = 10;
        }
        //controlla la presenza di asso
        if(value == 1){
            total += 11;
            //si ricorda di aver letto un asso
            asso = true;
            //se sfora allora l'asso diventa automaticamente 1
            if(total > 21){
                total -= 10;
            }
        }else{
            //se non è un asso aggiunge il vaore della carta al totale
            total += value;
>>>>>>> origin/main
        }
        this.menu();
    }
<<<<<<< HEAD

    this.menu = function(){ // ascolta gli eventi
        this.dealButton.addEventListener('click', deal.bind(this));
        this.askButton.addEventListener('click', hit.bind(this));
        this.standButton.addEventListener('click', stand.bind(this));
    }

    function showCard(image){
        let div = document.querySelector(".user-cards");
        let card = document.createElement("img");
        card.src = image;
        div.appendChild(card);
    }

    function userBet(){}

    function deal(){
        this.dealButton.disabled = false;
        this.standButton.disabled = false;

        let card = this.deckManager.getCard();
        showCard(card[1]);
        this.userDeck.push(card[0]);
        card = this.deckManager.getCard();
        //showCard(card[1]); //dovrà stampare la carta coperta per la cpu????
        this.dealerDeck.push(card[0]);

        control(this.userDeck);


    } // chiedi la prima carta

    function control(deck){
        let total;
        for(let value of deck){
            if(value == 1){
                total += 11;
                if(total > 21){
                    total - 10;
                }
            }else{
                total += value;
            }
=======
    //controllo dello sforamento
    if(total > 21){
        //se sfora allora "il primo" asso diventa automaticamente 1
        if(asso){
            total -= 10;
>>>>>>> origin/main
        }
        //se il totale sfora il gioco termina
        if(total > 21){
            return "bust";
        }
        return total;
    }
<<<<<<< HEAD

    function hit(){} // chiedi un'altra carta

    function stand(){} // chiedi il risultato
}

function User(nome, saldo){
    this.nome = nome;
    this.saldo = saldo;

    function puntaSoldi(valore){
        this.saldo -= valore;
    }

    function aggiungiSoldi(valore){
        this.saldo += valore;
    }
=======
    //se il totale di user è 21 lo vede e non permette più al giocatore di chiedere carta, stand automatico
    if(total == 21){
        this.stand();
        return;
    }
    return total;
}

BlackJack.prototype.control = function(userScore){//controlla chi è il vincitore
    let resultH2 = document.querySelector(".result");
    //se lo score di user è bust allora ha perso
    if(userScore=="bust"){
        resultH2.innerHTML = `IL DEALER HA VINTO.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    //se l'utente non ha schiacciato stand allora NON deve fare gli altri controlli
    if(!this.done){
        return;
    }
    //resetta il done a false
    this.done = false;
    //controlla se l'utente ha vinto
    if(this.dealerTotal=="bust" || userScore>this.dealerTotal){
        this.user.aggiungiSoldi(this.bet*2);
        this.showUser();
        resultH2.innerHTML = `${this.user.nome} HA VINTO!`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    //controlla se il dealer ha vinto
    if(userScore<this.dealerTotal){
        resultH2.innerHTML = `IL DEALER HA VINTO.`;
        let buttons = document.querySelectorAll("button");
        buttons.disabled = true;
        return;
    }
    //se nessuna delle precendi è vera allora pareggio
    this.user.aggiungiSoldi(this.bet);
    this.showUser();
    resultH2.innerHTML = `PAREGGIO.`;
    let buttons = document.querySelectorAll("button");
    buttons.disabled = true;
}

BlackJack.prototype.endGame = function(){//verrà richiamato automaticamente da count() quando l'utente sfora 21
    this.dealButton.disabled = true;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
}

BlackJack.prototype.stopGame = function(){//resetta la mano quando si clicca sul pulsante continua
    this.betTotal.innerHTML = "0";
    let resultH2 = document.querySelector(".result");
    resultH2.innerHTML = "";
    this.dealerDeck  = [];
    this.userDeck = [];
    this.dealButton.disabled = false;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
    //rimuove le carte della cpu
    let imgCpu = document.querySelector(".cpu");
    while(imgCpu.firstChild){
        imgCpu.removeChild(imgCpu.firstChild);
    }
    //rimuove le carte dell'utente
    let imgUser = document.querySelector(".user-cards");
    while(imgUser.firstChild){
        imgUser.removeChild(imgUser.lastChild);
    }
    let span = document.querySelector("#punteggio");

    span.innerHTML = 0;
}

BlackJack.prototype.hit = function(){//darà una carta all'utente
    this.counterCards++;
    this.showUser();
    //prende la carta e la imposta all'utente
    let card = this.deckManager.getCard();
    this.showCard(card[1]);
    this.userDeck.push(card[0]);
    //solito conteggio e controllo
    this.user.total = this.count(this.userDeck);
    this.updateScore(this.user.total);
    this.control(this.user.total);
}

BlackJack.prototype.stand = function(){//l'utente non vuole più carte
    this.done = true;
    this.dealButton.disabled = true;
    this.standButton.disabled = true;
    this.askButton.disabled = true;
    //diamo le carte al bot finche non arriva a 17
    do{
        this.counterCards++;
        let card = this.deckManager.getCard();
        this.showCardBot(card[1]);
        this.dealerDeck.push(card[0]);
        this.dealerTotal = this.count(this.dealerDeck);
    }while(this.dealerTotal<17)
    //controllo di chi ha vinto
    this.control(this.user.total);
>>>>>>> origin/main
}

BlackJack.prototype.showCard = function(image){//farà vedere le carte dell'utente
    let div = document.querySelector(".user-cards");
    let card = document.createElement("img");
    card.src = image;
    div.appendChild(card);
}
BlackJack.prototype.showCardBot = function(image){//farà vedere le carte del bot
    let div = document.querySelector(".cpu");
    let card = document.createElement("img");
    card.src = image;
    div.appendChild(card);
}
BlackJack.prototype.showUser = function(){//aggiorna visivamente soldi dell'utente
    let div = document.querySelector("#data");
    div.removeChild(div.firstChild);
    let h3 = document.createElement("h3");
    h3.innerHTML = `${this.user.saldo}$ ${this.user.nome}`;
    div.appendChild(h3);
}
BlackJack.prototype.updateScore = function(score){//update visivo dello score
    let span = document.querySelector("#punteggio");
    span.innerHTML = score;
}
//lancio del gioco
let game = new BlackJack();
game.start();