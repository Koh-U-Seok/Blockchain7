# Ganache

- 테스트용 로컬 이더리움 네트워크
- 장점
  - Geth 등보다 속도가 빠르다.
  - 별다른 세팅없이 바로 테스트 가능
  - 기본으로 10 개의 계정이 생성되며 각 계정에 100 코인씩 지급된다.
- 단점
  - 채굴해도 보상이 없다.
    - 외부 네트워크로 연결이 안된다.
    - 서버 종료 시 모든 데이터를 삭제

## 설치

```sh
npm i -g ganache-cli
```

## 실행

```sh
npx ganache-cli
```

- cli = Commend Line Interface 의 약자

## MetaMask

1. 새로운 네트워크를 추가한다.

   - 네트워크 이름 : ganache(마음대로)
   - 새 RPC URL : http://localhost:8545
   - 체인 ID : 1337
   - 통화 기호 : ETH

2. 계정 가져오기
   - 유형 선택 : 비공개 키
     - npx ganache-cli으로 나온 private key 중 하나 선택

### options

```sh
-a | --account
# 시작 시 생성할 계정의 수, 기본값 10
# << npx ganache-cli -a 100 | npx ganache-cli -accounts 100

-e | --defaultBalanceEther
# 서버 시작 시 생성되는 계정의 소지 Ether, 기본값 100
# << npx ganache-cli -e 1000 | npx ganache-cli --defaultBalanceEther 1000

-b | --blockTime
# 자동 마이닝 시간 간격, 초 단위, 지정하지 않는게 좋음
# 기본값으로 트랜잭션 발생 시 마이닝을 바로 진행한다.
# << npx ganache-cli -b 60 | npx ganache-cli --blockTime 60

-p | --port
# 사용할 포트, 기본값은 8545
# << npx ganache-cli -p 8545 | npx ganache-cli --port 8545

-h | --host | --hostname
# 기본 접속 주소, http.addr와 같은 기능을 한다고 생각하면 된다. 기본값 127.0.0.1
# << npx ganache-cli -h 127.0.0.1 | npx ganache-cli --host 127.0.0.1 | npx ganache-cli --hostname 127.0.0.1

-g | --gasPrice # web의 가스 가격, 기본값은 20,000,000,000(20GWei)
-l | --gasLimit # 블록 가스 한도, 기본값 0x6691b7
--chainId # 체인 아이디, 기본값 1337


```

- url = http://localhost:8080
  - http << 프로토콜
  - localhost << domain
  - 127.0.0.1 << ip, host
  - 8080 << host

# RPC

- Remote Procedure Call의 약자, 원격 프로시저 호출
- 별도의 코딩없이 다른 공간에서 함수 등을 호출할 수 있는 통신 기술
- 양측의 node.js가 같은 버전을 사용해야 한다.

## geth와 같은 RPC를 사용한다.

- eth
  - accounts : 계정 조회
  - blockNumber: 가장 최근에 생성된 블록의 번호
  - coinbase : 채굴 보상을 받는 지갑
  - getBalance : params로 넣어준 지갑이 보유 중인 코인
  - sendTransaction : 코인 보내기
- miner
  - start : 자동 마이닝 시작
  - stop : 자동 마이닝 종료
- personal( rpc에 없다.)
  - unlockAccount : 계정 잠금 해제
  - newAccount : 계정 생성
  - sendTransaction : eth의 sendTransaction과 같다.(rpc, ipc 둘 다 안된다. 얘는 CURL에서만 된다.)

## Ganache 만의 RPC

- evm

  - snapshot : 현재 상태를 저장한다.

    ```sh
    curl -X POST -H "content-type:application/json" --data '{"id":1337,"jsonrpc":"2.0","method":"evm_snapshot"}' http://localhost:8545
    ```

    ```json
    { "id": 1337, "jsonrpc": "2.0", "result": "0x1" }
    ```

  - revert : snapshot으로 상태를 되돌린다. 되돌린 스냅샷 기준으로 이후의 스냅샷은 삭제된다. 0x1으로 되돌아왔다면 0x2 부터는 제거된다.

    ```sh
    curl -X POST -H "content-type:application/json" --data '{"id":1337,"jsonrpc":"2.0","method":"evm_revert","params":["0x2"]}' http://localhost:8545
    ```

    - 2번 스냅샷으로 되돌아가겠다.

    { "id": 1337, "jsonrpc": "2.0", "result": true }

  - mine : 강제 채굴
  - unlockUnknownAccount : unlockAccount와 같다. 단, 비밀번호 없이.
  - lockUnknownAccount : lockAccount와 같다. 단, 비밀 번호 없이

---

블록 정보 받아서 HTML에 출력해보기
트랜잭션 정보 받아서 HTML에 출력해보기
