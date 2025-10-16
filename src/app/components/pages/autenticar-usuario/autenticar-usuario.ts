import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  //Atributos
  mensagemErro = signal<string>('');

  //Injeção de dependência
  private http = inject(HttpClient);
  private router = inject(Router);

  //estrutura do formulário
  formAutenticacao = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para capturar o submit do formulário
  autenticarUsuario() {
    //enviando uma requisição POST para a API de autenticação
    this.http.post(environment.apiUsuarios + '/autenticar', this.formAutenticacao.value)
      .subscribe({ //aguardando a resposta da API
        next: (resposta: any) => { //capturando sucesso
          
          //salvar as informações do usuário no Session Storage
          sessionStorage.setItem('auth', JSON.stringify(resposta));

          //redirecionar o usuário para a página de dashboard
          this.router.navigate(['/pages/dashboard']);
        }, 
        error: (e) => { //capturando erro
          this.mensagemErro.set(e.error.errors);
        } 
      });
  }

}
