import TempTr from "./TempTr";
export default function TempTable(props) {
  // export default function TempTable({headData, tempHead, tempArr}) {
  // props로 하면 {}로 구조분해할당을 하지 않아도 된다.
  return (
    <table>
      <thead>
        <TempTr
          tableData={props.headData}
          head={props.tempHead}
          isHead={true}
        ></TempTr>
      </thead>
      <tbody>
        {props.tempArr.map((item, index) => (
          <TempTr
            key={index}
            tableData={item}
            head={props.tempHead}
            isHead={false}
          ></TempTr>
        ))}
      </tbody>
    </table>
  );
}
