import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import background from "../assets/background.jpg";
import subImage from "../assets/4.jpg";
import opensea from "../assets/opensea.png";
import Header from "../components/header/Header.js";
import { useAppContext } from "../context/state";
import { getAmountMinted } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "../utils/framerMotionVariants";
import useIntro from "../utils/useIntro";

export default function Home() {
  const [amountToMint, setAmountToMint] = useState(0);
  const [mintedAmount, setMintedAmount] = useState(0);
  const userState = useAppContext();
  const [loading, setLoading] = useState(false);
  const [introComplete, setIntroComplete] = useState(true);

  //const introRun = useIntro();

  useEffect(() => {
    if (sessionStorage.getItem("introRun") == null) {
      setIntroComplete(false);
      setTimeout(() => {
        setIntroComplete(true);
        sessionStorage.setItem("introRun", "true");
      }, 4000);
    }
    async function run() {
      console.log(userState);
      const amount = await getAmountMinted();
      setMintedAmount(amount);
    }
    run();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {introComplete ? (
        <main className={styles.container}>
          <Header currentPage={"Home"} />
          <div className={styles.indexContainer}>
            <div className={styles.gridContainer}>
              <div className={styles.innerContainer}>
                <motion.h6
                  className={styles.subHeading}
                  variants={variants.fadeIn}
                  initial={"initial"}
                  animate={"animate"}
                >
                  A COLLECTION OF AOTEAROAS COASTLINES
                </motion.h6>
                <motion.h1
                  className={styles.heading}
                  variants={variants.fadeIn}
                  initial={"initial"}
                  animate={"animate"}
                >
                  Oceans By Erin Fleming
                </motion.h1>
                <motion.button
                  variants={variants.fadeIn}
                  initial={"initial"}
                  animate={"animate"}
                  className={`${styles.button} ${styles.mintButton}`}
                  onClick={(e) => handleMintClick(e)}
                >
                  {loading
                    ? "Minting..."
                    : mintedAmount == 10
                    ? "Sold Out"
                    : "Mint"}
                </motion.button>
                <div
                  className={`${styles.moreAboutPhotographer} ${styles.mobileMoreButton}`}
                >
                  <motion.button
                    variants={variants.fadeIn}
                    initial={"initial"}
                    animate={"animate"}
                  >
                    MORE ABOUT THE PHOTOGRAPHER
                  </motion.button>
                  <motion.span
                    className={styles.buttonUnderline}
                    variants={variants.buttonUnderline}
                    initial={"initial"}
                    animate={"animate"}
                  ></motion.span>
                </div>
              </div>
              <div className={styles.mainImageContainer}>
                <motion.div
                  className={styles.imageInnerContainer}
                  variants={variants.imageScale}
                  initial={"initial"}
                  animate={"animate"}
                >
                  <Image
                    src={background}
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
              <div className={styles.subImageContainer}>
                <motion.div
                  className={styles.imageInnerContainer}
                  variants={variants.imageScale}
                  initial={"initial"}
                  animate={"animate"}
                >
                  <Image
                    src={subImage}
                    alt={"Image of beach"}
                    className={styles.subImage}
                  />
                </motion.div>
                <motion.div
                  variants={variants.imageIntro}
                  initial={"initial"}
                  animate={"animate"}
                  className={styles.imageIntroAnimation}
                ></motion.div>
              </div>
              <div
                className={`${styles.moreAboutPhotographer} ${styles.desktopMoreButton}`}
              >
                <motion.button
                  variants={variants.fadeIn}
                  initial={"initial"}
                  animate={"animate"}
                >
                  MORE ABOUT THE PHOTOGRAPHER
                </motion.button>
                <motion.span
                  className={styles.buttonUnderline}
                  variants={variants.buttonUnderline}
                  initial={"initial"}
                  animate={"animate"}
                ></motion.span>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <motion.div
          className={styles.introContainer}
          variants={variants.introInner}
          animate={"animate"}
          initial={"initial"}
          exit={"exit"}
          key={"outer"}
        >
          <motion.div
            className={styles.introInnerContainer}
            variants={variants.introInner}
            animate={"animate"}
            initial={"initial"}
            exit={"exit"}
            key={"inner"}
          >
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="O"
            >
              O
            </motion.span>
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="C"
            >
              C
            </motion.span>
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="E"
            >
              E
            </motion.span>
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="A"
            >
              A
            </motion.span>
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="N"
            >
              N
            </motion.span>
            <motion.span
              className={styles.letter}
              variants={variants.introLetter}
              key="S"
            >
              S
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
