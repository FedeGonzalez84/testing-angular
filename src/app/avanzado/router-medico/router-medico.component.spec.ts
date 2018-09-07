import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';

// Simula el navigate del servicio router de Angular
class FakeRouter {
  navigate( params ) {

  }
}
// Simula el activatedRoute del servicio de Angular
class FakeActivatedRoute {
  // params: Observable<any> = empty();
  private subject = new Subject();
  
  push(valor){
    this.subject.next( valor );
  }
  get params() {
    return this.subject.asObservable();
  }
}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterMedicoComponent ],
      providers: [
        // --> Esto le esta diciendo que reemplace Router y Activated por las clases fakes
        // --> Asi evitamos que el test pruebe todo los servicios de Router y ActivatedRoute
        { provide: Router, useClass: FakeRouter }, 
        { provide: ActivatedRoute, useClass: FakeActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de redireccionar a medico cuando se guarde', () => {
    const router = TestBed.get(Router);
    const spy = spyOn( router, 'navigate');

    component.guardarMedico();
    expect( spy ).toHaveBeenCalledWith(['medico','123']);
  });
  it('Debe de color el ID = NUEVO', () => {
    component = fixture.componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);

    activatedRoute.push( { id: 'nuevo' });
    expect(component.id).toBe('nuevo');
  });
});
