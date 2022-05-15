import nc from "next-connect";
const axios = require("axios");
import { CONTRACT_ADDRESS } from "../../../constants/index";
const handler = nc().get((req, res) => {
  axios({
    method: "get",
    url: `https://deep-index.moralis.io/api/v2/nft/${CONTRACT_ADDRESS}/owners?chain=mainnet&format=decimal`,
    headers: {
      "x-api-key": process.env.MORALIS,
      accept: "application/json",
    },
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.send(error);
    });
});

export default handler;
