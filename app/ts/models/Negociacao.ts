export class Negociacao {

    constructor(readonly data:Date, readonly quantidade: number, readonly valor: number){
        // if(!data){
        //     throw new Error('data deve ser preenchida');
        // }
        // this._data = data;
        // this._quantidade =  quantidade;
        // this._valor = valor;
    }

    // get data(){
    //     return this._data;
    // }

    // get quantidade (){
    //     return this._quantidade;
    // }

    // get valor(){
    //     return this._valor;
    // }

    get voloume(){
        return this.quantidade * this.valor;
    }
}