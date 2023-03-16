/// <reference types="react-scripts" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    // ?가 붙은 건 없을 수도 있으니까
  }
}
