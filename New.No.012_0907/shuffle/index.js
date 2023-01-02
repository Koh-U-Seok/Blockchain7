const cards = [];

for (let i = 0; i < 8; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}
for (let i = 0; i < 16; i++) {
  const firstCard = parseInt(Math.random() * cards.length);
  // 첫번째 카드를 선택
  const secondCard = parseInt(Math.random() * cards.length);
  // 두번째 카드를 선택
  const temp = cards[firstCard];
  //첫번째 카드를 임시 저장
  cards[firstCard] = cards[secondCard];
  cards[secondCard] = temp;
}
// 카드 1~8장까지 쌍으로 8페어 16장
