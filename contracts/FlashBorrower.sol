// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashBorrower is FlashLoanSimpleReceiverBase {
    address public owner;

    constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider) {
        owner = msg.sender;
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address, /* initiator */
        bytes calldata /* params */
    ) external override returns (bool) {
        // TODO: Add arbitrage logic here

        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);
        return true;
    }

    function requestFlashLoan(address asset, uint256 amount) external {
        require(msg.sender == owner, "only owner");
        POOL.flashLoanSimple(address(this), asset, amount, "", 0);
    }
}
