# Vue.js

## 개요

- Vue.js는 자바스크립트로 개발된 컴포넌트 구조 기반 프론트엔드 프레임워크다.

## 설치

- Window OS

```shell
npm install -g vue
npm install -g @vue/cli
```

- Mac OS

```shell
sudo npm install -g vue
sudo npm install -g @vue/cli
```

- 맥북은 관리자 권한이 필요하다.

- 글로벌로 Vue.js를 설치해서 어디에서든 Vue.js를 사용할 수 있다.

## vue 명령어가 안될 때

- 글로벌 설치가 잘 안되었다면 환경변수 등록의 문제다.
- 제어판 =>시스템 환경 변수 편집 => 환경 변수 => 시스템 변수 => Path => 편집 => C:\Users\사용자이름\AppData\Roaming\npm 이 있는지 확인하고 없으면 추가한다. 그 후, 터미널의 휴지통 버튼을 눌러 완전히 종료한 뒤 다시 실행하여 명령어를 입력하면 되는 것을 확인하였다.

## 설치된 버전 확인

```shell
vue --version
```

## 확장 프로그램 설치

- Vetur 확장 프로그램 설치
- Vue.js 프레임워크 환경에서 프론트엔드 개발하는데 유용한 확장 프로그램이다.

# Vue 프로젝트 설치

```shell
vue create vue1
```

- vue1이라는 이름의 Vue 프로젝트 폴더를 생성한다.
- Vue를 개발하기 위한 기본 설정, 옵션 뿐만 아니라 기본적인 골격 구조에 해당하는 폴더와 Vue를 구동하기 위한 모듈까지 생성한다.

- Vue 3, Vue 2, Manually select features 이렇게 기본적으로 3개의 선택지가 주어질 것이다. Vue 3를 선택한다.

- Vue 3는 출시된지 오래되지 않았다. 당연히 Vue 3에 반응하는 오픈 소스, 라이브러리들 보다는 Vue 2에 반응하는 오픈소스, 라이브러리가 훨씬 많다. 그렇기에 실무에서는 Vue 2 버전으로 만들어지는 경우가 많다.

# Vue 실행

```shell
yarn run serve
# 또는
npm run serve
```

# package.json 해석

- private

  ```json
  "private":true
  ```

  - 기본값은 true다. 아무나 접근하지 못하게 private 모드로 사용하겠다는 의미다.

- script

  - serve
    - yarn run serve할 때 serve가 여기서 나온 것이다. --port 8091 옵션을 주는 것으로 포트를 바꿔주었다.
  - build
    - 최종적으로 운영 환경에 빌드하기 전에 사용할 수 있는 파일로 변환한다.

- dependencies

  - 운영 환경에서 배포할 때 가져가야할 모듈들이다.

- devDependencies
  - 개발 환경에서 사용하는 모듈들이다.

# main.js

- yarn run serve로 실행했을 때 가장 먼저 실행되는 파일이다.
