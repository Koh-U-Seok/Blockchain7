# RPC

- Remote Procedure Call의 약자, 원격 프로시저 호출
- 별도의 코딩없이 다른 공간에서 함수 등을 호출할 수 있는 통신 기술
- 어제 우리가 IPC를 사용해서 사용했었던 admin, eth, miner

# IPC 파일이 아닌 HTTP 통신으로 조작하기

## geth를 HTTP 통신으로 사용할 수 있도록 실행

- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작 가능

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50
```

- 위 명령어로 이더리움 네트워크 서버를 가동시킨다.

- datadir : 개인 이더리움 네트워크 데이터 저장 폴더
- http : HTTP 서버를 배포, IPC로 조작하던 개인 이더리움 네트워크를 HTTP 통신으로 조작
- http.addr : 요청 가능한 IP 주소 설정, 기본값 127.0.0.1(로컬/localhost), 0.0.0.0은 모든 IP 주소 허용. 지정해주지 않으면 루프백 주소가 기본값이니 로컬로만 접속이 가능하다.
- http.port : 요청가능한 port 설정, 기본값 8545
- http.corsdomain : CORS에 대한 설명, 와일드카드(\*) 사용 가능
- http.api : 사용 가능한 RPC를 설정, 기본값 eth, net, web3
- allow-insecure-unlock : HTTP 통신으로 계정을 열 수 있게 한다.(unlock)(공식 홈페이지에서 전문가 이외에 권장히지 않는다.)
- syncmode : 피어 연결 시 동기화 방법 설정. 용량과 속도, 효율, 그리고 자신에게 필요한 요소를 고려해서 선택한다.
  - fast : 블록 헤더, 최신 1024개의 트랜잭션 동기화, 기본값(1.10) << 1.11 버전에서 삭제됨
  - full : 모든 데이터 동기화
  - light : 블록 헤더, 잔액 관련만 동기화
  - snap : 최근 128개 블록만 동기화, 기본값

## geth에 HTTP 통신으로 연결

```sh
geth attach http://localhost:8080
```

# attach로 연결한 곳에서 입력

## 계정 생성

```sh
personal.newAccount()
```

- "0x0f20e63a4eaafe1ca450357a547952fb404d630c"
- 어제 했던 clef newaccount --keystore ~/myGeth/keystore와는 같은 기능이다.
- 개발사에서 personal을 제거하겠다고 위 기능을 만든 것이다.

## 계정 풀기(unlock)

```sh
personal.unlockAccount(eth.accounts[0])
```

- RPC로 하기에 geth --datadir ~/myGeth --unlock "지갑 주소"는 서버를 껐다가 다시 켜야하는 것과 달리 서버를 끄지 않아도 RPC로 계정 잠금을 해제할 수 있다.

# geth에 HTTP 통신으로 요청

- attach 하지 않고 HTTP 통신을 사용한다.

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc":"2.0","method":"eth_accounts","params":[]}' http://localhost:8080
```

- X : 통신에 사용하는 method
- H : header
- data : 보내는 요청 body
  - id : 체인 아이디
  - jsonrpc : json 사용하는 rpc의 버전
  - method : 이더리움의 호출 메서드명
  - params : 메서드의 인자값(매개변수)

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": [
    "0x6206b10032d81a9fdd8687558883807a1e881622",
    "0xcf377d0f5f5bb952ed6d648ce11eb1a7b0885bf7",
    "0x0f20e63a4eaafe1ca450357a547952fb404d630c"
  ]
}
```

- 새로운 계정 생성

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc":"2.0","method":"personal_newAccount", "params":["password"]}' http://localhost:8080
```

- "password"를 비밀번호로 사용해서 계정 생성

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0x01c80ed6f6162210fea2db210275adc206237784"
}
```

- 계정 언락

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0x0f20e63a4eaafe1ca450357a547952fb404d630c","12345678910"]}' http://localhost:8080
```

```sh
{"jsonrpc":"2.0","id":50,"result":true}
```

- 채굴 받을 지갑 주소 설정

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc":"2.0","method":"miner_setEtherbase","params":["0x0f20e63a4eaafe1ca450357a547952fb404d630c"]}' http://localhost:8080
```

```sh
{"jsonrpc":"2.0","id":50,"result":true}
```

- 채굴 시작

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc":"2.0","method":"miner_start","params":[1]}' http://127.0.0.1:8080
```

    - miner.start(1) << 매개변수는 쓰레드를 하나만 사용한다.
        - thread : CPU의 작업 최소 단위

- 채굴 중지

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc":"2.0","method":"miner_stop","params":[]}' http://127.0.0.1:8080
```

- 잔액 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0x0f20e63a4eaafe1ca450357a547952fb404d630c", "latest"]}' http://localhost:8080
```

```sh
{"jsonrpc":"2.0","id":50,"result":"0x7dc477bc1cfa40000"}
```

- 트랜잭션 보내기

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params": [{"from": "0x0f20e63a4eaafe1ca450357a547952fb404d630c", "to": "0x01c80ed6f6162210fea2db210275adc206237784", "value": "0x3B9ACA00", "gas": "0x15f90", "gasPrice":"0x430e23400"}]}' http://localhost:8080
```

```sh
{"jsonrpc":"2.0","id":50,"result":"0x9efb8b7abafa134edf532be95bcef92c1f1159b40be3cca253b4ad758ae3f445"}
```

    - gas : 내가 이 트랜잭션에 사용한 수수료
    - gasPrice : 가스당 가격

- txpool

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```sh
{
    "jsonrpc":"2.0",
    "id":50,
    "result":{
        "pending":{
            "0x0f20E63A4eaAFe1cA450357a547952fb404d630c":{
                "1":{
                    "blockHash":null,
                    "blockNumber":null,"from":"0x0f20e63a4eaafe1ca450357a547952fb404d630c",
                    "gas":"0x15f90",
                    "gasPrice":"0x430e23400","hash":"0x9efb8b7abafa134edf532be95bcef92c1f1159b40be3cca253b4ad758ae3f445",
                    "input":"0x",
                    "nonce":"0x1","to":"0x01c80ed6f6162210fea2db210275adc206237784",
                    "transactionIndex":null,
                    "value":"0x3b9aca00",
                    "type":"0x0",
                    "chainId":"0x32",
                    "v":"0x87","r":"0x2e8434770a5f4edbf85cd92dc6e22ebdabd22d58b4ccaa96ce8dee3f32875dec","s":"0x34205db5ce90c16640d8b788080230690ca37299f824c52dbc4b72ed0b057c64"
                }
            }
        },
        "queued":{}
    }
}
```
