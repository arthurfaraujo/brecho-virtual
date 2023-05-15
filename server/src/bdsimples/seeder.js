import data from './models/Products.js';

const products = [
  {
    "id": "4c304aa4-4baa-44c8-8915-73e7ef991a81",
    "nome": "calça de shopping",
    "preço": 10,
    "imagem": "../img/calçashop.png",
    "categoria": "Roupas"
  },
  {
    "id": "50e604cc-1010-4cb7-a928-b4448781d147",
    "nome": "camisa do omi aranha",
    "preço": 30,
    "imagem": "../img/camisamiranha.jpeg",
    "categoria": "Roupas"
  },
  {
    "id": "e16389cd-cc9e-4f5f-bcfc-76ed505b14f2",
    "nome": "cueca do batman",
    "preço": 150,
    "imagem": "../img/cuecabatma.jpeg",
    "categoria": "Roupas"
  },
  {
    "id": "7c972e0c-acfa-4e19-9106-072cde084edb",
    "nome": "casa do presidente",
    "preço": 10,
    "imagem": "../img/casa.jpeg",
    "categoria": "Objetos"
  },
  {
    "id": "80d83151-341d-463c-9a1a-6af74ace67fc",
    "nome": "oclin mil grau",
    "preço": 123,
    "imagem": "../img/oclinho.jpg",
    "categoria": "Acessórios"
  },
  {
    "id": "a7bb3700-59cd-4d86-950a-bcc37353beca",
    "nome": "casa de tauba",
    "preço": 25,
    "imagem": "../img/bioconstrucao_.jpg",
    "categoria": "Objetos"
  },
  {
    "id": "39a89c82-ed31-46a5-bf5c-5174be42960d",
    "nome": "idoso chorano",
    "preço": 100,
    "imagem": "../img/idosotriste.jpeg",
    "categoria": "Objetos"
  }
]

const users = [
    {
      "id": "e80ffd94-566e-4879-9340-d50db9c40aeb",
      "nome": "artu",
      "senha": "senhatopdemais123"
    },
    {
      "id": "bbbdffab-c070-4007-8d3d-e612bf323d59",
      "nome": "artchucks",
      "senha": "123"
    },
    {
      "id": "9551ea1d-9910-434f-9f82-25e67f883b1c",
      "nome": "ar",
      "senha": "123"
    },
    {
      "id": "8c928350-423b-4d69-a99b-bc11d987420f",
      "nome": "luiz",
      "senha": "senha"
    }
]

for (const product of products) {
  data.createP(product);
}

for (const user of users) {
    data.createU(user);
}