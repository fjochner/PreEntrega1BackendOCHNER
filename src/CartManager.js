const fs = require('fs');

class CartManager {
    constructor(cartsData, path) {
        this.path = path;
        this.carts = JSON.parse(cartsData);
        this.cartIdCounter = this.carts.reduce((maxId, cart) => Math.max(maxId, parseInt(cart.id.split('_').pop(), 36)), 0);
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }

    generateCartId() {
        this.cartIdCounter++;
        return Date.now().toString(36) + '_' + this.cartIdCounter.toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    createCart() {
        const cartId = this.generateCartId();
        const newCart = {
            id: cartId,
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        return cartId;
    }

    getCartById(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error('Error: Carrito no encontrado.');
        }
        return cart;
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.getCartById(cartId);
        const existingProduct = cart.products.find(product => product.productId === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        this.saveCarts();
    }

    getCartProducts(cartId) {
        const cart = this.getCartById(cartId);
        return cart.products;
    }
}

module.exports = CartManager;
