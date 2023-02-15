const web3 = new Web3("http://localhost:8080");

web3.eth.extend({
  // RPC에 대한 메서드를 추가한다.

  property: "txpool",
  // 모듈 이름을 설정, 없어도 된다.

  methods: [
    {
      name: "content",
      // 호출할 때 이름(선언되는 메서드의 이름)

      call: "txpool_content",
      // RPC 이름
    },
  ],
});

web3.eth.txpool.content().then((data) => {
  console.log(data);
});
console.log(web3.txpool);
console.log(web3.personal);
