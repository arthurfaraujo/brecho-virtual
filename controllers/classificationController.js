import classModel from '../models/classification.js'

async function classificationDataGet (req, res, next) {
  try {
    // console.log(await classModel.readAll())
    res.json(await classModel.readAll())
  } catch (e) {
    next(e)
  }
}

export default { classificationDataGet }
