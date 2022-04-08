import React from "react";
import styles from "./Loading.module.scss";
import { motion } from "framer-motion";
import { variants } from "../../utils/framerMotionVariants";
const Loading = () => {
  return (
    <motion.div
      class={styles.loadingContainer}
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
  );
};

export default Loading;
