import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {

  //Atributos
  tarefas = signal<any[]>([]);

  //injeção de dependência da bilbioteca HttpClient
  private http = inject(HttpClient);

  //estrutura do formulário
  formConsulta = new FormGroup({
    dataMin : new FormControl('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required])
  });

  //função para capturar o evento de submit do formulário
  consultarTarefas() {

    //capturar os campos do formulário
    const dataMin = this.formConsulta.value.dataMin;
    const dataMax = this.formConsulta.value.dataMax;

    //fazendo uma chamada GET para consultar as tarefas na API
    this.http.get(environment.apiTarefas + "/" + dataMin + "/" + dataMax)
      .subscribe({ //aguardando o retorno da API
        next: (response) => { //capturando se for sucesso
          //armazenando os dados obtidos no signal
          this.tarefas.set(response as any[]);
        },
        error: (e) => { //capturando se for erro
          console.log(e.error);
        }
      });      
  }

  //função para excluir uma tarefa selecionada
  excluirTarefa(id : string) {

    //Perguntar se o usuário realmente deseja excluir a tarefa?
    if(confirm('Deseja realmente excluir a tarefa selecionada?')) {

      //enviando a requisição de DELETE para a API
      this.http.delete(environment.apiTarefas + "/" + id, { responseType: 'text' })
        .subscribe({ //aguardando a resposta da API
          next: (response) => { //capturar resposta de sucesso
            alert(response); //exibir mensagem de sucesso
            this.consultarTarefas(); //executar a consulta novamente
          },
          error: (e) => { //capturar resposta de erro
            console.log(e.error);
          }
        });
    }
  }
}
