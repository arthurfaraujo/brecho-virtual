export async function auth (req, res, next) {
  if (req.cookies.codUsr && req.cookies.nomeUsr) {
    next()
  } else {
    res.redirect('/usuario/acesso')
  }
}

export default { auth }
