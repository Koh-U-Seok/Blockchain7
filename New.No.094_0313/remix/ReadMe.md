```
cd New.No.094_0313
mkdir remix
cd remix
npm init -y
npm i truffle @openzeppelin/contracts @remix-project/remixd
npm i -D prettier-plugin-solidity
npx truffle init
```

# Remix 사용

- https://remix.ethereum.org << 에서 사용
- VSCode에서 작성한 로컬 파일을 Remix에서 연동

  ```bash
  npx remixd -s . --remix-ide https://remix.ethereum.org
  # npx remixd -s . -u https://remix.ethereum.org
  ```

- -s : 로컬 폴더 위치 옵션
- -u : 연결할 주소

- npx remixd -s . --remix-ide https://remix.ethereum.org를 실행한 상태에서 https://remix.ethereum.org의 workspace를 -connect to localhost로 변경한다.
- contracts의 sol 파일을 열어둔다.
- solidity compiler에서 버전을 0.8.19로 변경, Auto Compile 활성화, 그 후 Compile ~~.sol 클릭
- DEPLOY & RUN TRANSACTIONS에서 DEPLOY의 아랫바를 클릭
- \_NAME과 \_SYMBOL을 이름짓는다.
- transact
- Deployed Contracts 아랫바 클릭
- 메타 마스크에 연결된 계정을 붙여넣고 이것저것 해보자(balanceOf 등등..)

## OpenSea에서 확인하기

- https://testnets.opensea.io/

## Pinata 사용하기

- pinata는 ipfs 서비스 웹페이지다.
- ipfs : InterPlanetary File System
  - 블록체인 이더리움 네트워크에서 사용하는 P2P 파일 저장 방식
- ipfs를 사용할 경우 ubuntu, Linux 등 OS에서 프로그램을 설치한다.

  - 간단하게 테스트하기 위해 pinata를 사용하였다.

- 이미지 파일을 하나 업로드한다. CID를 복사한다.

## NFT 객체 만들기

```json
{
  "name": "test NFT",
  // NFT 이름

  "description": "testing NFT with pinata",
  // NFT 설명

  "image": "Qmc6MVb7RzR28CX5jp4wcvNQ9xS6jUJ9fvPcPZjSFiX2qJ",
  // NFT 이미지 주소
  // "https://gateway.pinata.cloud/ipfs/" + pinata 웹페이지에서의 파일의 CID
  // CID == URI (식별자)
  "attributes": [
    // Levels에서 출력되는 내용

    {
      "trait_type": "Rank",
      // 카테고리 이름

      "value": 1
      // 값
    },
    {
      "trait_type": "Type",
      //

      "value": 1
      //
    }
  ]
}
```

- Pinata에 업로드한다.

- opensea에서 확인할 수 있다.
