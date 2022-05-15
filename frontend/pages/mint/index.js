import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/header/index.js";
import styles from "../../styles/Mint.module.scss";
import sharedStyles from "../../styles/Home.module.scss";
import mainImage from "../../assets/5.jpg";
import Image from "next/image";
import { Contract, utils } from "ethers";
import { getAmountMinted, getProviderOrSigner } from "../../utils";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants";
import { motion } from "framer-motion";
import Head from "next/head";
import { variants } from "../../utils/framerMotionVariants";

export default function Mint() {
  const [totalMinted, setTotalMinted] = useState("0");
  const [loading, setLoading] = useState(false);
  const [amountToMint, setAmountToMint] = useState(1);
  const [displayError, setDisplayError] = useState(false);
  const userState = useAppContext();
  const [errorText, setErrorText] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);

  userState.userWallet;
  function handleMintAmount(isSubtract = false) {
    let mintAmount;
    if (isSubtract) {
      mintAmount = amountToMint > 1 ? amountToMint - 1 : 1;
    } else {
      mintAmount = amountToMint < 3 ? amountToMint + 1 : 3;
    }
    setAmountToMint(mintAmount);
  }
  function handleError(text) {
    setErrorText(text);
    setDisplayError(true);
    setTimeout(() => {
      setDisplayError(false);
    }, 6000);
  }
  function handleMintSuccess() {
    setDisplaySuccess(true);
    setTimeout(() => {
      setDisplaySuccess(false);
    }, 10000);
  }
  async function handleMintClick() {
    if (!userState.userWallet) {
      handleError("Please connect your wallet");
      return;
    }
    if (loading) return;
    setLoading(true);
    const mintPrice = 0.02;
    try {
      if (amountToMint == 0) return;
      if (totalMinted == 20) return;
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const mintValue = String(amountToMint * mintPrice);
      const tx = await contract.mint(amountToMint, {
        value: utils.parseEther(mintValue),
      });
      await tx.wait();
      const amount = await getAmountMinted();
      setTotalMinted(amount);
      handleMintSuccess();
      setLoading(false);
    } catch (err) {
      console.error(err);
      let errorMessage;
      switch (err.code) {
        case "INSUFFICIENT_FUNDS":
          errorMessage = "Insufficient funds.";
          break;
        default:
          errorMessage =
            "An error occured and the transaction was not processed.";
          break;
      }
      handleError(errorMessage);
      setLoading(false);
    }
  }
  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, []);

  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, [userState.walletConnected]);

  return (
    <>
      <Head>
        <title>Oceans By Erin Fleming - Mint</title>
        <meta
          name="description"
          content="Oceans by Erin Fleming is a growing collection of ocean photography. Oceans serves as the genesis collection which will grant free minting for all future collections."
        />
        <link rel="icon" href="/oceansFavicon.png" />
      </Head>
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
              <h6 className={styles.totalMinted}>PRICE: 0.02 ETH</h6>
              <p className={styles.description}>
                Oceans by Erin Fleming is a growing collection of ocean
                photography. Oceans serves as the genesis collection which will
                grant free minting for all future collections. Proceeds from
                mint will be used to upgrade equipment and cover travel expenses
                to help grow the collection. Maximum of three per transaction.
              </p>
              <h6 className={styles.totalMinted}>
                TOTAL MINTED: {totalMinted}/20
              </h6>
              <div className={styles.mintButtonContainer}>
                <button
                  className={`${sharedStyles.button} ${
                    sharedStyles.mintButton
                  } ${styles.mintButton} ${
                    loading || !userState.userWallet
                      ? styles.disabled
                      : undefined
                  }`}
                  onClick={(e) => handleMintClick(e)}
                >
                  {totalMinted == 20
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

              <motion.span
                className={`${styles.errorMessage} ${styles.successMessage} ${
                  displaySuccess ? styles.showError : undefined
                }`}
              >
                Thank you for your support. Keep adventuring!
              </motion.span>
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
    </>
  );
}
