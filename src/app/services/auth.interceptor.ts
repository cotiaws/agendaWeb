// src/app/interceptors/auth.interceptor.ts
import {
    HttpInterceptorFn,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

    // Só intercepta se a URL tiver como base o servidor desejado
    if (req.url.startsWith(environment.apiTarefas)
        || req.url.startsWith(environment.apiCategorias)) {

        // Recupera o dado do sessionStorage
        const authData = sessionStorage.getItem('auth');
        if (authData) {
            try {
                const usuario = JSON.parse(authData);
                const token = usuario?.accessToken;

                if (token) {
                    // Clona a requisição adicionando o cabeçalho Authorization
                    const authReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return next(authReq);
                }
            } catch (e) {
                console.error('Erro ao recuperar token no interceptor:', e);
            }
        }
    }

    // Se não cair nas condições acima, segue a requisição original
    return next(req);
}
