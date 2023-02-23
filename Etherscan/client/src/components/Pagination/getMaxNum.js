import axios from "axios";
async function getMaxNum(type) {
  try {
    const data = await axios.post("http://localhost:8090/api/getMaxNum", {
      list: type,
    });
    if (data.data.isError != true) return data.data.maxNum;
    else console.log("isError : ", data.data.isError);
  } catch (error) {
    console.error(error);
  }
}

export default getMaxNum;
