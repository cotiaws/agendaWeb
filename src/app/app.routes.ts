import { Routes } from '@angular/router';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { EditarTarefas } from './components/pages/editar-tarefas/editar-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { AutenticarUsuario } from './components/pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './components/pages/criar-usuario/criar-usuario';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuario
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuario
    },
    {
        path: 'pages/cadastrar-tarefas',
        component: CadastrarTarefas,
        canActivate: [authGuard]
    },
    {
        path: 'pages/consultar-tarefas',
        component: ConsultarTarefas,
        canActivate: [authGuard]
    },
    {
        path: 'pages/editar-tarefas',
        component: EditarTarefas,
        canActivate: [authGuard]
    },
    {
        path: 'pages/dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: '', pathMatch: 'full', redirectTo: '/pages/autenticar-usuario'
    }
];
