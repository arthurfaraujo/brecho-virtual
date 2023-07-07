function pageNotFound (req, res, next) {
  res.status(404).render('error', { errorMessage: 'Página não encontrada!', errorCode: 404 })
}

function otherErrors (err, req, res, next) {
  console.log(err.message)
  if (err.code) {
    if (parseInt(err.code) < 600) {
      // res.status(err.code).json({ message: err.message })
      res.status(err.code).render('error', { errorMessage: err.messageUsr || err.message, errorCode: err.code })
    } else {
      res.status(400).render('error', { errorMessage: err.messageUsr || err.message, errorCode: 400 })
    }
  } else {
    // res.status(500).json({ message: 'Algo deu muito errado!' })
    res.status(500).render('error', { errorMessage: 'Houve um erro interno!', errorCode: 500 })
  }
}

export default { pageNotFound, otherErrors }
