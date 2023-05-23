const express = require('express');
const  app = express();

const productManager = require('./src/ProductManager');

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
  
  app.listen(port, () => {
    console.log(`Server en port: ${port}`);
  });