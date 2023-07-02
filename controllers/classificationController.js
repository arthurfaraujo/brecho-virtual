import classModel from '../models/classificationModel.js'

async function getClassifications (req, res, next) {
  try {
    // console.log(await classModel.readAll())
    res.json(await classModel.readAll())
  } catch (e) {
    next(e)
  }
}

export default { getClassifications }
