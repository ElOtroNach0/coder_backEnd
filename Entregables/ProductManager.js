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
        if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
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
            console.error("No encontrado");
        }
        return product;
    }

     addProduct = async ({title, price, code, stock}) => {
        await this.initialize();
        if (this.products.some((product) => product.code === code)) {
            throw new Error('El productor no existe.');
          }
        const newProduct = new Product({title, price, code, stock, id: this.lastProductId++});
        this.products.push(newProduct);
        await this.save()
    }

    getProductById = async (id) => {
        await this.initialize();
        const returnProduct = this.products.find((product) => product.id === id);
        if(!returnProduct) throw new Error("Producto no encontrado.");
        return returnProduct;
    }

    deleteProduct = async (id) => {
        await this.initialize();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }
        this.products.splice(index, 1);
        await this.save();
    }

    updateProduct = async (id, updatedFields) => {
        await this.initialize();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("Product not found");

        const updatedProduct = { ...this.products[index], ...updatedFields };
        if (updatedProduct.price < 0) throw new Error('Price cannot be negative');
        if (updatedProduct.stock < 0) throw new Error('Stock cannot be negative');
        if (updatedProduct.id !== id) throw new Error('Id cannot be updated');        

        const allowedFields = ['title', 'price', 'code', 'stock'];
        const invalidFields = Object.keys(updatedFields).filter(field => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Update invalido: ${invalidFields.join(', ')}`);
        }

        if (this.products.some((product) => product.code === updatedProduct.code && product.id !== updatedProduct.id )) {
            throw new Error('error');
          }

        this.products[index] = updatedProduct;
        await this.save();
        return this.products[index];
    }
};

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);