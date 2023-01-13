# 1. 폴더 만들기

- 블록체인을 만들 폴더를 만든다. 여기서는 BlockChainTest라고 이름지었다.

# 2. 라이브러리 설치

- npm init
  > package.json을 만들었다.
- npm i merkle
  > 머클 루트를 만들기 위한 라이브러리이다.
- npm i crypto-js
  > 암호화를 위한 라이브러리이다.
- npm i hex-to-binary
  > 16진수를 2진수로 변경하기 위한 라이브러리이다.
- npm i -D jest
  > 테스트를 하기 위한 라이브러리. -D는 개발자모드로 설치한다는 뜻이다.

# 3. 하위 폴더 만들기

- 블록을 만들어줄 폴더 block와 블록이 들어갈 체인을 만들어줄 폴더 chain를 만들었다.<br/>
  현재 폴더 구성은 다음과 같다.<br/>
  #### > &nbsp;BlockChainTest<br/>
  #### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; > block<br/>
  #### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; > chain<br/>

# 4. 파일 만들기

- 폴더를 만들었으니 폴더 내에 파일을 만들어 준다.<br>
  block 폴더에 block.js와 block.test.js를 만들어준다.<br/>
  chain 폴더에 chain.js와 chain.test.js를 만들어준다.
  <br/>

# 5. 블록 만들기

- [블록 만들기 ](./block/block.js)

# 6. 체인 만들기

- [체인 만들기](./chain/chain.js)

# 7. jest로 테스트하기

- [블록 테스트 하기](./block/block.test.js)
- [체인 테스트 하기](./chain/chain.test.js)
