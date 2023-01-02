import { Route, Routes } from "react-router-dom";
import In from "./In";
import Out from "./Out";

export default function Log() {
  return (
    <div>
      Log!
      <Routes>
        <Route path="/in/:userId" element={<In></In>}></Route>{" "}
        {/* /을 붙이는 안 붙이는 상관없다. */}
        {/* params는 매개변수처럼 쓸 수 있다. */}
        <Route path="/out" element={<Out></Out>}></Route>
      </Routes>
    </div>
  );
}
