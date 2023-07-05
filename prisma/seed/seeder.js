import seeds from './seeds.js'
import User from '../../models/user.js'
import Brand from '../../models/brand.js'
import Department from '../../models/department.js'
import Category from '../../models/category.js'
import SubCategory from '../../models/subCategory.js'
import Classification from '../../models/classification.js'
import Product from '../../models/product.js'
import Wish from '../../models/wish.js'
import ProductImage from '../../models/productImage.js'

async function up () {
  for (const user of seeds.usuarios) {
    await User.create(user)
    // console.log(created);
  }

  for (const brand of seeds.marcas) {
    await Brand.create(brand)
    // console.log(created);
  }

  for (const department of seeds.departamentos) {
    await Department.create(department)
    // console.log(created);
  }

  for (const category of seeds.categorias) {
    await Category.create(category)
    // console.log(created);
  }

  for (const subCategory of seeds.subcategorias) {
    await SubCategory.create(subCategory)
    // console.log(created);
  }

  for (const classification of seeds.classificacoes) {
    await Classification.create(classification)
  }

  for (const product of seeds.produtos) {
    await Product.create(product)
  }

  for (const wish of seeds.desejosUsuario) {
    await Wish.create(wish)
  }

  for (const productImage of seeds.fotosProdutos) {
    await ProductImage.create(productImage)
  }
}

up()
