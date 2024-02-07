import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_animal from "./tbl_animal.js";
import _tbl_bbd from "./tbl_bbd.js";
import _tbl_check from "./tbl_check.js";
import _tbl_members from "./tbl_members.js";
import _tbl_notice from "./tbl_notice.js";

export default function initModels(sequelize) {
  const tbl_animal = _tbl_animal.init(sequelize, DataTypes);
  const tbl_bbd = _tbl_bbd.init(sequelize, DataTypes);
  const tbl_check = _tbl_check.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_notice = _tbl_notice.init(sequelize, DataTypes);

  tbl_members.belongsTo(tbl_notice, { as: "m_username_tbl_notice", foreignKey: "m_username" });
  tbl_notice.hasOne(tbl_members, { as: "tbl_member", foreignKey: "m_username" });

  return {
    tbl_animal,
    tbl_bbd,
    tbl_check,
    tbl_members,
    tbl_notice,
  };
}
