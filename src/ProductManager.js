const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idCounter = 0;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.idCounter = this.products.reduce((maxId, product) => Math.max(maxId, parseInt(product.id.split('_').pop(), 36)), 0);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }

    generateUniqueId() {
        this.idCounter++;
        return Date.now().toString(36) + '_' + this.idCounter.toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, code, price, stock, category, thumbnails }) {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error: Todos los campos son obligatorios.');
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error('Error: Código de producto repetido.');
        }

        const id = this.generateUniqueId();

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

        this.products.push(newProduct);
        this.saveProducts();

        return id;
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (!product) {
            throw new Error('Error: Producto no encontrado.');
        }
        return product;
    }

    updateProduct(productId, updatedFields) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw new Error('Error: Producto no encontrado.');
        }

        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw new Error('Error: Producto no encontrado.');
        }

        this.products.splice(index, 1);
        this.saveProducts();
    }
}

module.exports = ProductManager;
