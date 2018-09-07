import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { empty, throwError } from 'rxjs';
import {from} from 'rxjs/index';

// #################################################################
describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const servicio = new MedicosService(null);
// ---------------------------------------------------------------------------------
    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });
// ---------------------------------------------------------------------------------
    it('Init: debe de cargar los médicos', () => {
        // Un espia simula la obtencion de data a un servicio que todavia no existe 
        // entre otras cosas
        const medicos = ['medico1', 'medico2', 'medico 3'];
        spyOn( servicio, 'getMedicos').and.callFake( () => {
            return from( [medicos]);
        }); 
        // --> Este metodo no se llama automaticamente cuando usamos new, por eso se llama
        // aca
        componente.ngOnInit(); 
        expect(componente.medicos.length).toBeGreaterThan(0);
    });
// ---------------------------------------------------------------------------------
    it('Debe de llamar al servidor para agregar un medico', () => {
        const espia = spyOn(servicio, 'agregarMedico').and.callFake( ( medico ) => {
            return empty();
        });
        componente.agregarMedico();
        expect( espia ).toHaveBeenCalled();
    });
// ---------------------------------------------------------------------------------
    it('Debe agregar un nuevo medico al arreglo de medico', () => {
        const medico = { id: 1, nombre: 'Juan'};

        spyOn(servicio, 'agregarMedico').and.returnValue( 
            from([medico])
        );
        componente.agregarMedico();
        expect( componente.medicos.indexOf(medico) ).toBeGreaterThanOrEqual(0);
    });
// ---------------------------------------------------------------------------------
    it('Si falla la adicion, la propiedad mensaje error, debe ser igual al error del servicio', () => {
        const miError = 'No se pudo agregar el médico';
        spyOn( servicio, 'agregarMedico').and.returnValue( throwError( miError));

        componente.agregarMedico();
        expect( componente.mensajeError).toBe( miError);
    });
// ---------------------------------------------------------------------------------
    it('No debe de llamar al servidor para borrar un medico', () => {
        
        // Para no darle al aceptar manualmente en el prompt
        spyOn(window, 'confirm').and.returnValue(true);
        
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue( empty());

        componente.borrarMedico('1');
        expect( espia ).toHaveBeenCalledWith('1');
    });
// ---------------------------------------------------------------------------------
it('Debe de llamar al servidor para borrar un medico', () => {
        
    // Para no darle al aceptar manualmente en el prompt
    spyOn(window, 'confirm').and.returnValue(false);
    
    const espia = spyOn(servicio, 'borrarMedico').and.returnValue( empty());

    componente.borrarMedico('1');
    expect( espia ).not.toHaveBeenCalledWith('1');
});
// ---------------------------------------------------------------------------------

});
// #################################################################
