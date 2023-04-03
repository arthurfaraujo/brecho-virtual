export function gerarTodosProdutos(lista, dados){
    for (var i in dados.produtos) {
        var prodInfo = dados.produtos[i];
        // console.log(prodInfo);
        var produto = document.createElement('li');
        var preço = document.createElement('p');
        var nome = document.createElement('h3');
        var imagem = document.createElement('img');
        var botao = document.createElement('button');
        
        nome.innerHTML = prodInfo.name;
        preço.innerHTML = 'R$ ' + prodInfo.preço;
        imagem.src = prodInfo.imagem;
        botao.innerHTML = 'Comprar'
        
        produto.appendChild(imagem);
        produto.appendChild(nome);
        produto.appendChild(preço);
        produto.appendChild(botao);
        
        produto.classList.add("produto");
        produto.classList.add(prodInfo.categoria.toLowerCase());
        imagem.classList.add("imagem-produto");
        lista.appendChild(produto);
    }
}
  
export function ocultarProdutosCategoria(lista, categoria){
    var produtos = lista.children;

    for (var produto of produtos){
        var classes = [...produto.classList]
        if (classes.includes(categoria.toLowerCase())){
            produto.classList.toggle('invisivel')
        }
        
    }
}

export function mostrarProdutosCategoria(lista, categoria){
    var produtos = lista.children;

    for (var produto of produtos){
        var classes = [...produto.classList]
        if (classes.includes(categoria.toLowerCase())){
            produto.classList.toggle('invisivel')
        }
        
    }
}

export function geraCategorias(filtros, dados, lista){
    let categorias = [];
    for (var i in dados.produtos) {
        var prodInfo = dados.produtos[i].categoria;
        // console.log(prodInfo);
        if ((prodInfo) && (!(categorias.includes(prodInfo)))){
            var filtro = document.createElement('option');
            filtro.innerHTML = prodInfo;

            //filtro.addEventListener('click', ocultarProdutosCategoria(lista, prodInfo))

    
            filtros.appendChild(filtro);
            console.log(filtro);
            filtro.addEventListener("click", function(){
                
            });
            categorias.push(prodInfo);
        } else {
            continue
        }
    }   
}

function aaa(){
    console.log('aaa')
}