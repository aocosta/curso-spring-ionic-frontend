import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {}

    createOrClearCart(): Cart {
        let cart: Cart = {intems: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.intems.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.intems.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }

}