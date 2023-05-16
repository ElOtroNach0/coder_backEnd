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


class ProductManager {

   products = []

    constructor(products) {
        this.products = products;
        this.ProductId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error(`Ya existe un producto con el código ${product.code}`);
            return;
        }

        this.products.push({ ...product, id: this.ProductId++ });
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Not found");
        }
        return product;
    }
};

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);