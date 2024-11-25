import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";
import Product from "./product.model";

class OrderProduct extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public quantity!: number;
    public order_id!: string;
    public product_id!: number;
}

OrderProduct.init(
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
            references: { model: 'orders', key: "order_id" },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'products', key: "id" },
        }
    },
    {
        sequelize,
        tableName: "order_products",
    }
)

export default OrderProduct;