function formulario () {
  const cadastro = document.querySelector('.cont-cad')
  const login = document.querySelector('.cont-log')
  const bCad = document.querySelector('.botao-cad')
  const bLog = document.querySelector('.botao-log')

  bLog.addEventListener('click', () => {
    login.classList.toggle('invisible')
    cadastro.classList.toggle('invisible')
    // console.log('a');
  })

  bCad.addEventListener('click', () => {
    cadastro.classList.toggle('invisible')
    login.classList.toggle('invisible')
  })
}

formulario()
