import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.4;

contract Oceans is ERC721, Ownable {
    using Strings for uint256;
    uint256 public currentTotalSupply = 10;
    uint256 public mintPrice = 0.044 ether;
    uint256 public maxMintPerTx = 3;
    uint256 public tokenID;
    string private baseURI;
    bool public paused = false;

    constructor() ERC721("Oceans by Erin Fleming", "OFM") {}

    function mint(uint256 _amount) public payable {
        require(_amount <= maxMintPerTx, "3_PER_TX_MAX");
        require(!paused, "MINTING_IS_PAUSED");
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

        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }

    function setContractPaused(bool _val) public onlyOwner {
        paused = _val;
    }

    function updateTotalSupply(uint256 _newTotalSupply) public onlyOwner {
        require(_newTotalSupply > currentTotalSupply, "CANT_LOWER_SUPPLY");
        currentTotalSupply = _newTotalSupply;
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
}
