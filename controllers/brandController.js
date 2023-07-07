import brandModel from './../models/brand.js'

async function brandDataGet (req, res, next) {
  try {
    // console.log(await brandModel.readAll())
    res.json(await brandModel.readAll())
  } catch (e) {
    next(e)
  }
}

export default { brandDataGet }
