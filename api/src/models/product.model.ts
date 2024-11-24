import { DataTypes, Model } from "sequelize";
import sequelize from "../database/migrations";

class Product extends Model {
    public!: number;
    name!: string;
    price!: string;
}

export default Product.init(
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