import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink, //navegação de rotas
    CommonModule, // diretivas básicas do Angular
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

    //Atributos
    nome = signal<string>(''); //nome do usuário autenticado

    //função executada ao abrir o componente
    ngOnInit() {       
        //capturar os dados do usuário autenticado
        const authData = sessionStorage.getItem('auth');
        const usuario = JSON.parse(authData!);
        this.nome.set(usuario.nome);
    }

    //método para deslogar o usuário
    logout() {
      if(confirm('Deseja realmente sair do sistema?')) {
        sessionStorage.removeItem('auth'); //remove os dados do usuário do sessionStorage
        window.location.href = '/pages/autenticar-usuario'; //redireciona para a página de login
      }       
    }
}
