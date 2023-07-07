// const response = await fetch('/data/produtos');
// const products = await response.json();

function genProduct (product) {
  const html = `
    <div class="produto" id="codProd-${product.codProd}" data-class="${product.codCla}" data-codUsrCr="${product.codUsrCr}">
      <button class="apaga" value="${product.codProd}">
        <iconify-icon 
          icon="fa:trash-o" 
          style="color: rgb(169, 125, 108); font-size: 1.5rem">
        </iconify-icon>
      </button>
      <div class="produto-imagem">
          <img src="${product.Imagens[0].urlImg}">
      </div>
      <h3>${product.nome}</h3>
      <p>R$ ${product.preco.toFixed(2)}</p>
      <button class="compra">Comprar</button>
    </div>
    `
  // console.log(product.preco)

  return html
}

function insertProduct (product) {
  const catalog = document.querySelector('.grid-produtos')
  const productView = genProduct(product)

  catalog.insertAdjacentHTML('beforeend', productView)

  const prod = catalog.querySelector(`#codProd-${product.codProd}`)
  const deleteButton = prod.querySelector('.apaga')

  deleteButton.onclick = async () => {
    await fetch(`/produto/remove?codProd=${product.codProd}`, { method: 'DELETE' })
    location.reload()
  }
}

async function showProducts () {
  const products = await fetch('/produto/dados').then(res => res.json())

  console.log(products)

  products.forEach(element => {
    insertProduct(element)
  })
}

export default showProducts
