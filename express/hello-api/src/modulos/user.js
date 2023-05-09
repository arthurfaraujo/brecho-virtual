import Database from '../database/database.js';

const users = [
    {
      "cod_usr": "0b46bc21-4e5a-4fd7-a542-6d4e01d85c55",
      "email": "joao.silva@example.com",
      "senha": "aBcD1234",
      "nome": "João da Silva",
      "telefone": 1234567890,
      "UF": "SP",
      "cidade": "São Paulo",
      "rua": "Rua dos Exemplos",
      "número": 123
    },
    {
      "cod_usr": "06b48778-0e6b-45be-bb2c-d9e9f21b485f",
      "email": "maria.souza@example.com",
      "senha": "eFgH5678",
      "nome": "Maria Souza",
      "telefone": 9876543210,
      "UF": "RJ",
      "cidade": "Rio de Janeiro",
      "rua": "Avenida das Amostras",
      "número": 456
    },
    {
      "cod_usr": "f4e43a39-6b2f-4682-96d9-aa9d6be3d66a",
      "email": "carlos.rodrigues@example.com",
      "senha": "iJkL9012",
      "nome": "Carlos Rodrigues",
      "telefone": 5555555555,
      "UF": "MG",
      "cidade": "Belo Horizonte",
      "rua": "Travessa dos Testes",
      "número": 789
    },
    {
      "cod_usr": "c23d5e8d-5e21-4089-b27a-8a8d23d32096",
      "email": "ana.santos@example.com",
      "senha": "mNoP3456",
      "nome": "Ana Santos",
      "telefone": 1111111111,
      "UF": "RS",
      "cidade": "Porto Alegre",
      "rua": "Rua dos Resultados",
      "número": 1011
    },
    {
      "cod_usr": "22a2a83c-42eb-41f7-9e5c-ba314f5e4d88",
      "email": "pedro.almeida@example.com",
      "senha": "qRsT7890",
      "nome": "Pedro Almeida",
      "telefone": 9999999999,
      "UF": "BA",
      "cidade": "Salvador",
      "rua": "Avenida dos Exemplos",
      "número": 1213
    }
]

for (const user of users) {
    const last_id = await create(user);

    console.log(last_id);

    const usuarioCriado = await read(user.cod_usr);

    console.log(usuarioCriado);
}

async function create(user) {
    const db = await Database.connect();

    const { cod_usr, email, senha, nome, telefone, UF:uf, cidade, rua, 'número':numero } = user;

    const request = `
    insert into usuario values 
    (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const { lastID } = await db.run(request, [cod_usr, email, senha, nome, telefone, uf, cidade, rua, numero]);

    return lastID;
}

async function read(id) {
    const db = await Database.connect();

    const request = `select * from usuario where cod_usr = ?`;

    const usuario = await db.get(request, [id]);

    return usuario;
}