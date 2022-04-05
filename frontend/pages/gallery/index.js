import { useAppContext } from "../../context/state";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.js";
import styles from "../../styles/Gallery.module.scss";
import Image from "next/image";
import { readifyAddress } from "../../utils";
import Loading from "../../components/LoadingAnimation";
export default function Gallery() {
  const baseURI = "https://gateway.moralisipfs.com/ipfs/";
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
        const res = await fetch(tokenURI);
        const data = await res.json();
        const imageURL = data.image.split("ipfs://")[1];

        return {
          image: baseURI + imageURL,
          owner: token.owner_of,
        };
      }
    });
    const results = Promise.all(images).then((res) => {
      const images = res.filter((image) =>
        image !== undefined ? true : false
      );
      setImageObjects(images);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
    console.log(imageObjects, addr);
    const myNfts = imageObjects.filter((obj) =>
      obj.owner.toLowerCase() === addr.toLowerCase() ? true : false
    );
    setFilteredImageObjects(myNfts);
    setLoading(false);
  }
  useEffect(() => {
    setFilterActive(false);
    getData();
    console.log(userState);
  }, []);
  return (
    <main className={styles.container}>
      <Header currentPage={"gallery"} />
      <h1 className={styles.heading}>View the Collection</h1>
      <h6 className={styles.subHeading}>SCROLL DOWN TO VIEW MINTED OCEANS</h6>
      <div className={styles.filterButtonContainer}>
        <button className={styles.filterButton} onClick={() => filterOceans()}>
          {!filterActive ? "VIEW MY OCEANS" : "VIEW ALL OCEANS"}
        </button>
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <>
          <section className={styles.galleryGrid}>
            {!filterActive
              ? imageObjects.map((obj, index) => (
                  <GalleryItem
                    key={index}
                    image={obj.image}
                    owner={obj.owner}
                  />
                ))
              : filteredImageObjects.map((obj, index) => (
                  <GalleryItem
                    key={index}
                    image={obj.image}
                    owner={obj.owner}
                  />
                ))}
          </section>
        </>
      )}
    </main>
  );
}

function GalleryItem({ image, owner }) {
  if (image == undefined || owner == undefined) return "";

  return (
    <article className={styles.cardContainer}>
      <img src={image} alt={"Ocean shot"} className={styles.image} />
      <div className={styles.imageInfoContainer}>
        <div className={styles.ownerInfo}>
          <h6>OWNER</h6>
          <h6>{readifyAddress(owner)}</h6>
        </div>
        <a href={"#"} className={styles.openseaLink}>
          OPENSEA
        </a>
      </div>
    </article>
  );
}
