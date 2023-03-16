import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import axios from "axios";

export const Mint = () => {
  const [NftName, setName] = useState<string>("");
  const [NftDescription, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [img, setImg] = useState<string | ArrayBuffer>("");

  const nameInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    // name을 입력하기 위해 onInput에 반응하는 함수다.

    setName(e.currentTarget.value);
    // state 변수 NftName에 name input 태그의 값을 넣는다.
    // 입력할 때마다 갱신될 것이다.
  }, []);

  const descriptionInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    // description을 입력하기 위해 onInput에 반응하는 함수다.

    setDescription(e.currentTarget.value);
    // state 변수 NftDescription에 description input 태그의 값을 넣는다.
    // 입력할 때마다 갱신될 것이다.
  }, []);

  const fileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // file을 입력하기 위해 파일이 변경되었을 때 반응하는 함수다.

    console.log("asdf");
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      // 파일을 변경하였는지 확인한다.

      setFile(e.currentTarget.files[0]);
      // state 변수 file에 변경된 파일을 넣는다.

      const reader = new FileReader();
      // 파일을 읽는 객체를 만든다.

      reader.readAsDataURL(e.currentTarget.files[0]);
      // 파일 내용을 가지고 element에서 띄울 수 있게 준비하도록 시킨다.
      // 인자로 넣은 데이터를 URL로 변경한다.

      reader.onload = () => {
        // 준비가 끝나면

        if (reader.result) {
          // 파일을 읽는 객체에에 값이 들어갔다면

          setImg(reader.result);
          // state 변수 Img에 파일을 읽는 객체의 값을 넣는다.
        }
      };
    }
  }, []);

  const mint = async () => {
    // Mint 버튼을 눌렀을 때 실행한다.

    if (!NftName || !NftDescription || !file) return;
    // nft의 이름, nft의 설명, nft 그림파일 중 어느 것 하나라도 부재한다면 취소한다.

    const formData = new FormData();
    // 서버에 업로드 하기 위한 폼 객체 formData. 서버에 업로드하기 위해 하나의 박스 내지는 틀을 하나 잡았다고 보면 된다.

    formData.append("file", file);
    // formData에 파일을 추가한다. nft의 이미지 파일이다.

    formData.append("name", NftName);
    // formData에 이름을 추가한다. nft의 이름이다.

    formData.append("description", NftDescription);
    // formData에 설명을 추가한다. nft에 대한 설명이 될 것이다.

    const result =
      // 폼 객체를 서버의 라우터 /api/mint에 post 통신으로 보낸다.

      (await axios.post("http://localhost:8080/api/mint", formData)).data;
    // 서버 측의 답변 중 data를 result에 담았다.
    console.log("result : ", result);
  };

  return (
    <div>
      <input type="text" onInput={nameInput} placeholder={"NFT Name"} />
      {/* 무언가를 입력할 때 마다 nameInput 함수를 실행한다. nft의 이름을 지정하기 위한 input 태그다. */}

      <input
        type="text"
        onInput={descriptionInput}
        placeholder={"NFT Description"}
      />
      {/* 무언가를 입력할 때 마다 descriptionInput 함수를 실행한다. nft의 설명을 지정하기 위한 input 태그다. */}

      <input type="file" onChange={fileChange} />
      {/* 파일을 변경할 때 마다 fileChange 함수를 실행한다. nft 그림을 지정하기 위한 input 태그다. */}

      {img && (
        // img가 있다면

        <div>
          <img src={img.toString()} />
          {/* 변경한 이미지의 주소를 문자열로 바꿔서 넣었다. */}
        </div>
      )}
      <button onClick={mint}>Mint</button>
      {/* 버튼을 누르면 mint 메서드를 실행한다. */}
    </div>
  );
};
