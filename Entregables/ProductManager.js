class ProductManager {
    constructor() {
        this.products = [];
        this.productId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error(`Ya existe un producto con el código ${product.code}`);
            return;
        }

        product.id = this.productId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("No se encontró el producto");
            return null;
        }
        return product;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error("No se encontró el producto");
            return false;
        }
        this.products.splice(index, 1);
        return true;
    }

    updateProduct(id, updatedFields) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("No se encontró el producto");
            return false;
        }

        if (updatedFields.price < 0) {
            console.error("El precio no puede ser negativo");
            return false;
        }

        if (updatedFields.stock < 0) {
            console.error("El stock no puede ser negativo");
            return false;
        }

        if (updatedFields.id !== id) {
            console.error("No se puede modificar el ID del producto");
            return false;
        }

        if (this.products.some(p => p.code === updatedFields.code && p.id !== id)) {
            console.error("Ya existe un producto con el código especificado");
            return false;
        }

        Object.assign(product, updatedFields);
        return true;
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    code: "1",
    stock: 100
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 5.99,
    code: "2",
    stock: 50
});

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);
