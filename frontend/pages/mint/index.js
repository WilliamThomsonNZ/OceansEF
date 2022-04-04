import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.js";
import styles from "../../styles/Mint.module.scss";
import sharedStyles from "../../styles/Home.module.scss";
import mainImage from "../../assets/8.jpg";
import Image from "next/image";
import { getAmountMinted } from "../../utils";

export default function Mint() {
  const [totalMinted, setTotalMinted] = useState(0);
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
  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, []);

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
          <h6 className={styles.totalMinted}>TOTAL MINTED: {totalMinted}/10</h6>
          <button
            className={`${sharedStyles.button} ${sharedStyles.mintButton}`}
            onClick={(e) => handleMintClick(e)}
          >
            {totalMinted == 10 ? "Sold Out" : "Mint"}
          </button>
        </div>
        <div className={styles.mainImageContainer}>
          <div>
            <Image
              src={mainImage}
              alt={"Image of beach"}
              className={styles.mainHomeImage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
