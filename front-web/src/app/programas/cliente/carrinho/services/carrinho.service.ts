import { Produto } from "../../../produto/modelos/produto"
import { ItemCarrinho } from "../modelos/carrinho.model"


export class CarrinhoService {

    produtos: ItemCarrinho[] = []

    adicionaItem(item:Produto) {
        let foundItem = this.produtos.find(produto => produto.produto.id === item.id)
        if(foundItem){
            this.incrementaQuantidade(foundItem)
        } else {
            this.produtos.push(new ItemCarrinho(item))
        }
    }

    incrementaQuantidade(item: ItemCarrinho){
        item.quantidade = item.quantidade + 1
    }
}