// associations.ts (Create a new file for associations)

import Order from "../order.model";
import OrderProduct from "../order_products.model";

export function setupAssociations() {
    Order.hasMany(OrderProduct, {
        foreignKey: 'order_id',
        sourceKey: 'order_id',
        as: 'orderProducts',
    });

    OrderProduct.belongsTo(Order, {
        foreignKey: 'order_id',
        targetKey: 'order_id',
    });
}