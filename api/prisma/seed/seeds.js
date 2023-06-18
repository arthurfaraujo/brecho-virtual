const seeds = {
  usuarios: [
    {
      eMail: 'artu@gmail.com',
      senha: 'artulindao',
      nome: 'arthur',
      telefone: '81973637832',
      uf: 'SP',
      cidade: '',
      rua: '',
      numero: ''
    },
    {
      eMail: 'fulano1@example.com',
      senha: 'senha123',
      nome: 'Fulano de Tal 1',
      telefone: '123456789',
      uf: 'SP',
      cidade: 'São Paulo',
      rua: 'Rua Exemplo 1',
      numero: '123'
    },
    {
      eMail: 'fulano2@example.com',
      senha: 'senha456',
      nome: 'Fulano de Tal 2',
      telefone: '987654321',
      uf: 'RJ',
      cidade: 'Rio de Janeiro',
      rua: 'Rua Exemplo 2',
      numero: '456'
    },
    {
      eMail: 'fulano3@example.com',
      senha: 'senha789',
      nome: 'Fulano de Tal 3',
      telefone: '',
      uf: 'MG',
      cidade: 'Belo Horizonte',
      rua: 'Rua Exemplo 3',
      numero: '789'
    },
    {
      eMail: 'fulano4@example.com',
      senha: 'senhaabc',
      nome: 'Fulano de Tal 4',
      telefone: '',
      uf: 'PR',
      cidade: 'Curitiba',
      rua: 'Rua Exemplo 4',
      numero: '987'
    }
  ],
  marcas: [
    { nome: 'Zara' },
    { nome: 'H&M' },
    { nome: 'Forever 21' },
    { nome: 'C&A' },
    { nome: 'Renner' },
    { nome: 'Riachuelo' },
    { nome: 'Nike' }
  ],
  departamentos: [
    { nome: 'Masculino' },
    { nome: 'Feminino' },
    { nome: 'Infantil' },
    { nome: 'Unissex' },
    { nome: 'Casa' }
  ],
  categorias: [
    { nome: 'Vestuário de banho' },
    { nome: 'Esportivas' },
    { nome: 'Íntimas' },
    { nome: 'Roupas confortáveis' },
    { nome: 'Roupas de cama' },
    { nome: 'Roupas de sair' },
    { nome: 'Acessórios' }
  ],
  subcategorias: [
    { nome: 'Camisetas' },
    { nome: 'Calças' },
    { nome: 'Sapatos' },
    { nome: 'Tênis' },
    { nome: 'Shorts' },
    { nome: 'Bermudas' },
    { nome: 'Cuecas' },
    { nome: 'Calcinhas' },
    { nome: 'Sungas' },
    { nome: 'Biquínis' },
    { nome: 'Moletons' },
    { nome: 'Casacos' },
    { nome: 'Lençóis' },
    { nome: 'Fronhas' },
    { nome: 'Óculos' },
    { nome: 'Pulseiras' }
  ],
  classificacoes: [
    {
      codDep: 1,
      codCat: 2,
      codSub: 4
    },
    {
      codDep: 2,
      codCat: 3,
      codSub: 8
    },
    {
      codDep: 3,
      codCat: 1,
      codSub: 9
    },
    {
      codDep: 5,
      codCat: 5,
      codSub: 14
    },
    {
      codDep: 4,
      codCat: 4,
      codSub: 12
    },
    {
      codDep: 4,
      codCat: 4,
      codSub: 1
    },
    {
      codDep: 4,
      codCat: 4,
      codSub: 2
    }
  ],
  produtos: [
    {
      descricao: 'camiseta de tamanho médio, confortável à beça, ideal para fica de boa em casa',
      estadoUso: 'desgastada',
      preco: 15.0,
      nome: 'camiseta branca',
      codUsrCp: null,
      codCla: 6,
      codMar: 1,
      codUsrCr: null,
      dataCompra: null
    },
    {
      descricao: 'calça de moletom, bem ventilada, braba',
      estadoUso: 'nova',
      preco: 45.0,
      nome: 'calça moletom preta',
      codUsrCp: null,
      codCla: 7,
      codMar: null,
      codUsrCr: null,
      dataCompra: null
    },
    {
      descricao: 'muito bom para corridas e caminhadas em geral, extremamente confortável',
      estadoUso: 'pouco usado',
      preco: 124.99,
      nome: 'tênis nike de corrida',
      codUsrCp: null,
      codCla: 1,
      codMar: 7,
      codUsrCr: null,
      dataCompra: null
    },
    {
      descricao: 'camiseta braba, leve',
      estadoUso: 'usada',
      preco: 29.99,
      nome: 'camiseta rosa',
      codUsrCp: null,
      codCla: 6,
      codMar: null,
      codUsrCr: null,
      dataCompra: null
    }
  ],
  desejosUsuario: [
    {
      codUsr: 2,
      codProd: 3
    },
    {
      codUsr: 3,
      codProd: 1
    },
    {
      codUsr: 4,
      codProd: 2
    },
    {
      codUsr: 4,
      codProd: 3
    }
  ],
  fotosProdutos: [
    {
      codProd: 1,
      urlImg: 'public/img/produtos/27575904328754938.jpg'
    },
    {
      codProd: 2,
      urlImg: 'public/img/produtos/7256978345692837535.png'
    },
    {
      codProd: 3,
      urlImg: 'public/img/produtos/1585128076.jpg'
    },
    {
      codProd: 4,
      urlImg: 'public/img/produtos/234659873265137851.jpeg'
    }
  ]
}

export default seeds
