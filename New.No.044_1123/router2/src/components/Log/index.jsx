import { Outlet } from "react-router-dom";

export default function Log() {
  return (
    <div>
      Log!
      <Outlet></Outlet>
      {/* 하위 라우터의 위치를 결정한다. */}
      {/* 사용하기 위해서는 상위 컴포넌트에서 이 컴포넌트와 이 컴포넌트의 하위 컴포넌트를 상위·하위 관계로 만들어줘야 한다. */}
    </div>
  );
}
