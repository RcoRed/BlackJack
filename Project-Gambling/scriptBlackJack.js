function DeckManager(){
    const cuori = ["/carte_francesi/casso.png",
        "/carte_francesi/c2.png",
        "/carte_francesi/c3.png",
        "/carte_francesi/c4.png",
        "/carte_francesi/c5.png",
        "/carte_francesi/c6.png",
        "/carte_francesi/c7.png",
        "/carte_francesi/c8.png",
        "/carte_francesi/c9.png",
        "/carte_francesi/c10.png",
        "/carte_francesi/cj.png",
        "/carte_francesi/ck.png",
        "/carte_francesi/cq.png"];

    const fiori = ["/carte_francesi/fasso.png",
        "/carte_francesi/f2.png",
        "/carte_francesi/f3.png",
        "/carte_francesi/f4.png",
        "/carte_francesi/f5.png",
        "/carte_francesi/f6.png",
        "/carte_francesi/f7.png",
        "/carte_francesi/f8.png",
        "/carte_francesi/f9.png",
        "/carte_francesi/f10.png",
        "/carte_francesi/fj.png",
        "/carte_francesi/fk.png",
        "/carte_francesi/fq.png"];

    const picche = ["/carte_francesi/passo.png",
        "/carte_francesi/p2.png",
        "/carte_francesi/p3.png",
        "/carte_francesi/p4.png",
        "/carte_francesi/p5.png",
        "/carte_francesi/p6.png",
        "/carte_francesi/p7.png",
        "/carte_francesi/p8.png",
        "/carte_francesi/p9.png",
        "/carte_francesi/p10.png",
        "/carte_francesi/pj.png",
        "/carte_francesi/pk.png",
        "/carte_francesi/pq.png"];

    const quadri = ["/carte_francesi/qasso.png",
        "/carte_francesi/q2.png",
        "/carte_francesi/q3.png",
        "/carte_francesi/q4.png",
        "/carte_francesi/q5.png",
        "/carte_francesi/q6.png",
        "/carte_francesi/q7.png",
        "/carte_francesi/q8.png",
        "/carte_francesi/q9.png",
        "/carte_francesi/q10.png",
        "/carte_francesi/qj.png",
        "/carte_francesi/qk.png",
        "/carte_francesi/qq.png"];

        const cardSeed = [this.cuori, this.fiori, this.picche, this.quadri];

        function getCard(){            
            let randomValue = Math.floor(Math.random(13));
            let randomSeed = Math.floor(Math.random(4));

            let card = cardSeed[randomSeed[randomValue]];
            
            if(randomValue > 9){
                randomValue = 10;
            }

            let realCard = [randomSeed, randomValue, card];
            
            return realCard;
        }
}

function BlackJack(){
    let deck = new DeckManager();
    let deckDealer;
    let userDeck;    
    
    function start(){
        let nome = prompt("Inserisci il tuo nome");        

        do{
            let denaro = prompt("Quanti soldi hai?");

            if(denaro > 50){
                break;
            }

            alert("VATTENE VIA PEZZENTE O INSERISCI ALTRI SOLDI");            
        } while(true);

        let user = new User(nome, denaro);

        if(user.nome.toLowerCase() == "riccardo"){
            alert(`Benvenuto babbo di minchia, comincerai con un saldo di ${denaro}`);
        } else{
            alert(`Benvenuto Egregio ${nome}, comincerai con un saldo di ${denaro}`);
        }

        this.game();
    }

    function showCard(){
        return deck.getCard();
    }

    function userBet(){}

    function deal(){} // chiedi la prima carta

    function hit(){} // chiedi un'altra carta

    function stand(){} // chiedi il risultato

    function game(){ // ascolta gli eventi
        
    }
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

