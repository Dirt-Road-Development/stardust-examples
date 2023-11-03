// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ExampleToken is ERC20, AccessControl {

    bytes32 public MINTER_ROLE = keccak256("MINTER_ROLE");
    bool public enableGasStation;
    uint256 public gasThresholdValue;
    
    event GasUsed(uint256 indexed gasUsed);

    constructor(bool _enableGasStation) ERC20("ExampleToken", "EXT") {
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        gasThresholdValue = 0.00001 ether;
        enableGasStation = _enableGasStation;
    }

    function mintByOwner(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
        if (enableGasStation) useGasStation(to);
    }

    function useGasStation(address to) internal {
        uint256 userBalance = to.balance;
        if (userBalance < gasThresholdValue && address(this).balance > gasThresholdValue) {
            uint256 fillUpAmount = gasThresholdValue - userBalance;
            payable(to).transfer(fillUpAmount);
            emit GasUsed(fillUpAmount);
        }
    }
}
