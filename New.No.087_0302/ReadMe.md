Truffle

- 블록체인 스마트 컨트랙트
- 컴파일, 배포, 관리, 테스트 등을 제공
- 많이 사용되는 프레임워크

# Solidity Prettier 설정

- 설치법
  ```bash
  npm i -D prettier-plugin-solidity
  ```
- 단, setting.json 수정 후에 가능

# Truffle 설치법

- 설치법

  ```bash
  npm init -y
  npm i truffle
  ```

# Truffle 사용법

- 사용법

  ```bash
  npx truffle init
  ```

  - npx sequelize init과 같이 폴더/파일이 자동으로 생성된다.
  - 폴더와 파일 설명
    - contracts : 스마트 컨트랙트 코드 작성 폴더(Solidity)
    - migrations : 배포 관련 코드 작성 폴더(Javascript)
    - test : 테스트 코드 작성 폴더(Jest)
    - truffle-config.js : 설정 파일

- 컴파일

  ```bash
  npx truffle compile
  ```

  - 생성된 폴더
    - build/contracts : compile로 생성된 데이터를 json 형식으로 추출. 알아서 abi와 bin를 합쳐서 만들어주니 solc 라이브러리를 쓸 필요없다..
    - 옵션 없을 시에 수정된 sol 파일만 인식하여 컴파일을 진행
      - all 옵션일 시 무조건 전부 진행(--all)

- 배포

  ```bash
  npx truffle migration
  # 명령어 실행 전에 truffle-config.js 파일 내에서 development(67번줄부터) 관련 설정을 주석 해제해야 한다.
  ```

  - 파일 명은 번호\_내용\_컨트랙트명.js 의 형식을 지켜야 한다.

    - 1_deploy_Test.js

    ```js
    const test = artifacts.require("Test");
    // 컴파일 후 생성된 Json 파일명을 전달하여 스마트 컨트랙트 데이터를 가져온다.

    module.exports = function (deployer) {
      // deployer : truffle이 제공하는 배포를 위한 객체
      deployer.deploy(test);
    };
    ```

    - ## 배포 결과에서 CA를 가져오자
      - 0xB29462AE9Ba48a73e756019F3a490e0C26D5d1EB

- truffle을 사용해서 확인

  ```bash
  npx truffle console
  Test.deployed().then(instance => test=instance)
  test.getText.call() # Hi Block7
  test.setText("갈갈갈")
  test.getText.call() # 갈갈갈
  ```

  - 수정할 경우 compile, migration을 해야 한다.

  - Jest 테스트
    - test 폴더 내에 코드 작성
    - 명령어를 입력
    ```bash
    npx truffle test
    ```

# React로 Front 작성

1. React 프로젝트 생성

```bash
yarn create react-app front
```

2. web3 설치

```bash
cd front
yarn add web3
```

3. 카운터 스마트 컨트랙트 생성
