import user from './models/Users.js';

async function autenticate(dados) {
    const usr = await user.readName(dados.nome);

    if (dados.senha === usr.password) {
        return 0;
    } else {
        return 1;
    }
}


export default { autenticate };