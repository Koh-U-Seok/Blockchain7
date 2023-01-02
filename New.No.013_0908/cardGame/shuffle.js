function shuffle(arr, count) {
  if (!arr?.length || typeof arr != "object") {
    alert("배열만");
    return "정상 배열만 넣어라";
  }
  for (let i = 0; i < count; i++) {
    const firstCard = parseInt(Math.random() * arr.length);
    const secondCard = parseInt(Math.random() * arr.length);
    const temp = arr[firstCard];
    //첫번째 카드를 임시 저장
    arr[firstCard] = arr[secondCard];
    arr[secondCard] = temp;
  }
  // 카드 1~8장까지 쌍으로 8페어 16장
  return arr;
}
