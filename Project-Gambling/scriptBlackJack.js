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
    this.dealerDeck = [];
    this.userDeck = [];
    this.dealButton = document.querySelector("#deal-button");
    this.askButton = document.querySelector("#ask-button");
    this.standButton = document.querySelector("#stand-button");
    this.surrender = document.querySelector("#surrender");

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
        }
        this.menu();
    }

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
        }
        if(total > 21){
            return "bust";
        }
        return total;
    }

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
}

let game = new BlackJack();
game.start();