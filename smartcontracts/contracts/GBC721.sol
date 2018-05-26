pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract GBC721 is ERC721Token("Characters by GoBlockchain", "GBC"), Ownable {
    mapping (string => uint256) ipfsHashToToken;
    mapping (uint256 => string) tokenToIpfsHash;
    mapping (uint256 => uint256) tokenToPrice;
    function mint(string ipfs, uint256 price) public payable onlyOwner {
        require(ipfsHashToToken[ipfs] == 0);

        uint newTokenId = totalSupply().add(1);
        _mint(address(this), newTokenId);
        ipfsHashToToken[ipfs] = newTokenId;
        tokenToIpfsHash[newTokenId] = ipfs;
        tokenToPrice[newTokenId] = price;
    }

    function buyCard(uint256 _tokenId) public payable {
        require(ownerOf(_tokenId) == address(this));
        require(msg.value >= tokenToPrice[_tokenId]);

        clearApproval(address(this), _tokenId);
        removeTokenFrom(address(this), _tokenId);
        addTokenTo(msg.sender, _tokenId);
    }

    function getIpfsHash(uint _tokenId) public view returns(string) {
        return tokenToIpfsHash[_tokenId];
    }

    function tokensOf(address _owner) public view returns(uint[]) {
        return ownedTokens[_owner];
    }

}

