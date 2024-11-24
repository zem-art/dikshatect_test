import { DataTypes, Model } from "sequelize";
import sequelize from "../database/migrations";
import Order from "./order.model";
import Product from "./product.model";

class OrderProduct extends Model {
    public!: number;
    name!: string;
    price!: string;
}

export default OrderProduct.init(
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: Order, key: "order_id" },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Product, key: "id" },
        }
    },
    {
        sequelize,
        tableName: "order_products",
    }
)