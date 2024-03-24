const express = require('express');
const router = express.Router();
const CartManager = require('./CartManager');

const cartManagerInstance = new CartManager([], './carts.json');

router.post('/', (req, res) => {
    const cartId = cartManagerInstance.createCart();
    res.status(201).json({ message: 'Carrito creado exitosamente.', cartId });
});

router.post('/:cartId/product/:productId', (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
        cartManagerInstance.addProductToCart(cartId, productId, quantity);
        res.status(200).json({ message: `Producto ${productId} agregado al carrito ${cartId} con cantidad ${quantity}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cartId', (req, res) => {
    const cartId = req.params.cartId;

});

router.get('/:cartId/details', (req, res) => {
    const cartId = req.params.cartId;
});

router.put('/:cartId', (req, res) => {
    const cartId = req.params.cartId;
});

router.delete('/:cartId', (req, res) => {
    const cartId = req.params.cartId;
});

router.get('/', (req, res) => {
});

module.exports = router;
