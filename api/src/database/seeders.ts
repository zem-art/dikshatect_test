import Product from "../models/product.model";
import Order from "../models/order.model";

export async function seedDatabase() {
  try {

    await Product.bulkCreate([
      { name: "Product A", price: 100 },
      { name: "Product B", price: 200 },
      { name: "Product C", price: 300 },
    ]);

    await Order.bulkCreate([
      {
        customerName: "John Doe",
        orderDate: new Date(),
        productIds: [1, 2],
      },
      {
        customerName: "Jane Smith",
        orderDate: new Date(),
        productIds: [2, 3],
      },
    ]);

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
