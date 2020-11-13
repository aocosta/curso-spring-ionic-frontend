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

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.intems.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.intems.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.intems.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.intems[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.intems.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.intems[position].quantidade--;
            if (cart.intems[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.intems.length; i++) {
            sum += cart.intems[i].produto.preco * cart.intems[i].quantidade;
        }
        return sum;
    }

}