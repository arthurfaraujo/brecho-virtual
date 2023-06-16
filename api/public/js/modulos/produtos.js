// const response = await fetch('/data/produtos');
// const products = await response.json();

function genProduct (product) {
  const html = `
    <div class="produto ${product.codCla}" id="${product.codPec}">
        <div class="produto-imagem">
            <img src=" ">
        </div>
        <h3>${product.nome}</h3>
        <p>R$ ${product.preco.toFixed(2)}</p>
        <button>Comprar</button>
    </div>
    `
  console.log(product.preco)

  return html
}

function insertProduct (product) {
  const catalog = document.querySelector('.grid-produtos')
  const productView = genProduct(product)

  catalog.insertAdjacentHTML('beforeend', productView)
}

async function showProducts () {
  const products = await fetch('/data/produtos').then(res => res.json())

  console.log(products)

  products.forEach(element => {
    insertProduct(element)
  })
}

export default showProducts
