import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_animal from  "./tbl_animal.js";
import _tbl_check from  "./tbl_check.js";
import _tbl_members from  "./tbl_members.js";
import _tbl_myanimal from "./tbl_myanimal.js"

export default function initModels(sequelize) {
  const tbl_animal = _tbl_animal.init(sequelize, DataTypes);
  const tbl_check = _tbl_check.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_myanimal = _tbl_myanimal.init(sequelize, DataTypes);

  return {
    tbl_animal,
    tbl_check,
    tbl_members,
    tbl_myanimal
  };
}
