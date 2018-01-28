import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View <T> {

    // mudou para protected!
    // protected _elemento: Element;
    protected _elemento: JQuery;
    private _escapar: boolean;

    //? optinal paramater.   constructor(seletor: string, escapar?: boolean)     
    //Opptnal parameter seniorzao: constructor(seletor: string, escapar: boolean = false) 
    constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
        
    //     let nome: string = '';
    //    // compile error becuse we atictved strictNullChecks = true
    //     nome = null;
    }

    update(model: T) {

        // this._elemento.innerHTML = this.template(model);
        let template = this.template(model);
        if(this._escapar) 
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._elemento.html(template);
    }

    abstract template(model: T): string; //quem herdar vai tem que tapar esse burado.

}