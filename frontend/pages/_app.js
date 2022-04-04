import "../styles/globals.scss";
import { AppWrapper } from "../context/state";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <MoralisProvider
        serverUrl="https://yqoaohloac9i.usemoralis.com:2053/server"
        appId="ZarO6fuDbUKSluJWIU83HNpwtUFxxu0mzf3c106o"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </AppWrapper>
  );
}

export default MyApp;
