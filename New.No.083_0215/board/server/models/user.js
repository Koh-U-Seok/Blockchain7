const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        pw: {
          type: Sequelize.STRING(64),
        },
        name: {
          type: Sequelize.STRING(20),
        },
      },
      {
        sequelize,
        modelName: "Board",
        tableName: "board",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associates(db) {
    db.User.hasMany(db.Board);
  }
};
