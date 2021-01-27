import { Produto } from "../../produto/modelos/produto";

export class ItemCarrinho {
    constructor (public produto: Produto,
                public quantidade: number = 1){}
    
    /*valor(): number {
     return this.produto.id * this.quantidade   
    }*/
}