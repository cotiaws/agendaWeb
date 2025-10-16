import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    RouterLink, //acessa a rotas do projeto
    CommonModule, //acesso a diretivas comuns do angular (ngIf, ngFor, etc)
    FormsModule, //componentes de formulário
    ReactiveFormsModule //validação de formulários
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {

  //atributos para armazenar mensagens de erro e sucesso
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //injeção de dependência
  private http = inject(HttpClient);

  //estrutura do formulário de cadastro de usuário
  formCriarUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    confirmarSenha: new FormControl('', [Validators.required]),
    termos: new FormControl(false, [Validators.requiredTrue])
  });

  //método chamado ao submeter o formulário
  onSubmit() {
    
    //limpar mensagens
    this.mensagemErro.set('');
    this.mensagemSucesso.set('');

    //verificar se as senhas não coincidem
    if (this.formCriarUsuario.value.senha !== this.formCriarUsuario.value.confirmarSenha) {
      this.mensagemErro.set('As senhas não coincidem.');     
      return;
    }

    //fazendo o post para o backend
    this.http.post(environment.apiUsuarios + '/criar', this.formCriarUsuario.value)
      .subscribe({
        next: (resposta : any) => { //captura a resposta de sucesso
          this.mensagemSucesso.set(`Parabéns ${resposta.nome}, sua conta foi criada com sucesso!`);
          this.formCriarUsuario.reset(); //limpa o formulário
        },
        error: (e) => { //captura a resposta de erro
          this.mensagemErro.set(e.error.errors);
        }
      });
  }
}
