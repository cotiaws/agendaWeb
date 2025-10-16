import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarefas } from './editar-tarefas';

describe('EditarTarefas', () => {
  let component: EditarTarefas;
  let fixture: ComponentFixture<EditarTarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTarefas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTarefas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
