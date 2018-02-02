import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController{

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    // private _inputData :HTMLInputElement; 
    // private _inputQuantidade :HTMLInputElement;
    // private _inputValor:HTMLInputElement;
    // private _inputData :JQuery; 
    // private _inputQuantidade :JQuery;
    // private _inputValor:JQuery;
    private _negociacoes  = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _m = new Negociacao(new Date(),1,1);
       // mais uma propriedade da classe!
     private _service = new NegociacaoService();
  
     
   //Element is type from HMTL page. Element is a generic type. it does not have properties
   //it has a contentText.

   //HTMLInputElement: is a Element of type input. is a especif type. it has a value property.
    
    constructor(){
        // this._inputData = <HTMLInputElement> document.querySelector("#data");//Castr in typeScript <HTMLInputElement>
        // this._inputQuantidade = <HTMLInputElement>document.querySelector("#quantidade");
        // this._inputValor = <HTMLInputElement>document.querySelector("#valor");

        // this._inputData = $("#data");
        // this._inputQuantidade = $("#quantidade");
        // this._inputValor = $("#valor");

        this._negociacoesView.update(this._negociacoes);
    }

    // @logarTempoDeExecucao(true)
    // adiciona(event:Event){
    @throttle()
    adiciona(){
        const t1 = performance.now();   
        //  event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

 
        const negociacao = new Negociacao(
            // // new Date(this._inputData.value.replace(/-/g,',')),
            // // parseInt(this._inputQuantidade.value),
            // // parseFloat(this._inputValor.value)

            new Date(this._inputData.val().replace(/-/g,',')),
            parseInt(this._inputQuantidade.val()),
             parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        /*this._negociacoes.lista().length =0; //limpa o array

        this._negociacoes.lista().forEach(neg => {
            console.log(neg.data);
            console.log(neg.quantidade);
            console.log(neg.valor);
        });*/        
       
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');       
        
        imprime(negociacao, this._negociacoes);

        const t2 = performance.now();
        console.log(`Tempo de execução do método adiciona(): ${(t2 - t1)/1000} segundos`);
    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

//     @throttle()
//     importarDados() {

//         // function isOk(res: Response) {

//         //     if(res.ok) {
//         //         return res;
//         //     } else {
//         //         throw new Error(res.statusText);
//         //     }
//         // }

//         // fetch('http://localhost:8080/dados')
//         //     .then(res => isOK(res))
//         //     .then(res => res.json())
//         //     .then((dados: NegociacaoParcial[]) => {
//         //         dados
//         //             .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
//         //             .forEach(negociacao => this._negociacoes.adiciona(negociacao));
//         //         this._negociacoesView.update(this._negociacoes);
//         //     })
//         //     .catch(err => console.log(err.message));       
        
//         this._service
//             .obterNegociacoes(res => {
//                 if(res.ok) return res;
//                 throw new Error(res.statusText);
//             })
//             .then(negociacoesParaImportar => {

//                 const negociacoesJaImportadas = this._negociacoes.lista();

//                 negociacoesParaImportar
//                     .filter(negociacao => 
//                         !negociacoesJaImportadas.some(jaImportada => 
//                             negociacao.ehIgual(jaImportada)))
//                     .forEach(negociacao => 
//                     this._negociacoes.adiciona(negociacao));

//                 this._negociacoesView.update(this._negociacoes);
//             })
//             .catch(err => {
//                 this._mensagemView.update(err);
//            });
//     }
// }

@throttle()
async importarDados() {
    try {
        // usou await antes da chamada de this.service.obterNegociacoes()
          //awita: quando esse codigo e executado ele e ritarado do file de execucao do javascript e 
          //posto no limbo. quando recebe o retorno ele executado o metodo novamente com o retorno 
          //do metodo sem a necissade do .then da promisse.
            const negociacoesParaImportar = await this._service 
                .obterNegociacoes(res => {

                    if(res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                });

            const negociacoesJaImportadas = this._negociacoes.lista();

            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch(err) {
            this._mensagemView.update(err.message);
        }
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado, 
}