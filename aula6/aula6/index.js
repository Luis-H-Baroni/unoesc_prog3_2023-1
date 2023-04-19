const http = require("http");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsHtml,
} = require("./controllers/productController");

const server = http.createServer((request, response) => {
  if (request.url === "/api/products" && request.method === "GET") {
    getProducts(request, response);
  } else if (
    request.url.match(/\/api\/products\/\w+/) &&
    request.method === "GET"
  ) {
    const id = request.url.split("/")[3];
    getProduct(request, response, id);
  } else if (request.url === "/api/products" && request.method === "POST") {
    createProduct(request, response);
  } else if (
    request.url.match(/\/api\/products\/\w+/) &&
    request.method === "PUT"
  ) {
    const id = request.url.split("/")[3];
    updateProduct(request, response, id);
  } else if (
    request.url.match(/\/api\/products\/\w+/) &&
    request.method === "DELETE"
  ) {
    const id = request.url.split("/")[3];
    deleteProduct(request, response, id);
  } else if (
    request.url === "/products" &&
    request.method === "GET" //&&
    //request.accept === "text/html"
  ) {
    getProductsHtml(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: "Route Not Found: Please use the api/products endpoint",
      })
    );
  }
});

server.listen(4000, () => {
  console.log("rodando na porta 4000");
});
