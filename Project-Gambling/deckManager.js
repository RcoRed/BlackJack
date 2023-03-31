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
    let card = null;
    let randomValue = null;
    let randomSeed = null;
    do{
        randomValue = Math.floor(Math.random()*13);
        randomSeed = Math.floor(Math.random()*4);
        if(this.cardSeed[randomSeed][randomValue]){
            card = this.cardSeed[randomSeed][randomValue];
            this.cardSeed[randomSeed][randomValue] = null;
            break;
        }
    }while(true)

    if(randomValue > 9){
        randomValue = 0;
    }else{
        randomValue++;
    }

    let realCard = [randomValue, card];

    return realCard;
}