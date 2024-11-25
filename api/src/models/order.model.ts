import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";

class Order extends Model {
  public id!: number;
  public customerName!: string;
  public orderDate!: Date;
  public productIds!: number[];
  public order_id!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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