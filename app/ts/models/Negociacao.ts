import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao> {

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

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.voloume}`
        );
    }

    ehIgual(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}

/*
colocando um novo commit para test.
*/