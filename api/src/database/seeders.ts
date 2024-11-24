import Product from "../models/product.model";
import Order from "../models/order.model";

export async function seedDatabase() {
  try {

    await Product.bulkCreate([
      { name: "product A", price: 100 },
      { name: "product B", price: 200 },
      { name: "product C", price: 300 },
    ]);

    await Order.bulkCreate([
      {
        customerName: "Kasep",
        orderDate: new Date(),
        products: [
          {
            id : 1,
            quantity : 2
          },
          {
            id : 2,
            quantity : 1
          }
        ],
      },
      {
        customerName: "Ucups",
        orderDate: new Date(),
        products: [
          {
            id : 1,
            quantity : 2
          },
          {
            id : 3,
            quantity : 1
          }
        ],
      },
    ]);

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
