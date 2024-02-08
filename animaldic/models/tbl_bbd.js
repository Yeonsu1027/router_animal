import { Model } from "sequelize";

export default class tbl_bbd extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        num: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING(150),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tbl_bbd",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "author" }],
          },
        ],
      }
    );
  }
}
