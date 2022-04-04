// SPDX-License-Identifier: MIT

/* - Be able to update the total supply - start with 10 piece collection.
- cost 0.044eth per piece
- Implement the minting function.
- Implement a delayed reveal of meta data
- Implement the IPFS connection.
- Test Test Test.
*/
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.4;

contract Oceans is ERC721, Ownable {
    using Strings for uint256;
    uint256 public currentTotalSupply = 10;
    uint256 public mintPrice = 0.044 ether;
    uint256 public tokenID;
    bool public revealed = false;
    string private baseURI;

    constructor() ERC721("Oceans by Erin Fleming", "OFM") {}

    function mint(uint256 _amount) public payable {
        require(_amount + tokenID <= currentTotalSupply, "MAX_SUPPLY_REACHED");
        require(msg.value == _amount * mintPrice, "INVALID_ETH_AMOUNT");
        for (uint256 i = 1; i <= _amount; i++) {
            _safeMint(msg.sender, tokenID + i);
        }
        tokenID += _amount;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (revealed) {
            return
                string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
        } else {
            return string(abi.encodePacked(baseURI));
        }
    }

    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }

    function setRevealedState(bool _state) public onlyOwner {
        revealed = _state;
    }

    function getAmountMinted() public view returns (string memory) {
        return tokenID.toString();
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
    //The images need can be done off chain.
    //Needs to return which tokens belong to which address
    function getAllAssetsOwners() 
}
