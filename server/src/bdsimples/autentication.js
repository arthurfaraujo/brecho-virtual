import user from './models/Users.js';

async function autenticate(dados) {
    const usr = await user.readName(dados.name);

    if (dados.password === usr.password) {
        return 0;
    } else {
        return 1;
    }
}


export default { autenticate };