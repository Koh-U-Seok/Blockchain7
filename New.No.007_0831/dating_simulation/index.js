let myName;
let root1 = 0; //선택지 1
let root2 = 0; //선택지 2
let root3_1 = 0;
let root3_1_1 = 0; //선택지 3 여기서 부터 본격적으로 분기가 나온다.
let root3_2 = 0; //선택지 3 여기서 부터 본격적으로 분기가 나온다.
let root3_3 = 0; //선택지 3 여기서 부터 본격적으로 분기가 나온다.
let root4 = 0; //선택지 4

let root5 = 0; //선택지 5
let root6 = 0; //선택지 6
let root7 = 0; //선택지 7
let root8 = 0; //선택지 8

let rootCount = 0;
let rootLast = 0;

let badend = false; //
let ending = 0; //엔딩

let escape0;
let rebirth = 1; // 환생
let reset = 0;

let w0 = 1; //루프
let w1 = 1;
let w2 = 1;
let w2_1 = 1;
let w3 = 1;
let w4 = 1;
let w4_1 = 1;
let w5 = 1;
let w6 = 1;
let w7 = 1;
let w8 = 1;
let w9 = 1;
let w10 = 1;
let w11 = 1;
let w12 = 1;
let w13 = 1;
let w14 = 1;
let w15 = 1;
let wLast = 1;
//전체 루프
while (w0) {
  // 이름 묻기
  while (w1) {
    confirm("미연시에 온 것을 환영합니다. \n 당신의 이름을 입력해야 합니다.");
    myName = prompt("내 이름은...");
    myName == null ? confirm("누구에게나 이름은 있습니다.") : (w1 = 0);
  }

  confirm(`당신의 이름은 ${myName}입니다.`);

  // 현재 위치 묻기
  while (w2) {
    root1 = prompt(
      "당신은 지금 어디에 있습니까? \n 1. 학교 \n 2. 집 \n 3. 직장"
    );
    switch (root1) {
      case "1":
        confirm(
          "당신은 지금 학교에 있습니다.\n학생은 공부를 해야합니다. 당신은 공부하기 위해 연애를 포기했습니다..."
        );
        w2 = 0;
        badend = true;
        ending = 1;
        break;
      // 배드 엔딩 1번
      case "2":
        confirm(
          "당신은 지금 집에 있습니다.\n백수에게는 연애조차 사치입니다. 당신은 취업하기 위해 연애를 포기했습니다..."
        );
        w2 = 0;
        badend = true;
        ending = 1;
        break;
      // 배드 엔딩 1번
      case "3":
        confirm(
          "당신은 지금 직장에 있습니다.\n번듯한 직장도 있습니다. 옆에 연인만 있으면 당신은 행복할 것입니다."
        );
        w2 = 0;
        break;
      //지금 할 행동으로 넘어갑니다.
      default:
        confirm("다시 한번 선택합니다. 당신은 잘못된 선택을 한 듯 합니다.");
      //다시 현재 위치 묻기로 되돌아 간다.
    }
  }

  // 지금 할 행동
  while (w3) {
    if (ending == 0 && badend == false) {
      confirm("직장인인 당신은 자신감에 넘치고 있습니다.");
      root2 = prompt(
        "지금 무엇을 하시겠습니까?\n1. 일하기 \n 2. 잠깐의 숨돌리기 \n 3. 보고하기"
      );
      switch (root2) {
        case "1":
          confirm("당신은 하루종일 일했지만 아직 버틸만 합니다.");
          w3 = 0;
          break;
        //선배 루트
        case "2":
          confirm("당신은 커피 자판기 앞으로 갔는데 동기와 마주쳤습니다.");
          w3 = 0;
          break;
        // 동기 루트
        case "3":
          confirm("보고하러 상사에게 갔는데 상사의 미모에 홀릴 듯 합니다.");
          w3 = 0;
          break;
        // 상사 루트
        default:
          confirm("자신이 할 일을 혼동해선 안됩니다. 다시 선택합니다.");
        // 지금 할 행동 묻기로 되돌아 간다.
      }
    } else w3 = 0;
  }

  while (w4) {
    if (root2 == 1) {
      // 선배 루트 전개
      confirm(
        "열심히 일한 나에게 주는 보상으로 저녁은 외식으로 하기로 결정했습니다.\n 마침 있던 선배가 함께 하겠다고 합니다."
      );
      root3_1 = prompt(
        "당신은 선배에게 답변을 해야 합니다. \n 1. 같이 먹는다. \n 2.거절한다."
      );
      switch (root3_1) {
        //선배 루트 갈림길 선택
        case "1":
          //선배 루트 갈림길 1번 선택
          confirm(
            "당신은 같이 먹는다고 선배에게 답했습니다. \n 그러자 선배는 몹시 기뻐하였습니다."
          );
          w4 = 0;
          break;

        case "2":
          //선배 루트 갈림길 2번 선택
          while (w4_1) {
            root3_1_1 = prompt(
              "당신은 선배에게 거절할 이유를 대야 합니다.\n 1. 이미 다른 사람과 먹기로 약속했다.\n 2. 미안하지만 오늘은 혼자 먹고 싶다."
            );
            switch (root3_1_1) {
              case "1":
                confirm(
                  "선배는 엄청난 질투심에 휩싸였습니다.\n 그리고 돌이킬 수 없는 잘못된 선택을 했습니다." //
                );
                ending = 4;
                badend = 1;
                w4_1 = 0;
                break;
              // 배드 엔딩 4
              case "2":
                // 선배 루트 갈림길 2번_2번 선택
                confirm(
                  "선배는 아쉬워 하며 다음에는 같이 식사를 하자고 하며 자리를 떠났습니다."
                );
                w4_1 = 0;
                break;

              default:
                //선배 루트 갈림길 2번 다시 묻기
                confirm(
                  "그것은 올바른 대답이 아닙니다. 어떤 대답을 해야 할지 잘 생각해야 합니다."
                );
            }
          }
          w4 = 0;
          break;

        default:
      }
    } else if (root2 == 2) {
      confirm(
        "당신보다 먼저 도착해 있던 동기는 당신을 보고 반갑게 인사했습니다."
      );
      root3_2 = prompt(
        "당신은 동기에게 퇴근 후 약속을 잡으려고 합니다. \n 1.오늘 퇴근 후 저녁식사를 권유한다. \n 2.점심식사를 함께 하자고 권한다. \n 3.약속을 잡기에는 귀찮다. 인사를 마치고 다시 업무로 돌아간다."
      );
      switch (root3_2) {
        case "1":
          confirm(
            "당신은 동기에게 저녁식사를 권유했습니다. \n 하지만 동기는 오늘 야근이 예정되어 있다며 다음으로 약속을 미루었습니다."
          );
          w4 = 0;
          break;
        case "2":
          confirm(
            "당신은 동기에게 점심식사를 권유했습니다.\n동기는 웃으면서 당신의 권유를 받아들였습니다. \n"
          );
          w4 = 0;
          break;
        case "3":
          confirm(
            "동기는 무언가 아쉬운게 있는 듯하지만 다시 일하러 갈 시간입니다."
          );
          w4 = 0;
          break;
        default:
          confirm(
            "그것은 올바른 대답이 아닙니다. \n 어떤 대답을 해야 할지 잘 생각해야 합니다."
          );
      }
    } else if (root2 == 3) {
      confirm("상사는 당신의 보고가 마음에 들지 않는 듯 합니다.");
      root3_3 = prompt(
        "당신은 상사에게 변명을 해야 합니다. \n 1~3중 하나를 입력합니다. "
      );
      switch (root3_3) {
        case "1":
          confirm(
            "놀라운 말솜씨로 상사의 마음마저 돌렸습니다. 상사에게 점수를 따 식사 약속을 잡았습니다."
          );
          w4 = 0;
          break;
        case "2":
          confirm(
            "당신은 해고당했습니다. 새로운 직장을 얻으려 했지만 잘못된 선택을 하고 말았습니다."
          );
          w4 = 0;
          badend = true;
          ending = 5;
          break;
        case "3":
          confirm(
            "회사의 높으신 분들이 당신에게 실망했습니다. 당신의 눈앞이 어두워지는 듯합니다."
          );
          badend = true;
          ending = 1;
          w4 = 0;
          break;
        default:
          confirm(
            "그것은 올바른 대답이 아닙니다. \n 어떤 대답을 해야 할지 잘 생각해야 합니다."
          );
      }
    } else w4 = 0;
  }
  while (w5) {
    if (root3_1 == 1 || root3_2 == 2 || root3_3 == 1) {
      confirm("당신은 약속 상대를 만족시킬만한 괜찮은 식당을 하나 찾았습니다.");
      root4 = prompt(
        "당신은 어떤 식당을 선택했습니까? \n1.한식 \n2.중식 \n3.일식"
      );
      switch (root4) {
        case "1":
          confirm("당신은 한식당을 선택했습니다.");
          w5 = 0;
          break;
        case "2":
          confirm("당신은 중식당을 선택했습니다.");
          w5 = 0;
          break;
        case "3":
          confirm("당신은 일식당을 선택했습니다.");
          w5 = 0;
          break;
        default:
          confirm(
            "그것은 올바른 대답이 아닙니다. \n 어떤 대답을 해야 할지 잘 생각해야 합니다."
          );
      }
    } else if (root3_1_1 == 2 || root3_2 == 1 || root3_2 == 3) {
      confirm("당신의 곁에는 아무도 없습니다.");
      confirm("당신은 혼자 쓸쓸히 살아갈 것입니다.");
      confirm("아무도 당신의 옆에 서지 않습니다.");
      confirm("당신은 언제까지고 혼자일 것입니다.");
    }
    w5 = 0;
  }
  // while (w6) {
  //   if (root3_1 == 1 && root4 == 1) {
  //     confirm("당신은 선배와 한식당에 들어섰습니다.");
  //   }
  // }

  //   엔딩 부분
  if (badend == true) {
    switch (ending) {
      case 1:
        confirm("비참한 일입니다...소득세를 낼 수 있는 사람부터 됩시다.");
        break;
      case 2:
        confirm("모든 것을 잃었습니다...그러나 다시 일어날 수 있을 것입니다. ");
        break;
      case 3:
        confirm("당신은 외로운 늑대가 되었습니다.");
        break;
      case 4:
        confirm("끔찍한 고통이 느껴지고 눈앞이 흐려집니다.");
        break;
      case 5:
        confirm(
          "아쎄이! \n이 글을 보았다면 희망을 버려라!\n자진 입대를 환영한다!"
        );
        break;
      default:
        confirm("오류 발생");
        break;
    }
  }
  if (badend == false) {
    switch (ending) {
      case 1:
        confirm("친해졌습니다. 앞으로의 미래가 기대되는군요");
        break;
      case 2:
        confirm("친밀한 관계입니다.");
        break;
      case 3:
        confirm("사귀는 관계가 되었습니다.");
        break;
      case 4:
        confirm("경 해피 엔딩 축");
        break;
      case 5:
        confirm("Ang?");
        break;
      default:
        break;
    }
  }
  while (wLast) {
    confirm(
      `...이리하여 당신의 ${rebirth}번째 생이 끝났습니다. 다음 생을 시작하시겠습니까?.`
    );
    rootLast = prompt(
      "선택하십시오. \n 1.다음 생으로 가겠다. \n 2.이제 지쳤다. \n 3.이곳에 남겠다."
    );

    switch (rootLast) {
      case "1":
        confirm("당신은 다시 한 번 시작합니다.");
        ++rebirth;
        wLast = 0;
        break;
      case "2":
        confirm("당신은 지쳤습니다.");
        confirm("이제 쉬고 싶습니다.");
        confirm("반복에서 빠져나갑니다.");
        wLast = 0;
        w0 = 0;
        break;
      case "3":
        confirm(
          "아직 더 할 수 있지만 당장은 힘들어 잠깐의 휴식이 취하고자 합니다."
        );
        escape0 = prompt(
          "당신은 아무 말이라도 건네면 다시 시작할 수 있다는 것을 알고 있습니다."
        );
        confirm("당신의 정신이 다시 맑아집니다.");
        ++rebirth;
        wLast = 0;
        break;
      default:
        confirm("그 이외에는 선택할 수 없습니다. 당신은 다시 선택해야 합니다.");
    }
  }
  (root1 = 0),
    (root2 = 0),
    (root3_1 = 0),
    (root3_1_1 = 0),
    (root3_2 = 0),
    (root3_3 = 0),
    (root4 = 0),
    (root5 = 0),
    (root6 = 0),
    (root7 = 0),
    (root8 = 0),
    (rootLast = 0);

  rootCount = 0;
  rootLast = 0;
  badend = false;
  ending = 0;

  (w1 = 1),
    (w2 = 1),
    (w2_1 = 1),
    (w3 = 1),
    (w4 = 1),
    (w4_1 = 1),
    (w5 = 1),
    (w6 = 1),
    (w7 = 1),
    (w8 = 1),
    (w9 = 1),
    (w10 = 1),
    (w11 = 1),
    (w12 = 1),
    (w13 = 1),
    (w14 = 1),
    (w15 = 1),
    (wLast = 1);
}
confirm(`당신은 ${rebirth}번 루프했습니다.`);
confirm("바깥은 너무 오랜 시간이 흘렀습니다.");
confirm("반복되지 않는 세상에서 당신의 옆에는 아무도 없습니다.");
