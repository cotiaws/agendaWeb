import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  //Atributos
  categorias = signal<any[]>([]); //array de categorias vazio
  mensagem = signal<string>(''); //mensagem de texto

  //Injeção de dependências
  private http = inject(HttpClient);

  //Função executada ao iniciar o componente
  ngOnInit() {
      //Fazendo uma requisição para obter as categorias
      this.http.get(environment.apiCategorias)
        .subscribe((response) => { //aguardando a resposta da api
          //armazenarndo a resposta na variável categorias
          this.categorias.set(response as any[]);
        });
  }

  //Criando o formulário
  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]), //campo nome
    data: new FormControl('', [Validators.required]), //campo data
    prioridade: new FormControl('', [Validators.required]), //campo prioridade
    categoriaId: new FormControl('', [Validators.required]), //campo categoriaId
  });

  //Criando a função para capturar o submit do formulário
  cadastrarTarefa() {
    
    //fazendo uma requisição POST para o endpoint de tarefas
    this.http.post(environment.apiTarefas, this.formCadastro.value, {
      responseType: 'text'
    }).subscribe({ //aguardando a resposta da api
      next: (response) => { //capturando a resposta de sucesso (HTTP 201)
        this.formCadastro.reset(); //limpar os campos do formulário
        this.mensagem.set(response); //guardar a mensagem de sucesso
      },
      error: (e) => { //capturando a resposta de erro (HTTP 500)
        this.mensagem.set(e.error); //guardar a mensagem de erro
      }
    });
    
  }
}
