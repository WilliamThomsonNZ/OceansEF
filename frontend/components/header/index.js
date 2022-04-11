import { React, useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
import { getProviderOrSigner } from "../../utils";
import styles from "./Header.module.scss";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { readifyAddress } from "../../utils";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "../../utils/framerMotionVariants";
export default function Header({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  function handleMenuScroll() {
    setMenuOpen((menuOpen) => !menuOpen);
  }

  const listContainer = {
    open: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };
  return (
    <motion.header
      className={styles.header}
      variants={variants.headerVariants}
      initial={"initial"}
      animate={"animate"}
    >
      <Link href="/">
        <Image
          src={logo}
          alt={"background image of beach"}
          className={styles.logo}
          width={55}
          height={55}
        />
      </Link>
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
          <li className={styles.navItem}>
            <a href={"#"} target="_blank" rel="noreferrer">
              OPENSEA
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.headerButtons}>
        <motion.div
          className={styles.menuTextContainer}
          onClick={(e) => handleMenuScroll()}
        >
          <motion.span
            variants={variants.menuScroll}
            animate={menuOpen ? "open" : "closed"}
          >
            Menu
          </motion.span>
          <motion.span
            variants={variants.menuScroll}
            animate={menuOpen ? "open" : "closed"}
          >
            Close
          </motion.span>
        </motion.div>
        <button
          className={`${styles.button} ${styles.connectWallet}`}
          onClick={(e) => handleConnectWalletClick(e)}
        >
          {userState.userWallet
            ? readifyAddress(userState.userWallet)
            : "Connect Wallet"}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            key="menuContainer"
            variants={variants.menuContainer}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul variants={variants.listContainer}>
              <motion.li
                variants={variants.menuItem}
                className={`${styles.navItem} ${
                  currentPage == "mint" ? styles.selected : undefined
                }`}
              >
                <Link href="/mint">
                  <a>
                    <span className={styles.number}>1.</span>MINT
                  </a>
                </Link>
              </motion.li>
              <motion.li
                variants={variants.menuItem}
                className={`${styles.navItem} ${
                  currentPage == "gallery" ? styles.selected : undefined
                }`}
              >
                <Link href="/gallery">
                  <a>
                    <span className={styles.number}>2.</span>GALLERY
                  </a>
                </Link>
              </motion.li>
              <motion.li
                variants={variants.menuItem}
                className={styles.navItem}
              >
                <a href={"#"} target="_blank" rel="noreferrer">
                  <span className={styles.number}>3.</span>OPENSEA
                </a>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
