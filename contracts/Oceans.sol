import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity ^0.8.4;

contract Oceans is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;
    uint256 public maxSupply = 20;
    uint256 public mintPrice = 0.02 ether;
    uint256 public maxMintPerTx = 3;
    uint256 public tokenID;
    string private baseURI;
    bool public paused = false;

    constructor() ERC721A("Oceans by Erin Fleming", "OEM") {}

    function mint(uint256 _amount) public payable {
        require(_amount <= maxMintPerTx, "3_PER_TX_MAX");
        require(!paused, "MINTING_IS_PAUSED");
        require(_amount + totalSupply() <= maxSupply, "MAX_SUPPLY_REACHED");
        require(msg.value >= _amount * mintPrice, "INSUFFICIENT_ETH_AMOUNT");
        _safeMint(msg.sender, _amount);
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

    // function updateTotalSupply(uint256 _newTotalSupply) public onlyOwner {
    //     require(_newTotalSupply > currentTotalSupply, "CANT_LOWER_SUPPLY");
    //     currentTotalSupply = _newTotalSupply;
    // }
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function getAmountMinted() public view returns (string memory) {
        return _totalMinted().toString();
    }

    function withdraw() public payable onlyOwner nonReentrant {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}
