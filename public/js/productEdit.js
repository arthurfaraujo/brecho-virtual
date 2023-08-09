const form = document.querySelector('form')

form.onsubmit = editProduct

async function editProduct(event) {
  event.preventDefault()

  const editedProduct = Object.fromEntries(new FormData(form))
  editedProduct.descricao = editedProduct.descricao.replaceAll(/(\n)/g, '')
  editedProduct.preco = editedProduct.preco.replaceAll(/(,)/g, '.')

  console.log(typeof editedProduct.preco)

  const reqConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedProduct)
  }

  const res = await fetch(window.location.href, reqConfig)

  if (res.ok) {
    location.href = '/usuario/vende'
  } else {
    alert('Houve um problema ao editar o produto.')
  }
}
