const Sequelize = require("sequelize");

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // blockHash: { type: Sequelize.STRING(66), allowNull: true },
        // blockNumber: { type: Sequelize.STRING, allowNull: true },
        chainId: { type: Sequelize.STRING },
        from: { type: Sequelize.STRING(42) },
        gas: { type: Sequelize.STRING },
        gasPrice: { type: Sequelize.STRING },
        hash: { type: Sequelize.STRING(66) },
        input: { type: Sequelize.STRING },
        nonce: { type: Sequelize.STRING },
        r: { type: Sequelize.STRING(66) },
        s: { type: Sequelize.STRING(66) },
        to: { type: Sequelize.STRING(42) },
        transactionIndex: { type: Sequelize.STRING, allowNull: true },
        type: { type: Sequelize.STRING },
        v: { type: Sequelize.STRING },
        value: { type: Sequelize.BIGINT.UNSIGNED },
      },
      {
        sequelize,
        modelName: "Transaction",
        tableName: "transaction",
        paranoid: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: false,
      }
    );
  }
  static associate(db) {
    db.Transaction.belongsTo(db.Block, {
      foreignKey: "blockHash",
      targetKey: "hash",
    });
    db.Transaction.belongsTo(db.Block, {
      foreignKey: "blockNumber",
      targetKey: "number",
    });
  }
};
