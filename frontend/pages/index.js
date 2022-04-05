import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import background from "../assets/background.jpg";
import subImage from "../assets/4.jpg";
import opensea from "../assets/opensea.png";
import Header from "../components/header/Header.js";
import { useAppContext } from "../context/state";
import { getAmountMinted } from "../utils";
export default function Home() {
  const [amountToMint, setAmountToMint] = useState(0);
  const [mintedAmount, setMintedAmount] = useState(0);
  const userState = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function run() {
      console.log(userState);
      const amount = await getAmountMinted();
      setMintedAmount(amount);
    }
    run();
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
