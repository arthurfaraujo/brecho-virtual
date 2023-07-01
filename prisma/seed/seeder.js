import seeds from "./seeds.js";
import userModel from "../../models/userModel.js";
import brandModel from "../../models/brandModel.js";
import departmentModel from "../../models/departmentModel.js";
import categoryModel from "../../models/categoryModel.js";
import subCategoryModel from "../../models/subCategoryModel.js";
import classificationModel from "../../models/classificationModel.js";
import productModel from "../../models/productModel.js";
import wishModel from "../../models/wishModel.js";
import productImageModel from "../../models/productImageModel.js";

async function up() {
    try {
        for (const user of seeds.usuarios) {
            const created = await userModel.create(user);
            // console.log(created);
        }
    
        for (const brand of seeds.marcas) {
            const created = await brandModel.create(brand);
            // console.log(created);
        }
    
        for (const department of seeds.departamentos) {
            const created = await departmentModel.create(department);
            // console.log(created);
        }
    
        for (const category of seeds.categorias) {
            const created = await categoryModel.create(category);
            // console.log(created);
        }
    
        for (const subCategory of seeds.subcategorias) {
            const created = await subCategoryModel.create(subCategory);
            // console.log(created);
        }
    
        for (const classification of seeds.classificacoes) {
            const created = await classificationModel.create(classification);
        }

        for (const product of seeds.produtos) {
            const created = await productModel.create(product);
        }

        for (const wish of seeds.desejosUsuario) {
            const created = await wishModel.create(wish);
        }

        for (const productImage of seeds.fotosProdutos) {
            const created = await productImageModel.create(productImage);
        }
    } catch (error) {
        throw error;
    }
}

up();
