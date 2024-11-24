import { DataTypes, Model } from "sequelize";
import sequelize from "../database/migrations";
import OrderProduct from "./order_products.model";

class Product extends Model {
    public!: number;
    name!: string;
    price!: string;
}

Product.init(
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
    },
    {
        sequelize,
        tableName: "products",
    }
)

export default Product