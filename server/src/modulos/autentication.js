async function autenticate(dados, contas) {
    for (const conta of contas) {
        if ((dados.nome == conta.nome) & (conta.senha == dados.senha)) {
            return conta.id;
        }
    }
    return 1;
};

export default { autenticate };