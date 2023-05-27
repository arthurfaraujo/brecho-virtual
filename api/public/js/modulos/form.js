function formulario() {
    const cadastro = document.querySelector('.cont-cad');
    const login = document.querySelector('.cont-log');
    const b_cad = document.querySelector('.botao-cad');
    const b_log = document.querySelector('.botao-log');

    b_log.addEventListener('click', () => {
        login.classList.toggle('invisible');
        cadastro.classList.toggle('invisible');
        // console.log('a');
    })

    b_cad.addEventListener('click', () => {
        cadastro.classList.toggle('invisible');
        login.classList.toggle('invisible');
    })
}

formulario();