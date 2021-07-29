var config = require("./config");
const sql = require("mssql");

async function getOrders() {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query("SELECT * from Orders");
    return products.recordsets;
  } catch (e) {
    console.log(e);
  }
}
async function getOrder() {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .input("input_parameter", sql.Int, orderId)
      .query("SELECT * from Orders where Id = @input_parameter");
    return products.recordsets;
  } catch (e) {
    console.log(e);
  }
}

async function addOrder(order) {
  try {
    let pool = await sql.connect(config);
    let insertProduct = await pool
      .request()
      .input("Id", sql.Int, order.Id)
      .input("Title", sql.NVarChar, order.Title)
      .input("Quantity", sql.NVarChar, order.Quantity)
      .input("Message", sql.NVarChar, order.Message)
      .input("City", sql.NVarChar, order.City)
      .execute("InsertOrders");
    return insertProduct.recordsets;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
};
