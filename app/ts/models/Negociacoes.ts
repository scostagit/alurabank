import { Negociacao} from './Negociacao';
import { MeuObjeto } from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes>{
    private _negociacoes : Negociacao[] = [];

    constructor(){
        
    }

    adiciona(negociacao:Negociacao):void{       
        
        this._negociacoes.push(negociacao);
    }

   //when we set the method's type return it returns the type
    lista():Negociacao[]{
        //defensive programa
        return ([] as Negociacao[]).concat(this._negociacoes); //Cast
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(Negociacoes : Negociacoes): boolean {

        return JSON.stringify(this.paraTexto()) === JSON.stringify( Negociacoes.paraTexto());
    }
}