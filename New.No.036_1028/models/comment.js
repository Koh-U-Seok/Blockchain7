const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Comment",
        tableName: "comments",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 관계 맺기
    db.Comment.belongsTo(db.User, {
      //  어디에 속해 있는지
      foreignKey: "user_id",
      targetKey: "id",
    });
    db.Comment.belongsTo(db.Board, { foreignKey: "board_id", targetKey: "id" });
  }
};
