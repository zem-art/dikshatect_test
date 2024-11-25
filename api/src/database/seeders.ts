import Product from "../models/product.model";
import Order from "../models/order.model";
import OrderProduct from "../models/order_products.model";

export async function seedDatabase() {
  try {

    await Product.bulkCreate([
      {
        name: "kaos",
        price: 2000
      },
      {
        name: "baju",
        price: 20000
      },
      {
        name: "celana",
        price: 200000
      },
      {
        name: "kemeja",
        price: 200000
      }
    ]);

    await Order.bulkCreate([
      {
        order_id: "8230250718",
        customerName: "kasep",
        orderDate: new Date(),
        productIds: [1,2],
      },
      {
        order_id: "8263347506",
        customerName: "ucupss",
        orderDate: new Date(),
        productIds: [2,3],
      },
      {
        order_id: "7600631539",
        customerName: "rembo",
        orderDate: new Date(),
        productIds: [2,3],
      },
      {
        order_id: "1993404338",
        customerName: "rembo",
        orderDate: new Date(),
        productIds: [1,3],
      }
    ]);

    await OrderProduct.bulkCreate([
      {
        name: "kaos",
        price: 2000,
        quantity: 2,
        product_id: 1,
        total_price: 4000,
        order_id: "8230250718"
      },
      {
        name: "baju",
        price: 20000,
        quantity: 2,
        product_id: 2,
        total_price: 40000,
        order_id: "8230250718"
      },
      {
        name: "baju",
        price: 20000,
        quantity: 2,
        product_id: 2,
        total_price: 40000,
        order_id: "8263347506"
      },
      {
        name: "celana",
        price: 200000,
        quantity: 2,
        product_id: 3,
        total_price: 400000,
        order_id: "8263347506"
      },
      {
        name: "baju",
        price: 20000,
        quantity: 2,
        product_id: 2,
        total_price: 40000,
        order_id: "7600631539"
      },
      {
        name: "celana",
        price: 200000,
        quantity: 2,
        product_id: 3,
        total_price: 400000,
        order_id: "7600631539"
      },
      {
        name: "kaos",
        price: 2000,
        quantity: 5,
        product_id: 1,
        total_price: 10000,
        order_id: "1993404338"
      },
      {
        name: "celana",
        price: 200000,
        quantity: 2,
        product_id: 3,
        total_price: 400000,
        order_id: "1993404338"
      }
    ]);

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
