import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    backgroundImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "images",
    timestamps: true,
  }
);

export default Image;