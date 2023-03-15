const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const pinFileToIpfs = async () => {
  const formData = new FormData();
  const src = "imgs/mh.jfif";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metaData = JSON.stringify({
    name: "my character.jfif",
  });

  formData.append("pinataMetadata", metaData);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "content-type": `mulipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "453123c9b8b7febf1b9b",
          pinata_secret_api_key:
            "737e912c06aa31cc424300f69b52ce8355a7f470c0ec3a4f57469aa5ae4683d9",
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// pinFileToIpfs();
// QmVBq48QqQiJumPrjghFzibsSGLDiVzwdB8DFfGSams5BU

const pinJson = async () => {
  //   const formData = new FormData();
  const formData = {
    pinataMetadata: {
      name: "NFT 2",
    },
    pinataOptions: {
      cidVersion: 0,
    },
    pinataContent: {
      name: "315.2 NFT",
      description: "pinata pinata",
      image:
        "https://gateway.pinata.cloud/ipfs/QmVBq48QqQiJumPrjghFzibsSGLDiVzwdB8DFfGSams5BU",
      attributes: [],
    },
  };
  //   const metaData = JSON.stringify({
  //     name: "NFT 1",
  //   });

  //   formData.append("pinataMetadata", metaData);

  //   const options = JSON.stringify({
  //     cidVersion: 0,
  //   });
  //   formData.append("pinataOptions", options);

  //   const content = JSON.stringify({
  //     name: "315 NFT",
  //     description: "Pinata Pinata",
  //     imagae:
  //       "https://gateway.pinata.cloud.ipfs/QmVBq48QqQiJumPrjghFzibsSGLDiVzwdB8DFfGSams5BU",
  //     attributes: [],
  //   });
  //   formData.append("pinataContent", content);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      formData,
      {
        headers: {
          "content-Type": "application/json",
          pinata_api_key: "453123c9b8b7febf1b9b",
          pinata_secret_api_key:
            "737e912c06aa31cc424300f69b52ce8355a7f470c0ec3a4f57469aa5ae4683d9",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

pinJson();
