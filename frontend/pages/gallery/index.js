import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/header/index.js";
import styles from "../../styles/Gallery.module.scss";
import Image from "next/image";
import { readifyAddress } from "../../utils";
import Loading from "../../components/LoadingAnimation";
import Head from "next/head";
import { variants } from "../../utils/framerMotionVariants";
import { motion, AnimatePresence } from "framer-motion";
import { CONTRACT_ADDRESS } from "../../constants";
export default function Gallery() {
  const baseURI = "https://ipfs.moralis.io:2053/ipfs/";
  const imageMetaData = process.env.IMAGE_METADATA;
  const [imageObjects, setImageObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredImageObjects, setFilteredImageObjects] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const userState = useAppContext();

  async function getData() {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    const images = data.result.map(async (token) => {
      const tokenURI = token.token_uri;
      if (tokenURI) {
        return {
          image: `${baseURI}${imageMetaData}/${token.token_id}.jpg`,
          owner: token.owner_of,
          tokenId: token.token_id,
        };
      }
    });
    Promise.all(images).then((res) => {
      const images = res.filter((image) =>
        image !== undefined ? true : false
      );
      setImageObjects(images);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }
  function filterOceans() {
    if (filterActive) {
      setFilterActive(false);
      return;
    }
    setLoading(true);
    setFilterActive(true);
    const addr = userState.userWallet;
    const myNfts = imageObjects.filter((obj) =>
      obj.owner.toLowerCase() === addr.toLowerCase() ? true : false
    );
    setFilteredImageObjects(myNfts);
    setLoading(false);
  }
  useEffect(() => {
    setFilterActive(false);
    getData();
  }, []);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Libre+Baskerville&display=swap"
          }
          rel={"stylesheet"}
        />
      </Head>
      <main className={styles.container}>
        <Header currentPage={"gallery"} />
        <motion.h1
          variants={variants.fadeIn}
          initial={"initial"}
          animate={"animate"}
          className={styles.heading}
        >
          View the Collection
        </motion.h1>
        <motion.h6
          variants={variants.fadeIn}
          initial={"initial"}
          animate={"animate"}
          className={styles.subHeading}
        >
          SCROLL DOWN TO VIEW MINTED OCEANS
        </motion.h6>
        <AnimatePresence exitBeforeEnter>
          {loading ? (
            <motion.div
              className={styles.loadingContainer}
              key={"loadingContainer"}
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
            >
              <motion.div
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                variants={variants.loadingContainer}
                key={"container"}
              >
                <motion.span variants={variants.loadingLetter} key={"L"}>
                  L
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"O"}>
                  O
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"A"}>
                  A
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"D"}>
                  D
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"I"}>
                  I
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"N"}>
                  N
                </motion.span>
                <motion.span variants={variants.loadingLetter} key={"G"}>
                  G
                </motion.span>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <div className={styles.filterButtonContainer}>
                <motion.button
                  className={styles.filterButton}
                  onClick={() => filterOceans()}
                  variants={variants.fadeIn}
                  initial={"initial"}
                  animate={"animate"}
                >
                  {!filterActive ? "VIEW MY OCEANS" : "VIEW ALL OCEANS"}
                  <motion.span
                    className={styles.buttonUnderline}
                    variants={variants.buttonUnderline}
                    initial={"initial"}
                    animate={"animate"}
                  ></motion.span>
                </motion.button>
              </div>
              <AnimatePresence exitBeforeEnter>
                <motion.section
                  className={styles.galleryGrid}
                  key={"outerContainer"}
                >
                  {!filterActive
                    ? imageObjects.map((obj, index) => (
                        <GalleryItem
                          key={index}
                          image={obj.image}
                          owner={obj.owner}
                          id={obj.tokenId}
                        />
                      ))
                    : filteredImageObjects.map((obj, index) => (
                        <GalleryItem
                          key={index}
                          image={obj.image}
                          owner={obj.owner}
                          id={obj.tokenId}
                        />
                      ))}
                </motion.section>
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

function GalleryItem({ image, owner, id }) {
  if (image == undefined || owner == undefined) return "";
  return (
    <motion.article
      className={styles.cardContainer}
      variants={variants.fadeIn}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      key={image}
    >
      <img src={image} alt={"Ocean shot"} className={styles.image} />
      <div className={styles.imageInfoContainer}>
        <div className={styles.ownerInfo}>
          <h6>OWNER</h6>
          <h6>
            <a
              href={`https://opensea.io/${owner}`}
              target="_blank"
              rel="noreferrer"
            >
              {readifyAddress(owner)}
            </a>
          </h6>
        </div>
        <a
          href={`https://opensea.io/${CONTRACT_ADDRESS}/${id}`}
          className={styles.openseaLink}
          target={"_blank"}
          rel="noreferrer"
        >
          OPENSEA
        </a>
      </div>
    </motion.article>
  );
}
