import { DataTypes, Model } from "sequelize";
import sequelize from "../database/migrations";

class Order extends Model {
  public id!: number;
  public customerName!: string;
  public orderDate!: Date;
  public productIds!: number[];
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    productIds: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

export default Order;