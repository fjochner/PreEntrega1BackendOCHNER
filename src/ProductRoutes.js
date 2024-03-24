const express = require('express');
const router = express.Router();
const ProductManager = require('./ProductManager');

const productManagerInstance = new ProductManager('./products.json');

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto los thumbnails.' });
    }

    const id = productManagerInstance.generateUniqueId();

    const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    try {
        productManagerInstance.addProduct(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente.', productId: id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.' });
    }
});

module.exports = router;