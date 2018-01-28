import { Negociacao} from './Negociacao'

export class Negociacoes{
    private _negociacoes : Negociacao[] = [];

    adiciona(negociacao:Negociacao):void{       
        
        this._negociacoes.push(negociacao);
    }

   //when we set the method's type return it returns the type
    lista():Negociacao[]{
        //defensive programa
        return ([] as Negociacao[]).concat(this._negociacoes); //Cast
    }
}