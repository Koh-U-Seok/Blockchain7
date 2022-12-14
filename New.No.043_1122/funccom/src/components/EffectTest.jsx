import { useEffect, useState, useMemo, useCallback, useRef } from "react";

export default function EffectTest() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");
  const [file, setFile] = useState({
    name: "asdf",
    ext: "png",
    type: "image/png",
  });

  console.log("확인 중");
  useEffect(() => {
    console.log("이펙트 훅 테스트 시작");
  }, []);

  useEffect(() => {
    console.log(`숫자가 ${num}으로 변경되었어`);
    setName(`${num}`);
  }, [num]);

  useEffect(() => {
    console.log("이름이 " + name + "으로 변경되었어");
    setFile({ ...file, name: name });
  }, [name]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const increase = () => {
    setNum(num + 1);
  };

  const increaseCallback = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  // 가입 => ID, PW, 이름, 나이, 성별, 지역
  // - input 함수를 만들어서 연결
  // - ID, PW, 이름, 나이, 성별, 지역 << 각각은 state
  // - ID가 바뀌었을 때 PW, 이름, 나이, 성별, 지역에 대한 함수는 선언되는가?
  // => const changeId() => {} << 해당 방법과 같이 Hook을 사용하지 않았을 경우
  // 나머지 함수들도 전부 다시 선언된다.
  // - 최적화에 사용된다. << 최적화를 생각하지 않으면 쓸 필요는 없다.
  // 두번째 매개변수 [변수]가 들어있는 hook함수와 hook이외의 함수만 실행시키고 [변수]가 들어있지 않은 hook 함수는 무시한다. << 최적화된다.

  //   const tempNum = num + 10;
  const memoNum = useMemo(() => {
    return num + 10;
  }, [num]);

  const ref = useRef();

  return (
    <div>
      <button onClick={increaseCallback}>{memoNum}</button>
      <div
        ref={ref}
        onClick={() => {
          console.log(ref.current);
        }}
      >
        {name}
      </div>
      <div>{file.name + "." + file.ext}</div>
    </div>
  );
}
