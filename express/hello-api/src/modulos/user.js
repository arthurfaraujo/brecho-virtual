async function autenticate(dados, contas) {
    for (const conta of contas) {
        if ((dados.nome == conta.nome) & (conta.senha == dados.senha)) {
            return conta.id;
        }
    }
    return 1;
};

async function checkname(nome, contas) {
    for (const conta of contas) {
        if (conta.nome == nome) {
            return 1;
        }
    }

    return 0;
}

export default {autenticate, checkname};