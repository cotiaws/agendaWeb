import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTarefas } from './consultar-tarefas';

describe('ConsultarTarefas', () => {
  let component: ConsultarTarefas;
  let fixture: ComponentFixture<ConsultarTarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarTarefas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarTarefas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
