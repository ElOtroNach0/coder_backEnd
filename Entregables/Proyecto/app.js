import express from 'express';
import ProductManager from './product-manager-server/ProductManager.js';
import handlebars from 'express-handlebars';
import fs from "fs";


const app = express();
const port = 8080;

const productManager = new ProductManager();
productManager.loadProducts();

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    const products = productManager.getProducts();

    if (isNaN(limit)) {
      res.json(products);
    } else {
      res.json(products.slice(0, limit));
    }
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);

    const product = productManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// handlebars
app.engine('hbs', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  fs.readFile('./file/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON');
      return;
    }

    const jsonData = JSON.parse(data);
    res.render('home', jsonData.Products);
  });
});

app.listen(port, () => {
  console.log(`Server en port: ${port}`);
});

