const USeokCoin = artifacts.require("USeokCoin");

module.exports = function (deployer) {
  deployer.deploy(USeokCoin, "USeokCoin", "USeok", 1000);
};
