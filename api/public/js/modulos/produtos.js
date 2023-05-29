// const response = await fetch('/data/produtos');
// const products = await response.json();

function genProduct(product) {
    const html = `
    <div class="produto ${product.category}">
        <div class="produto-imagem">
            <img src="${product.img}">
        </div>
        <h3>${product.name}</h3>
        <p>R$ ${product.price}</p>
        <button>Comprar</button>
    </div>
    `
    return html;
}

function insertProduct(product) {
    const catalog = document.querySelector('.grid-produtos');
    const productView = genProduct(product);

    catalog.insertAdjacentHTML('beforeend', productView);
}

async function showProducts() {
    const products = await fetch('/data/produtos').then(list => list.json());

    for (const product of products) {
        insertProduct(product);
    }
}

export default showProducts;