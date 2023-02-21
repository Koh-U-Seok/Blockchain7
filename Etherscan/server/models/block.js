const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");

module.exports = class Block extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        difficulty: {
          type: Sequelize.STRING(1000),
        },
        extraData: {
          type: Sequelize.STRING(1000),
        },
        gasLimit: {
          type: Sequelize.INTEGER(255),
        },
        gasUsed: {
          type: Sequelize.INTEGER(255),
        },
        hash: {
          type: Sequelize.STRING(100),
        },
        // logsBloom: {
        //   type: Sequelize.TEXT,
        // },
        miner: {
          type: Sequelize.STRING(100),
        },
        mixHash: {
          type: Sequelize.STRING(70),
        },
        nonce: {
          type: Sequelize.STRING(200),
        },
        number: {
          type: Sequelize.INTEGER(255),
          unique: true,
          allowNull: false,
        },
        parentHash: {
          type: Sequelize.STRING(100),
        },
        receiptsRoot: {
          type: Sequelize.STRING(100),
        },
        sha3Uncles: {
          type: Sequelize.STRING(100),
        },
        size: {
          type: Sequelize.INTEGER(255),
        },
        stateRoot: {
          type: Sequelize.STRING(100),
        },
        timestamp: {
          type: Sequelize.INTEGER(255),
        },
        totalDifficulty: {
          type: Sequelize.STRING(100),
        },
        transactions: {
          type: Sequelize.JSON(),
        },
        transactionsRoot: {
          type: Sequelize.STRING(100),
        },
        uncles: { type: Sequelize.JSON() },
      },
      {
        sequelize,
        modelName: "Block",
        tableName: "block",
        paranoid: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // static associate(db) {
  //   // db.Block.belongsTo(db.Account,{
  //   //   foreignKey:"miner",
  //   //   targetKey:"account"
  //   // })
  //   db.Block.belongsTo(db.Transaction, {
  //     foreignKey: "blockHash",
  //     sourceKey: "hash",
  //   });
  //   db.Block.hasMany(db.Transaction, {
  //     foreignKey: "blockNumber",
  //     sourceKey: "number",
  //   });
  // }
};
