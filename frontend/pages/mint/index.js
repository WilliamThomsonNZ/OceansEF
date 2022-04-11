import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.js";
import styles from "../../styles/Mint.module.scss";
import sharedStyles from "../../styles/Home.module.scss";
import mainImage from "../../assets/background.jpg";
import Image from "next/image";
import { Contract, utils } from "ethers";
import { getAmountMinted, getProviderOrSigner } from "../../utils";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants";
import Loading from "../../components/LoadingAnimation";
import { motion } from "framer-motion";
import { variants } from "../../utils/framerMotionVariants";

export default function Mint() {
  const [totalMinted, setTotalMinted] = useState("0");
  const [loading, setLoading] = useState(false);
  const [amountToMint, setAmountToMint] = useState(1);
  const [displayError, setDisplayError] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleMintAmount(isSubtract = false) {
    let mintAmount;
    if (isSubtract) {
      mintAmount = amountToMint > 1 ? amountToMint - 1 : 1;
    } else {
      mintAmount = amountToMint < 3 ? amountToMint + 1 : 3;
    }
    setAmountToMint(mintAmount);
  }

  async function handleMintClick() {
    setLoading(true);
    const mintPrice = 0.044;
    try {
      if (amountToMint == 0) return;
      if (totalMinted == 10) return;
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const mintValue = String(amountToMint * mintPrice);
      const tx = await contract.mint(amountToMint, {
        value: utils.parseEther(mintValue),
      });
      await tx.wait();
      const amount = await getAmountMinted();
      setTotalMinted(amount);
      setLoading(false);
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "INSUFFICIENT_FUNDS":
          setErrorText("Insufficient funds");
          break;
        default:
          setErrorText(
            "An error occured and the transaction was not processed"
          );
          break;
      }
      setDisplayError(true);
      setLoading(false);
      setTimeout(() => {
        setDisplayError(false);
      }, 4000);
    }
  }
  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, []);

  return (
    <main className={sharedStyles.container}>
      <Header currentPage={"mint"} />
      <section className={styles.mintPageContainer}>
        <div className={styles.layoutGrid}>
          <motion.div
            className={styles.mintContainer}
            variants={variants.fadeIn}
            initial={"initial"}
            animate={"animate"}
          >
            <h6 className={sharedStyles.subHeading}>
              A COLLECTION OF AOTEAROAS COASTLINES
            </h6>
            <h1 className={`${sharedStyles.heading} ${styles.heading}`}>
              Mint a Coastline
            </h1>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              lacinia nibh vel sem luctus convallis vel ac diam. Nunc accumsan
              leo eu mauris venenatis posuere.
            </p>
            <h6 className={styles.totalMinted}>
              TOTAL MINTED: {totalMinted}/10
            </h6>
            <div className={styles.mintButtonContainer}>
              <button
                className={`${sharedStyles.button} ${sharedStyles.mintButton} ${styles.mintButton}`}
                onClick={(e) => handleMintClick(e)}
              >
                {totalMinted == 10
                  ? "Sold Out"
                  : loading
                  ? "Minting..."
                  : "Mint"}
              </button>
              <div className={styles.mintControls}>
                <span className={styles.numberToMint}>{amountToMint}</span>
                <button
                  onClick={() => handleMintAmount()}
                  className={`${styles.mintButtonIncrease} ${styles.controlButton}`}
                >
                  +
                </button>
                <button
                  onClick={() => handleMintAmount(true)}
                  className={`${styles.mintButtonDecrease} ${styles.controlButton}`}
                >
                  -
                </button>
              </div>
            </div>
            <span
              className={`${styles.errorMessage} ${
                displayError ? styles.showError : undefined
              }`}
            >
              {errorText}
            </span>
          </motion.div>
          <div className={styles.mainImageContainer}>
            <div>
              <motion.div
                className={styles.imageInnerContainer}
                variants={variants.imageScale}
                initial={"initial"}
                animate={"animate"}
              >
                <Image
                  src={mainImage}
                  alt={"Image of beach"}
                  className={styles.mainHomeImage}
                />
              </motion.div>
              <motion.div
                variants={variants.imageIntro}
                initial={"initial"}
                animate={"animate"}
                className={styles.imageIntroAnimation}
              ></motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
