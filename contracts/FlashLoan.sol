// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoan is FlashLoanSimpleReceiverBase {
    address public owner;

    constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider) {
        owner = msg.sender;
    }

    function requestFlashLoan(address token, uint256 amount) external {
        require(msg.sender == owner, "Only owner can request");

        POOL.flashLoanSimple(
            address(this),
            token,
            amount,
            "", // no params
            0
        );
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata
    ) external override returns (bool) {
        //  Place your arbitrage/trading logic here

        uint256 totalOwed = amount + premium;
        IERC20(asset).approve(address(POOL), totalOwed);

        return true;
    }
}
