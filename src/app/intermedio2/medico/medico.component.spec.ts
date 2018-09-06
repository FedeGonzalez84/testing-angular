import { MedicoComponent } from './medico.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MedicoService } from './medico.service';
import { HttpClientModule } from '@angular/common/http';
// #################################################################
// Prueba de integracion
describe('Medico Component', () => {

    let componente: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;
// ------------------------------------------------------------------------ 
    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations:[ MedicoComponent],
            providers: [MedicoService]
        });
        fixture = TestBed.createComponent( MedicoComponent);
        componente = fixture.componentInstance;
    });
// -----------------------------------------------------------------
    it('Debe de crearse el componente', () => {
        expect( componente ).toBeTruthy();
    });
// -----------------------------------------------------------------
    it('Debe de retornar el nombre del medico', () => {
        const nombre = 'Juan';
        const res = componente.saludarMedico(nombre);
        expect(res).toContain(nombre);
    });
// -----------------------------------------------------------------
    

});
