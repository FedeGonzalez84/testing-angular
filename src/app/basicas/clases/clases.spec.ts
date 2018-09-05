import { Jugador } from './clases';
describe('Pruebas de clase', ()=> {
    // Inicializo el objeto solo una vez
    let jugador = new Jugador();

    // Ciclo de vida de una prueba
    beforeAll( () => {  // --> Se ejecuta antes de todos los it
        // console.log('beforeAll');
    });
    beforeEach( () => {  // --> Se ejecuta antes de cada it
        // console.log('beforeEach');
        jugador = new Jugador();
    });
    afterAll( () => { // --> Se ejecuta despues de todos los it
        // console.log('afterAll');
    });
    afterEach( () => { // --> Se ejecuta despues de cada it
        // console.log('afterEach');
    });

    // Pruebas
    it('Debe retornar 80 de hp si recibe 20 de daño', () => {
        const res = jugador.recibeDanio(20);
        expect( res ).toBe(80);
    });
    it('Debe retornar 50 de hp si recibe 50 de daño', () => {
        const res = jugador.recibeDanio(50);
        expect( res ).toBe(50);
    });
    it('Debe retornar 0 de hp, si recibe 100 de daño o mas', () => {
        const res = jugador.recibeDanio(110);
        expect( res ).toBe(0);
    });

});

