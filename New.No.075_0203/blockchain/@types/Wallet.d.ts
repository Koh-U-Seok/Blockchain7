declare interface IWallet {
  privateKey: string;
  publicKey: string;
  address: string;
  balance: number;

  getPrivateKey(): string;
  getPublicKey(): string;
  getAddress(): string;
}
