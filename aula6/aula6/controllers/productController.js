//productController.js
const Product = require("../models/productModel");
const { getPostData } = require("../utils");
const fs = require("fs");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProductsHtml(req, res) {
  try {
    fs.readFile("./index.html", "utf8", async function (error, data) {
      if (error) {
        console.log(error);
      } else {
        const products = await Product.findAll();
        const productsHTML = products
          .map((product) => {
            return `<li>${product.name}</li>`;
          })
          .join("");
        const result = data.replace(
          /<div id="text1">(.*)<\/div>/,
          '<div id="text1">' + productsHTML + "</div>"
        );

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = {
      name,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }

    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const productData = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
    };

    const updatedProduct = await Product.update(id, productData);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const deletedProduct = await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(deletedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsHtml,
};
