//const baseUrlAgenda = 'http://localhost:8081';
//const baseUrlAutenticacao = 'http://localhost:8082';

const baseUrlAgenda = 'https://agendaapi-f2b2hbbucscpbzfw.canadacentral-01.azurewebsites.net';
const baseUrlAutenticacao = 'https://autenticacaoapi-axhkefbjaha0bkez.canadacentral-01.azurewebsites.net';

export const environment = {
    apiCategorias: baseUrlAgenda + '/api/v1/categorias',
    apiTarefas : baseUrlAgenda + '/api/v1/tarefas',
    apiUsuarios : baseUrlAutenticacao + '/api/v1/usuarios'
};
