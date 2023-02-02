import { SHA256, lib } from "crypto-js";
import elliptic from "elliptic";
// 데이터(지갑 계정)을 저장하기 위해서
import fs, { copyFileSync } from "fs";
import path from "path";

// 지갑 계정을 저장할 위치
const addressDir: string = path.join(__dirname, "../walletData");

const ec: elliptic.ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
  public address: string;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor(_privateKey: string = "") {
    // 2-3,  4-4
    console.log("2-3/4-4 지갑 생성 시작");
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    this.balance = 0;

    !fs.existsSync(addressDir) && fs.mkdirSync(addressDir);
    // 폴더가 있는지 확인한다. 없다면 폴더를 만들어준다.

    // 2-6/4-7
    console.log(
      "2-6/4-7 지갑 주소 이름으로 파일 생성하고 그 내용으로 개인키 저장"
    );

    const fileName = path.join(addressDir, this.address);
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    // 2-5/4-6 공개키로 지갑 주소 생성
    console.log("2-5/4-6 공개키로 지갑 주소 생성");
    return this.publicKey.slice(26);
    // 이더리움 방식으로 진행할 것이기에 이렇게 해준다.
  }

  public getPrivateKey(): string {
    // 2-3-1 개인키가 없으면 생성
    console.log("2-3-1 개인키가 없으면 생성하자.");
    return lib.WordArray.random(32).toString().toUpperCase();
    // 64자리의 무작위 16진수 생성
  }

  public getPublicKey(): string {
    // 2-4/4-5 개인키로 공개키 생성
    console.log("2-4/4-5 개인키로 공개키 생성");
    return ec
      .keyFromPrivate(this.privateKey) // 요부분 중요. 개인키를 사용해서 키페어를 만드는 함수다. kP에서 this.privateKey번 만큼 돌린다.
      .getPublic() // 공개키 가져온다.
      .encode("hex", true) // 16진수로 바꾼다.
      .toUpperCase(); // 대문자로 바꾼다.
  }

  static getList(): Array<string> {
    // 3-3 walletData 폴더의 파일 목록을 가져온다
    console.log("3-3 walletData 폴더의 파일 목록을 가져온다.");

    // static이 있어야 클래스 자체에서 불러올 수 있다.
    const files: Array<string> = fs.readdirSync(addressDir);
    return files;
  }

  static getWalletPrivateKey(_address): string {
    // 4-3/5-5/6-5 지갑 주소 파일 명으로 파일을 불러와서 그 내부의 개인키를 가져온다.
    console.log(
      "4-3/5-5/6-5 지갑 주소 파일 명으로 파일을 불러와서 그 내용의 개인키를 가져온다."
    );

    const filePath = path.join(addressDir, _address);
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    // 5-4/6-4 서명 생성 시작
    console.log("5-4 서명 생성 시작");
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    const keyPair = ec.keyFromPrivate(privateKey);

    // 5-6/6-6 서명 반환(return)
    console.log("5-6 서명 반환(return)");
    return keyPair.sign(hash, "hex");
  }
  //   sender: {
  //     publicKey,
  //     address,
  //   },
  //   received,
  //   amount,
}

export default Wallet;
