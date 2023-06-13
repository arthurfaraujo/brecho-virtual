import seeds from "./seeds.js";
import userModel from "../../src/models/userModel.js";
import brandModel from "../../src/models/brandModel.js";
import departmentModel from "../../src/models/departmentModel.js";
import categoryModel from "../../src/models/categoryModel.js";
import subCategoryModel from "../../src/models/subCategoryModel.js";
import classificationModel from "../../src/models/classificationModel.js";
import productModel from "../../src/models/productModel.js";

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
    } catch (error) {
        throw error;
    }
}

up();
