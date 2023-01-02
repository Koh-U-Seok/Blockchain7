# yarn build란

- 우리가 작성한 jsx, css, js, html 파일 등등을 하나로 합쳐서 Front에서 인식할 수 있는 파일로 생성해준다.
- Front에서 인식하 수 있는 파일
  - html, css, js, 등등
- webpack, babel 라이브러리를 사용하게 된다.
  - webpack이란 Javascript 모듈 번들러
    - 파일을 하나로 묶어주는 기능을 한다.
    - 난독화, 코드 압축 등을 제공한다.
  - babel이란 Javascript 컴파일러이다.(babel 공홈 왈)
    - 컴파일러란 개발자가 작성하는 프로그래밍 언어(C++, C#, Java 등등)를 컴퓨터가 읽고 실행할 수 있는 언어(기계어, 1F23B4)로 바꿔준다.
    - 기존에 ES6 등 최신 Javascript 문법을 지원하지 않는 브라우저를 위해 ES6 이하의 문법으로 수정해준다.
    - EX) import => require()
- 하나로 완성된 build 폴더 내의 파일들을 Front의 파일로 배포하게 된다.
- React로 개발된 프로젝트는 yarn build(npm build) 명령어를 실행해서 build 폴더에 생성되는 파일로 웹페이지를 배포한다.
  - AWS EC2 인스턴스에 build 폴더 내에 있는 파일, 폴더를 모두 올려 웹페이지를 출력할 수 있다.
