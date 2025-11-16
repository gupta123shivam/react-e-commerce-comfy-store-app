const products = require('../data/products.json');

exports.handler = async function(event, context) {
  const id = event.queryStringParameters.id;
  if (!id) {
    return { statusCode: 400, body: "Missing id parameter" };
  }
  const product = products.find(p => p.id === id);
  if (!product) {
    return { statusCode: 404, body: "Product not found" };
  }
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(product)
  }
};