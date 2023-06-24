function genClassification (classification) {
  const html = `
  <option value="${classification.codCla}">
    ${classification.dep.nome} - ${classification.cat.nome} - ${classification.sub.nome}
  </option>
  `
  return html
}

function insertClassification (classification) {
  const list = document.querySelector('.classificacoes')
  const classificationView = genClassification(classification)

  list.insertAdjacentHTML('beforeend', classificationView)
}

async function showClassification () {
  const classifications = await fetch('/data/classificacoes').then(res => res.json())

  classifications.forEach(element => insertClassification(element))
}

function genBrand (Brand) {
  const html = `
  <option value="${Brand.codMar}">
    ${Brand.nome}
  </option>
  `
  return html
}

function insertBrand (Brand) {
  const list = document.querySelector('.marcas')
  const BrandView = genBrand(Brand)

  list.insertAdjacentHTML('beforeend', BrandView)
}

async function showBrand () {
  const Brands = await fetch('/data/marcas').then(res => res.json())

  Brands.forEach(element => insertBrand(element))
}

showBrand()
showClassification()
