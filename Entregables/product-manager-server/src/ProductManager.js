import fs from "fs";
const path = '../file/products.json';


class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(path, 'utf8');
      const products = JSON.parse(data);
      this.products = products;
      this.productId = products.length + 1;
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((p) => p.code === product.code)) {
      console.error(`Ya existe un producto con el código ${product.code}`);
      return;
    }

    product.id = this.productId++;
    this.products.push(product);
  }

  getProducts() {
    fs.readFileSync(path, 'utf8', () => {
      return this.products;
    });
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error("No se encontró el producto");
      return null;
    }
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.error("No se encontró el producto");
      return false;
    }
    this.products.splice(index, 1);
    return true;
  }

  updateProduct(id, updatedFields) {
    const product = this.products.find((p) => p.id === id);
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

    if (
      this.products.some((p) => p.code === updatedFields.code && p.id !== id)
    ) {
      console.error("Ya existe un producto con el código especificado");
      return false;
    }

    Object.assign(product, updatedFields);
    return true;
  }
}

module.exports = ProductManager;

export default ProductManager;