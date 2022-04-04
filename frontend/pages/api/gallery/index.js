import nc from "next-connect";
const axios = require("axios");

const handler = nc().get((req, res) => {
  axios({
    method: "get",
    url: "https://deep-index.moralis.io/api/v2/nft/0x2561Bbd59933fF8f6a0E2Cc897B41C446C223cfA/owners?chain=rinkeby&format=decimal",
    headers: {
      "x-api-key":
        "06lSTWgZeipLgzrjlto3x3Klge4PgWqkRw3WpGy1iG45cMOLu2rEcdNHfuBWEatk",
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
