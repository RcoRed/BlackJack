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