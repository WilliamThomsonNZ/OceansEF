import { motion } from "framer-motion";
import React from "react";

export const AnimatedLetters = ({ title, isTopRow }) => {
  const letterAni = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.405, 0, 0.025, 1],
        duration: 1,
      },
    },
  };
  const banner = {
    animate: {
      transition: {
        //delayChildren: delay,
        staggerChildren: 0.04,
      },
    },
  };
  return (
    <motion.span variants={banner} initial="initial" animate="animate">
      {[...title].map((letter, index) => (
        <motion.span variants={letterAni} key={index}>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedLetters;
