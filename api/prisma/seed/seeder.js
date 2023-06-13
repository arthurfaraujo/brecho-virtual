import seeds from "./seeds.js";
import userModel from "../../src/models/userModel.js";
import brandModel from "../../src/models/brandModel.js";
import departmentModel from "../../src/models/departmentModel.js";
import categoryModel from "../../src/models/categoryModel.js";
import subCategoryModel from "../../src/models/subCategoryModel.js";

async function up() {
    for (const user of seeds.usuarios) {
        const created = await userModel.createUnique(user);
        // console.log(created);
    }

    for (const brand of seeds.marcas) {
        const created = await brandModel.createUnique(brand);
        // console.log(created);
    }

    for (const department of seeds.departamentos) {
        const created = await departmentModel.createUnique(department);
        // console.log(created);
    }

    for (const category of seeds.categorias) {
        const created = await categoryModel.createUnique(category);
        // console.log(created);
    }

    for (const subCategory of seeds.subcategorias) {
        const created = await subCategoryModel.createUnique(subCategory);
        // console.log(created);
    }
}

up();
