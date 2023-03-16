import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";
// import { PinataPinResponse } from "@pinata/sdk/types/commands/pinning";
// 데이터를 stream화 해준다?
// stream : 입력 장치로부터 입력되는 데이터, 출력장치로 출력되는 데이터의 흐름.
//  프로그램과 입출력 장치들과의 논리적인 연결.
//  버퍼(buffer)를 이용하여 데이터를 입출력.

const app: Express = express();
// 서버

dotenv.config();
// 설정 파일

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
// 설정 파일의 api key, api secret key로 pinata에 연결한다.

app.use(cors({ origin: true, credentials: true }));
// CORS 에러를 해결하기 위해 전부 열어주었다. credentials : 쿠키 허락

app.use(express.json());
// 전송할 때는 json 형식으로 전달

app.use(express.urlencoded({ extended: false }));
// request를 어떻게 파싱할 지 정하는 옵션이다.

const upload: multer.Multer = multer();
// nft 이미지를 업로드하기 위해선 멀터를 사용한다.

app.get("/api/list", (req: Request, res: Response) => {
  // front에서 /api/list 라우터로 들어온 요청이 들어오면 실행한다.

  const data = [
    {
      name: "test NFT",
      description: "testing NFT with Pinata",
      image:
        "https://gateway.pinata.cloud/ipfs/QmVBq48QqQiJumPrjghFzibsSGLDiVzwdB8DFfGSams5BU",
    },
    {
      name: "test NFT",
      description: "testing NFT with Pinata",
      image:
        "https://gateway.pinata.cloud/ipfs/QmQSCBVvP4Jt3Ci4fs74FgLfe2tdAPpFN27rVGBpxMfXwY",
    },
  ];
  // 사용자가 임시로 만들어둔 가짜 데이터다. 이더리움 네트워크와 통신하지 않고 그냥 적당히 꾸며주었다.

  res.send(data);
  // 가짜 데이터로 front에 응답해주었다.
});

app.post(
  "/api/mint",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // front에서 /api/mint 라우터로 들어온 요청이 들어오면 실행한다.

    const { name, description }: { name: string; description: string } =
      req.body;
    // 요청할 때 들어온 데이터를 구조분해 할당했다.

    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      // 피나타에 파일을 업로드한다.
      // pinFileToIPFS : 단일 파일, 단일 폴더를 업로드 한다.
      // Readable.from(req.file.buffer) :
      // file이라는 이름의 파일 필드를 찾아 하나의 파일만 메모리에 파싱했다. 파일 데이터는 req.file.buffer에 저장된다.
      // stream 라이브러리에서 퍼온 Readable 클래스의 from 메서드로 req.file.buffer에 있는 읽을 수 없는 데이터를 읽을 수 있게 바꿨다.

      pinataMetadata: {
        name: Date.now().toString(),
      },
      pinataOptions: {
        cidVersion: 0,
      },
      // nft 이미지를 올릴 때의 옵션들이다.
    });

    if (imgResult.isDuplicate) {
      // 같은 이미지를 넣었다면 실행

      console.log("같은 이미지!");
    }

    const jsonResult = await pinata.pinJSONToIPFS(
      // nft 이미지를 업로드했으니 이제 이미지와 한 쌍으로 올라갈 json 파일도 업로드한다. json 파일을 nft에 대한 옵션이 될 것이다.

      {
        name,
        // input으로 입력했던 name

        description,
        // input으로 입력했던 description
        //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
      },
      {
        pinataMetadata: {
          name: Date.now().toString() + ".json",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
      // nft json을 올릴 때의 옵션들이다.
    );
    console.log(jsonResult);

    res.send("mint complete");
    // front에 잘 되었다고 응답한다.
  }
);

app.listen(8080, () => {
  console.log("8080 port server open");
});

// "start:dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts"
// ts라서 index.js를 못 찾는다. 그래서 이렇게 바꿔주었다.

// npm run start:dev
// 기존의 npm start에서 npm run start:dev로 명령어가 바뀌었다.
