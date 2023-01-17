// POST /?name=kus HTTP/1.1
// Content-Type: application/json
// User-Agent: PostmanRuntime/7.30.0
// Accept: */*
// Postman-Token: 5176fdf5-7753-4d14-97e2-4a5ffb04cad7
// Host: localhost:4193
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Content-Length: 25

// {
//     "job":"student"
// }

// GET /favicon.ico HTTP/1.1
// Host: localhost:4193
// Connection: keep-alive
// sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"
// sec-ch-ua-mobile: ?0
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
// sec-ch-ua-platform: "Windows"
// Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: no-cors
// Sec-Fetch-Dest: image
// Referer: http://localhost:4193/
// Accept-Encoding: gzip, deflate, br
// Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

// parser란 무엇인가? << 파싱하는 메서드에 붙는 이름
// parsing이란 무엇인가?
// - 사전적 의미로는 구문 분석, 문장을 구성 성분으로 분해하고 위계 관계를 분석하여 문장의 구조를 결정
// - 정보를 분해·분석하여 원하는 형태로 조립한다. 즉, 내가 원하는 자료형(형태)로 가공한다.

// 자기소개
// 이름은 고우석
// 언어는 Javascript, HTML, CSS, Java
// 기술스택은 React, Redux, Node.js, MySQL
// 학원은 경일게임아카데미

// 위가 정보
// 아래가 파싱한 데이터

// const im = {
//     이름:"고우석",
//     언어:["Javascript","HTML","CSS","Java"],
//     기술스택:["React","Redux","Node.js","MySQL"],
//     학원 :{
//         이름:"경일 게임 아카데미",
//         주소:"서울특볈 ㅣ강동구 천호대로 995 금복빌딩 4층",
//         전화번호:"02-479-4050"
//     }
// }

const getQuery = (queryString) => {
  if (!queryString) return {};
  // 입력된 queryString이 없으면 빈 객체를 반환한다.

  //   const query = {};
  //   // 쿼리스트링을 분해해서 담을 쿼리를 객체로 생성해둔다.

  //   queryString = queryString.split("&");
  //   // 각 쿼리는 & 표시로 나눠진다.

  //   for (let i = 0; i < queryString.length; i++) {
  //     const temp = queryString[i].split("=");
  //     // 나눠진 각 쿼리를 '='를 기준으로 나눠서

  //     query[temp[0].trim()] = temp[1].trim();
  //     // name = kus => query{name : kus}
  //   }
  //   return query;

  return queryString
    .split("&")
    .map((item) => item.split("="))
    .reduce((prev, curr) => {
      prev[curr[0].trim()] = curr[1].trim();
      return prev;
    }, {});
};
const getMessage = (lines) => {
  const headers = {};
  while (true) {
    const temp = lines.shift();
    if (!temp) break;
    // 요청에 포함된 정보에서 body를 넣기 전에 빈 줄을 넣어놨다.
    // 그 빈 줄은  lines 내에서 빈 문자열(string)으로 저장된다.
    // 헤더(headers)만 파싱하기 위해 빈 스트링을 기준으로 반복을 멈추도록 한다.
    const index = temp.indexOf(":");
    // 'Content-Type: application/json'
    // headers[temp.slice(0, index)] = temp.slice(index + 1).trim();
    let value = temp.slice(index + 1).trim();
    if (!isNaN(+value)) value = +value;

    headers[
      temp[0].toLowerCase() + temp.slice(1, index).replaceAll("-", "").trim()
    ] = temp.slice(index + 1).trim();
  }
  let body = lines.join("");
  if (body) {
    if (
      global.isJson &&
      headers["contentType"].indexOf("application/json") > -1
    ) {
      body = JSON.parse(body);
    } else if (
      headers["contentType"].indexOf("application/x-www-form-urlencoded") > -1
    ) {
      body = getQuery(body);
    }
  }

  return { headers, body };
};

const parser = (data) => {
  const lines = data.split("\r\n");
  console.log("lines : ", lines);
  // 요청에 포함된 데이터는 각 줄마다 뜻하는 설정이 있다. 그래서 줄로 나눈다.

  //   const firstLine = lines.shift().split(" ");
  //   console.log("firstLine : ", firstLine);
  //   // 첫번째 줄은 요청을 보낼 때 사용한 형식(method), 주소(라우터, url), 프로토콜의 버전(version)이 ' '를 사이에 두고 연결되어 있다.

  //   const method = firstLine[0];
  //   const url = firstLine[1];
  //   const version = firstLine[2];
  const [method, url, version] = lines.shift().split(" ");

  console.log("method : ", method);
  console.log("url : ", url);
  console.log("version : ", version);
  // ' '를 기준으로 나눠 각 데이터를 객체에 넣어 변환할 수 있게 한다.

  //   const path = url.split("?")[0];
  //   const queryString = url.split("?")[1];
  // url을 라우터(path)와 쿼리스트링(queryString)으로 나눈다.

  const [path, queryString] = url.split("?");

  const query = getQuery(queryString);

  console.log("path: ", path);
  console.log("queryString : ", queryString);
  console.log("query : ", query);
  // 쿼리스트링은 다시 각 쿼리로 나눠 객체에 담아 반환한다.

  const dataObj = getMessage(lines);
  console.log("dataObj : ", dataObj);

  return { method, url, version, path, queryString, query, ...dataObj };
};

module.exports = parser;
