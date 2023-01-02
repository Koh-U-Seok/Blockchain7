import { useEffect } from "react";

function ComponentDidUpdate() {
  useEffect(() => {
    // 여기에는 업데이트 때마다 실행되는 코드를 작성한다. => 렌더링
    console.log("이거랑");
  });
  console.log("저거랑");
  return <div></div>;
}
export default ComponentDidUpdate;
