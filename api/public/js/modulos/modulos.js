export function gerarTodosProdutos(lista, dados){
    for (const dado of dados) {
        var prodInfo = dado;
        // console.log(prodInfo);
        var produto = document.createElement('li');
        var preço = document.createElement('p');
        var nome = document.createElement('h3');
        var imagem = document.createElement('img');
        var botao = document.createElement('button');
        
        nome.innerHTML = prodInfo.name;
        preço.innerHTML = 'R$ ' + prodInfo.price;
        imagem.src = prodInfo.img;
        botao.innerHTML = 'Comprar'
        
        produto.appendChild(imagem);
        produto.appendChild(nome);
        produto.appendChild(preço);
        produto.appendChild(botao);
        
        produto.classList.add("produto");
        produto.classList.add(prodInfo.category.toLowerCase());
        imagem.classList.add("imagem-produto");
        lista.appendChild(produto);
    }
}

export function geraCategorias(produtos, destino){
    let categoryViews;
    let categories = [];

    for (const produto of produtos) {
        if (categories.includes(produto.category)) {
            console.log('oi1');
            continue
        } else {
            console.log('oi2');
            categories.push(produto.category);

            let categoryView = `
            <option>
                ${produto.category}
            </option>
            `;
            categoryViews += categoryView;
        }
    }
    destino.innerHTML = categoryViews;
}