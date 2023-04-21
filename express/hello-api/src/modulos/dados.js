import {readFile} from 'fs/promises';
import { writeFile } from 'fs/promises';
import {v4 as uuid} from 'uuid';
import {HTTPError} from '../index.js';

async function read(caminho) {
    const leitura = JSON.parse(await readFile(caminho));
    const dados = {leitura, caminho};
    return dados;
}

async function write(caminho, dados) {
    writeFile(caminho, JSON.stringify(dados, null, 2));
    return 0;
}

async function create(destino, dados) {
    const id = uuid();
    destino.leitura.lista.push({id, ...dados});
    write(destino.caminho, destino.leitura);
    return 0;
}

async function erase(procurado, id) {
    const posicao = procurado.leitura.lista.findIndex((item) => item.id == id);

    if (posicao == -1) {
      return posicao;
    } else {
      procurado.leitura.lista.splice(posicao, 1);    
      write(procurado.caminho, procurado.leitura);
      return 0;
    } 
}

export default {read, create, erase}