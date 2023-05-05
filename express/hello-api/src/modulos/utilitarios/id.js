import {v4 as uuid} from 'uuid';
import {readFile} from 'fs/promises';
import { writeFile } from 'fs/promises';

const prods = JSON.parse(await readFile('public/data/produtos.json'));

const prods1 = JSON.parse(await readFile('public/data/produtos1.json'));

for (const prod of prods.produtos) {
    const id = uuid();
    const prod1 = {id, ...prod};
    prods1.produtos.push(prod1);

};

writeFile('public/data/produtos1.json', JSON.stringify(prods1, null, 2));

