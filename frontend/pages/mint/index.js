import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.js";
import styles from "../../styles/Mint.module.scss";
import sharedStyles from "../../styles/Home.module.scss";
import Image from "next/image";
import { readifyAddress } from "../../utils";
export default function Mint() {
  const [totalMinted, setTotalMinted] = useState(0);

  return (
    <main className={sharedStyles.container}>
      <Header />
      <section className={styles.layoutGrid}>
        <div className={styles.mintContainer}>
          <h6 className={sharedStyles.subHeading}>
            A COLLECTION OF AOTEAROAS COASTLINES
          </h6>
          <h1 className={`${sharedStyles.heading} ${styles.heading}`}>
            Mint a Coastline
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            lacinia nibh vel sem luctus convallis vel ac diam. Nunc accumsan leo
            eu mauris venenatis posuere.
          </p>
          <h6 className={styles.TotalMinted}>TOTAL MINTED: {totalMinted}/10</h6>
          <button
            className={`${sharedStyles.button} ${sharedStyles.mintButton}`}
            onClick={(e) => handleMintClick(e)}
          >
            {totalMinted == 10 ? "Sold Out" : "Mint"}
          </button>
        </div>
      </section>
    </main>
  );
}
