function User(nome, saldo){
    this.nome = nome;
    this.saldo = saldo;
    this.total = 0;
}
User.prototype.puntaSoldi = function(value){
    if(value <= this.saldo){
        this.saldo -= value;
        return true;
    }
    return false;
}
User.prototype.aggiungiSoldi = function(valore){
    this.saldo += valore;
}
//si capisce abbastanza questa classe