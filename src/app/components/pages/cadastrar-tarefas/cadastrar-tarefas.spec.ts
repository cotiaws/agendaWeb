import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTarefas } from './cadastrar-tarefas';

describe('CadastrarTarefas', () => {
  let component: CadastrarTarefas;
  let fixture: ComponentFixture<CadastrarTarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarTarefas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarTarefas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
