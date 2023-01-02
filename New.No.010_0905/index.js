let num = 0;
function change() {
  document.getElementById("change").innerHTML = `<img src= "${
    ++num % 3
  }.jpg" alt="change"/>`;
  //document.getElementById, innetHTML 등은 이후에 자세히 한다.
  // innerHTML은 여는 태그와 닫는 태그
}
