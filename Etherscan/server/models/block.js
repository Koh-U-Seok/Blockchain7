const Sequelize = require("sequelize");

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
          type: Sequelize.NUMBER(10000000),
        },
        gasUsed: {
          type: Sequelize.NUMBER(10000),
        },
        hash: {
          type: Sequelize.STRING(100),
        },
        logsBloom: {
          type: Sequelize.TEXT,
        },
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
          type: Sequelize.NUMBER(100000000),
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
          type: Sequelize.NUMBER(1000),
        },
        stateRoot: {
          type: Sequelize.STRING(100),
        },
        timestamp: {
          type: Sequelize.NUMBER(1000000000000000),
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
