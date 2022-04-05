import { React, useRef, useEffect } from "react";
import { useAppContext } from "../../context/state";
import Web3Modal from "web3modal";
import { getProviderOrSigner } from "../../utils";
import styles from "./Header.module.scss";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { readifyAddress } from "../../utils";

export default function Header({ currentPage }) {
  const userState = useAppContext();
  async function connectWallet() {
    try {
      const signer = await getProviderOrSigner(true, userState.web3Modal);
      const addr = await signer.getAddress();
      userState.updateWalletAddress(addr);
      userState.updateWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleConnectWalletClick() {
    if (!userState.walletConnected) {
      connectWallet();
    }
  }
  useEffect(() => {
    console.log(currentPage);
    handleConnectWalletClick();
  }, []);
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src={logo}
          alt={"background image of beach"}
          className={styles.logo}
          width={55}
          height={55}
        />
      </Link>
      <nav className={styles.mobileNav}>
        <ul>
          <li
            className={`${styles.navItem} ${
              currentPage == "mint" ? styles.selected : undefined
            }`}
          >
            <Link href="/mint">
              <a>MINT</a>
            </Link>
          </li>
          <li
            className={`${styles.navItem} ${
              currentPage == "gallery" ? styles.selected : undefined
            }`}
          >
            <Link href="/gallery">
              <a>GALLERY</a>
            </Link>
          </li>
          <li className={styles.navItem}>OPENSEA</li>
        </ul>
      </nav>
      <nav className={styles.desktopNav}>
        <ul>
          <li
            className={`${styles.navItem} ${
              currentPage == "mint" ? styles.selected : undefined
            }`}
          >
            <Link href="/mint">
              <a>MINT</a>
            </Link>
          </li>
          <li
            className={`${styles.navItem} ${
              currentPage == "gallery" ? styles.selected : undefined
            }`}
          >
            <Link href="/gallery">
              <a>GALLERY</a>
            </Link>
          </li>
          <li className={styles.navItem}>OPENSEA</li>
        </ul>
      </nav>
      <div className={styles.headerButtons}>
        <button className={styles.mobileNavButton}>MENU</button>
        <button
          className={`${styles.button} ${styles.connectWallet}`}
          onClick={(e) => handleConnectWalletClick(e)}
        >
          {userState.userWallet
            ? readifyAddress(userState.userWallet)
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}
