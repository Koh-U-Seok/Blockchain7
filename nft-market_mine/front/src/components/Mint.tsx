import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import React from "react";
import axios from "axios";

export const Mint = () => {
  const [NftName, setNftName] = useState<string>("");
  const [NftDescription, setNftDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [img, setImg] = useState<string | ArrayBuffer | undefined>();

  const nameInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    setNftName(e.currentTarget.value);
  }, []);

  const descriptionInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    setNftDescription(e.currentTarget.value);
  }, []);

  const fileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);

      const reader = new FileReader();
      // 파일을 읽는 객체를 만든다.

      reader.readAsDataURL(e.currentTarget.files[0]);
      // 파일 내용을 가지고 element에서 띄울 수 있게 준비하도록 시킨다.

      reader.onload = () => {
        // 준비가 끝나면

        if (reader.result) {
          setImg(reader.result);
        }
      };
    }
  }, []);
  const mint = async () => {
    if (NftName || !NftDescription || !file) return;
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    const result = (
      await axios.post("http://localhost:8080/api/mint", formData)
    ).data;
    console.log(result);
  };

  return (
    <div>
      <input type="text" onInput={nameInput} placeholder={"NFT NAME"} />
      <input
        type="text"
        onInput={descriptionInput}
        placeholder={"NFT Description"}
      />
      <input type="file" onInput={fileChange} />
      {img && (
        <div>
          <img src={img.toString()} />
        </div>
      )}
      <button onClick={mint}>Mint</button>
    </div>
  );
};
