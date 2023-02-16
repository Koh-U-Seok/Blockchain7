import axios from "axios";
import HomeComponent from "./HomeComponent";

const HomeContainer = () => {
  const request = axios.create({
    method: "POST",
    baseURL: "http://localhost:8080",
    headers: {
      "content-type": "application/json",
    },
  });

  // const web3 = new Web3("http://localhost:8080");

  return <HomeComponent></HomeComponent>;
};
export default HomeContainer;
