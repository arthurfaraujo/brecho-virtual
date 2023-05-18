// const response = await fetch('/data/produtos');
// const products = await response.json();


function genProduct(product) {
    const html = `
    <li class="produto ${product.category}">
        <img src="${product.img}" class="imagem-produto">
        <h3>${product.name}</h3>
        <p>R$ ${product.price}</p>
        <button>Comprar</button>
    </li>
    `
    return html;
}

function insertProduct(product) {
    const catalog = document.querySelector('.catalogo');
    const productView = genProduct(product);

    catalog.insertAdjacentHTML('beforeend', productView);
}

async function showProducts() {
    const products = await fetch('/data/produtos').then(list => list.json());

    for (const product of products) {
        insertProduct(product);
    }
}

showProducts();