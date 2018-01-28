/*
É utilizando como @NomeDoDecorator.

É verdade. Tanto isso é verdade que precisamos habilitar a propriedade "experimentalDecorators": true 
no arquivo tsconfig.json.

Quando criamos um decorator, um dos parâmetros mais importantes é o descriptor.
Nos dá acesso a implementação do método decorado através de descritor.value.
 */

export function logarTempoDeExecucao(emSegundos: boolean = false) {

/*
A função retornada não recebe três parâmetros por acaso. O primeiro target é aquele que possui uma referência 
para o elemento cujo método foi decorado por logarTempoDeExecucao. O segundo parâmetro é uma string que nos 
retorna o nome do método decorado. Por fim, o descriptor nos dará acesso ao método que desejamos modificar 
sua execução, através de descriptor.value. */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        /*
        O valor de descriptor.value será function(...args: any[]). Isso se dá dessa forma, porque o método 
        que estamos sobrescrevendo pode receber zero, um ou mais parâmetros de tipos que desconhecemos. 
        Usamos ... para indicar um REST PARAMETER, algo que não é exclusivo do TypeScript, mas do ES2015:
         */      

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let divisor = 1;
            let unidade = 'milisegundos'
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            console.log('-----------------------')
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            console.log(`Resultado do método: ${JSON.stringify(resultado)}` )
            const t2 = performance.now();
            console.log(`${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
            console.log('-----------------------')
            return resultado;
        }
        return descriptor;
        /*
        Fazemos metodoOriginal.apply(this, args) para invocar o método original, capturar seu resultado, caso 
        exista e retorná-lo. Ainda não há a nossa lógica do teste de performance. Por enquanto vamos deixar 
        assim. Não deve ocorrer nenhum erro e o comportamento da nossa aplicação deve continuar o mesmo. 
        Mas para que possamos utilizá-lo, vamos exportá-lo através de um barril e importá-lo em View.
         */

    }

}