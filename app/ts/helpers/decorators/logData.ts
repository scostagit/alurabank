function logData(formato: string = '') {

    return function(target: any, key: string, descriptor: PropertyDescriptor) {

         const metodoOriginal = descriptor.value;
                 // aqui vem a lógica do decorator
         return metodoOriginal;
    }
}