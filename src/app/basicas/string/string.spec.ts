import { mensaje } from './string';

// TEST DE STRING

// Sirve para agrupar todo lo referente a una prueba especifica
describe('Pruebas de string', () => {

    // Hace un test en concreto
    it('Debe de regresar un string', () => {
        const resp = mensaje('Federico');
        // Lo que se espera de la prueba
        expect( typeof resp ).toBe('string');
    });

    it('Debe de regresar un saludo con el nombre enviado', () => {
        
        const nombre = 'Federico';
        const resp = mensaje(nombre);
        // Lo que se espera de la prueba
        expect( resp ).toContain(nombre );
    });



});
