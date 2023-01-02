let firstNum = 1;
let i;
//이거 지정안해주면 무한루프걸려서 브라우저 폭파...

fibonacci1();
function fibonacci1() {
  i = parseInt(prompt("몇번을 돌릴지 넣어라!")) - 1;
  // 바로 아래의 콘솔로그로 최초의 1을 출력하는 것도 횟수에 포함시키기 위해 정수화한 다음 -1을 넣어주었다.(prompt는 문자열로 입력되기 때문.)
  console.log(firstNum);
  return fibonacci2(firstNum);
}

function fibonacci2(num) {
  if (i > 0) {
    //i가 1보다 크면 실행
    console.log(num);
    i--;
    if (i <= 0) return 0;
    // 한번 돌 때마다 콘솔로그를 두번 넣었다.
    // 처음에는 변수를 하나 만들고 i의 두배로 넣고 그걸로 계산하는 등 복잡하게 생각했으나
    // 2배 많이 출력해서 2배로 계산할 필요없이 i의 감소 횟수를 2배로 가속시키면 된다는 생각에 도달하였다.
    firstNum += num;
    console.log(firstNum);
    i--;
    return fibonacci2(firstNum + num);
    // 앞에 2칸을 뒤에 한칸에 집어넣는다.
  }
}
