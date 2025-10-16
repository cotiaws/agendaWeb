import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
   // Recupera do sessionStorage
  const authData = sessionStorage.getItem('auth');

  if (authData) { //tem algo no sessionStorage
    try {

      // Converte de volta para objeto json
      const usuario = JSON.parse(authData);

      // Verifica se há token
      const token = usuario.accessToken;
      const exp = new Date(usuario.dataHoraExpiracao);

      // Agora
      const agora = new Date();

      // Verifica se o token existe e se não está expirado
      if (token && exp > agora) {
        // Usuário autenticado e token válido
        return true; //permitir o acesso
      }
    } catch (e) {
      console.error('Erro ao analisar sessão:', e);
    }
  }

  router.navigate(['/pages/autenticar-usuario']);
  return false; //bloquear o acesso
};
