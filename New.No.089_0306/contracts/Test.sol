// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Test {
  int num;
  string text;
  int[] numArr;
  string textArr;
  address owner;

  mapping(string => uint) public balance;

  constructor(string memory _text, int _num) {
    num = _num;
    text = "testing";
    text = _text;
    owner = msg.sender;
  }
}
