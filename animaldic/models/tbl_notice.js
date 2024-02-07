import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class tbl_notice extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        n_director: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        n_viewer: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        n_caution: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_notice",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "n_director" }],
          },
        ],
      }
    );
  }
}
