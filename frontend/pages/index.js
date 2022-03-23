import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {useState, useEffect, useRef} from "react"
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants"
import Image from 'next/image'
import background from "../assets/background.jpg"
import opensea from "../assets/opensea.png"


export default function Home() {
  const web3ModalRef = useRef(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectText, setConnectText] = useState("Connect Wallet");
  const [amountToMint, setAmountToMint] = useState(0);
  const [mintedAmount , setMintedAmount] = useState(0);
  const [loading, setLoading] = useState(false);


  const mintPrice = 0.044;
  async function connectWallet(){
    try{
      const signer =  await getProviderOrSigner(true);
      const addr = await signer.getAddress();
      const addressReadabale = `${addr.slice(0, 4)}...${addr.slice(-4)}`
      setConnectText(addressReadabale)
      setWalletConnected(true);
    }catch(err){
      console.error(err);
    }
  } 

  async function getProviderOrSigner(needSigner = false){
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId != 4){
      window.alert("Change the network to rinkeby");
      throw new Error("Change network to rinkeby");
    }
    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  function handleConnectWalletClick(){
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network:"rinkeby",
        providerOptions: {},
        disableInjectedProvider:false
      })
      connectWallet();
    }
  }
  async function getAmountMinted(){
    try{
      const provider = await getProviderOrSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const amountMinted = await contract.getAmountMinted();
      console.log(amountMinted);
      setMintedAmount(amountMinted);
    }catch(err){
      console.error(err)
    }
  }

  async function handleMintClick(){
    const mintPrice = 0.044;
    try{
      if(amountToMint == 0) return;
      if(mintedAmount == 10) return;
      setLoading(true);
      const signer = await getProviderOrSigner(true);
      const contract =  new Contract(CONTRACT_ADDRESS,CONTRACT_ABI, signer);
      const mintValue = String(amountToMint * mintPrice);
      const tx = await contract.mint(amountToMint, {value: utils.parseEther(mintValue)})
      await tx.wait();
      getAmountMinted();
      setLoading(false);

    }catch(err){
      console.error(err)
      setLoading(false);
    }
  }
  function handleMintAmount(isSubtract = false){
    let mintAmount;
    if(isSubtract){
      mintAmount = amountToMint > 0 ? amountToMint - 1 : 0;
    }else{
      mintAmount = amountToMint < 3 ? amountToMint + 1 : 3;
    }
    console.log(mintAmount)
    setAmountToMint(mintAmount)
  }

  useEffect(() =>{
    handleConnectWalletClick();
    getAmountMinted();
  }, [])

  return (
    <main className={styles.container}>
      <Image src={background} alt={"background image of beach"} className={styles.backgroundImage} layout="fill"/>
      <header className={styles.header}>
        <h6 className={styles.logo}>
          Erin Fleming
        </h6>
        <div className={styles.headerButtons}>
          <a href={"#"} target="_blank" className={styles.openseaLogo}><Image src={opensea} alt="opensea logo"/></a>
          <button className={`${styles.button} ${styles.connectWallet}`} onClick={e => handleConnectWalletClick(e)}>{connectText}</button>
        </div>
      </header>
      <div className={styles.contentContainer}>
          <div className={styles.innerContainer}>
            <h1 className={styles.heading}>Oceans</h1>
            <h2 className={styles.subHeading}>by Erin Fleming</h2>
            <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus ligula sem, eget iaculis nisl convallis id. Praesent iaculis diam tortor, eu viverra mi posuere placerat. </p>
            <h6 className={styles.totalSold}>Total Sold: {mintedAmount}/10</h6> 
            <div className={styles.mintingButtonsContianer}>
              <div className={styles.mintControlsContainer}>
                <button className={styles.button} onClick={(e) => handleMintAmount(true)}>-</button>
                <span className={styles.amountToMint}>{amountToMint}</span>
                <button className={styles.button} onClick={(e) => handleMintAmount()}>+</button>
              </div>
              <button className={`${styles.button} ${styles.mintButton}`} onClick={e => handleMintClick(e)}>{loading ? "Minting..." : mintedAmount == 10 ? "Sold Out" : "Mint"}</button>
            </div>
        </div>
      </div>
    </main>
  )
}
