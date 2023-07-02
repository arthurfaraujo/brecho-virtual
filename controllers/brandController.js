import brandModel from '../models/brandModel.js'

async function getBrands (req, res, next) {
  try {
    // console.log(await brandModel.readAll())
    res.json(await brandModel.readAll())
  } catch (e) {
    next(e)
  }
}

export default { getBrands }
