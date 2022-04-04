import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import { Contract, providers, utils } from "ethers";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import Image from "next/image";
import background from "../assets/background.jpg";
import subImage from "../assets/4.jpg";
import opensea from "../assets/opensea.png";
import Header from "../components/header/Header.js";
import { useAppContext } from "../context/state";
import { getProviderOrSigner } from "../utils";
export default function Home() {
  const [amountToMint, setAmountToMint] = useState(0);
  const [mintedAmount, setMintedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const mintPrice = 0.044;

  const userState = useAppContext();

  async function getAmountMinted() {
    try {
      const provider = await getProviderOrSigner(false, userState.web3Modal);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const amountMinted = await contract.getAmountMinted();
      console.log(amountMinted);
      setMintedAmount(amountMinted);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleMintClick() {
    const mintPrice = 0.044;
    try {
      if (amountToMint == 0) return;
      if (mintedAmount == 10) return;
      setLoading(true);
      const signer = await getProviderOrSigner(true, userState.web3Modal);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const mintValue = String(amountToMint * mintPrice);
      const tx = await contract.mint(amountToMint, {
        value: utils.parseEther(mintValue),
      });
      await tx.wait();
      getAmountMinted();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  function handleMintAmount(isSubtract = false) {
    let mintAmount;
    if (isSubtract) {
      mintAmount = amountToMint > 0 ? amountToMint - 1 : 0;
    } else {
      mintAmount = amountToMint < 3 ? amountToMint + 1 : 3;
    }
    console.log(mintAmount);
    setAmountToMint(mintAmount);
  }

  useEffect(() => {
    console.log(userState);
    getAmountMinted();
  }, []);

  return (
    <main className={styles.container}>
      <Header currentPage={"Home"} />
      <div className={styles.indexContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.innerContainer}>
            <h6 className={styles.subHeading}>
              A COLLECTION OF AOTEAROAS COASTLINES
            </h6>
            <h1 className={styles.heading}>Oceans By Erin Fleming</h1>
            <button
              className={`${styles.button} ${styles.mintButton}`}
              onClick={(e) => handleMintClick(e)}
            >
              {loading
                ? "Minting..."
                : mintedAmount == 10
                ? "Sold Out"
                : "Mint"}
            </button>
            <button
              className={`${styles.moreAboutPhotographer} ${styles.mobileMoreButton}`}
            >
              MORE ABOUT THE PHOTOGRAPHER
            </button>
          </div>
          <div className={styles.mainImageContainer}>
            <div>
              <Image
                src={background}
                alt={"Image of beach"}
                className={styles.mainHomeImage}
              />
            </div>
          </div>
          <div className={styles.subImageContainer}>
            <div>
              <Image
                src={subImage}
                alt={"Image of beach"}
                className={styles.subImage}
              />
            </div>
          </div>
          <button
            className={`${styles.moreAboutPhotographer} ${styles.desktopMoreButton}`}
          >
            MORE ABOUT THE PHOTOGRAPHER
          </button>
        </div>
      </div>
    </main>
  );
}
