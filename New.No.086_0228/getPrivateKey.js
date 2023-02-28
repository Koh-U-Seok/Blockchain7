const keythereum = require("keythereum");

const address = "0x0f615d4371e8b817a82a533660a5da71ee111ace";

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("12345678910", keyObj);

console.log(privateKey.toString("hex"));
