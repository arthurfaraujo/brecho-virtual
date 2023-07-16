// const response = await fetch('/data/produtos');
// const products = await response.json();

function genProduct (product) {
  const html = `
    <div class="produto" id="codProd-${product.codProd}" data-class="${product.codCla}" data-codUsrCr="${product.codUsrCr}">
        <button class="deseja" value="${product.codProd}">
        <iconify-icon 
          icon="iconamoon:heart-fill" 
          style="color: rgb(169, 125, 108); font-size: 1.8rem">
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

  infoProduct(product.codProd)
  addWishButton(product)
  addBuyButton(product)
}

function addWishButton (product) {
  const prod = document.body.querySelector(`#codProd-${product.codProd}`)
  const wishButton = prod.querySelector('.deseja')

  wishButton.onclick = () => {
    fetch(`/usuario/deseja/${product.codProd}`, { method: 'POST' }).then(res => {
      console.log(res)
      if (res.status === 200) {
        alert('Produto adicionado à lista de desejos!')
      } else {
        alert('Erro ao tentar adicionar o produto à lista de desejos!')
      }
    })
  }
}

function addBuyButton (product) {
  const prod = document.body.querySelector(`#codProd-${product.codProd}`)
  const buyButton = prod.querySelector('.compra')
  buyButton.onclick = () => {
    fetch(`/produto/compra/${product.codProd}`, { method: 'PATCH' }).then(res => {
      console.log(res.status)
      if (res.status === 200) {
        prod.remove()
        alert('Compra realizada com sucesso!')
      } else {
        alert('Erro ao realizar compra!')
      }
    })
  }
}

function infoProduct (codProd) {
  const product = document.body.querySelector(`#codProd-${codProd}`)
  const image = product.querySelector('img')

  image.onclick = () => {
    window.location.href = `/produto/info/${codProd}`
  }
}
async function showProducts () {
  const products = await fetch('/produto/dados').then(res => res.json())

  console.log(products)

  products.forEach(element => {
    if (element.codUsrCp === null) {
      insertProduct(element)
    }
  })
}

export default showProducts
