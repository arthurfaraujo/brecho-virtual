function genProduct(product) {
  const html = `
    <div class="produto" id="codProd-${product.codProd}" data-class="${
    product.codCla
  }" data-codUsrCr="${product.codUsrCr}">
      <div class="produto-imagem">
          <img src="/${product.Imagens[0].urlImg}">
      </div>
      <h3>${product.nome}</h3>
      <p>R$ ${Number(product.preco).toFixed(2).toString().replace('.', ',')}</p>
    </div>
    `
  // console.log(product.preco)

  return html
}

function insertProduct(product) {
  const catalog = document.querySelector('.grid-produtos')
  const productView = genProduct(product)

  catalog.insertAdjacentHTML('beforeend', productView)

  editProduct(product.codProd)

  if (product.codUsrCp !== null) {
    productSold(product.codProd)
  }
}

function editProduct(codProd) {
  const product = document.body.querySelector(`#codProd-${codProd}`)
  const image = product.querySelector('img')

  image.onclick = () => {
    window.location.href = `/produto/edita/${codProd}`
  }
}

function productSold(codProd) {
  const product = document.body.querySelector(`#codProd-${codProd}`)

  product.classList.add('sold')
}

async function showProducts() {
  const products = await fetch('/produto/usuario').then(res => res.json())

  console.log(products)

  products.forEach(element => {
    insertProduct(element)
  })
}

showProducts()
