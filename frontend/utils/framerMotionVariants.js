export const variants = {
  imageIntro: {
    initial: {
      width: "100%",
    },
    animate: {
      width: "0%",
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  imageScale: {
    initial: {
      scale: 1.2,
    },
    animate: {
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.15,
      },
    },
  },
  menuContainer: {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
      transition: {},
    },
  },
  menuItem: {
    open: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.41, 0, 0.13, 1.005],
        staggerChildren: 0.4,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.41, 0, 0.13, 1.005],
      },
    },
  },
  headerVariants: {
    initial: {
      y: -100,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  listContainer: {
    open: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  },
  fadeIn: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  buttonUnderline: {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 1.5,
        delay: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  introInner: {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
    exit: { transition: { staggerChildren: 0.15 } },
  },
  introLetter: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  menuScroll: {
    open: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.405, 0, 0.025, 1],
      },
    },
    closed: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.405, 0, 0.025, 1],
      },
    },
  },
  loadingContainer: {
    initial: {},
    animate: { transition: { staggerChildren: 0.15 } },
    exit: { transition: { staggerChildren: 0.15 } },
  },
  loadingLetter: {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: 30,
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};
