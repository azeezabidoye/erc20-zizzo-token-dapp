// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZizzoToken is ERC20, Ownable {

    // The hard cap — no tokens can ever be minted beyond this amount
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10 ** 18;

    // How many tokens a user receives per faucet request (100 ZTK)
    uint256 public constant FAUCET_AMOUNT = 100 * 10 ** 18;

    // How long a user must wait between faucet requests (24 hours)
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    // Tracks the last time each address used the faucet
    mapping(address => uint256) public lastRequestTime;

    constructor(address initialOwner) ERC20("ZizzoToken", "ZTK") Ownable(initialOwner) {
        // Mint an initial supply of 1,000,000 ZTK to the deployer
        _mint(initialOwner, 1_000_000 * 10 ** 18);
    }

    // Only the owner can call this; minting is blocked if it would exceed MAX_SUPPLY
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "ZizzoToken: MAX_SUPPLY exceeded");
        _mint(to, amount);
    }

    // Anyone can call this once every 24 hours to receive FAUCET_AMOUNT tokens
    function requestToken() external {
        // Make sure enough time has passed since the user's last request
        require(
            block.timestamp >= lastRequestTime[msg.sender] + FAUCET_COOLDOWN,
            "ZizzoToken: Please wait 24 hours before requesting again"
        );

        // Ensure the faucet won't push supply past the cap
        require(
            totalSupply() + FAUCET_AMOUNT <= MAX_SUPPLY,
            "ZizzoToken: Faucet supply exhausted"
        );

        // Record this request time before minting (prevents reentrancy issues)
        lastRequestTime[msg.sender] = block.timestamp;

        _mint(msg.sender, FAUCET_AMOUNT);
    }
}
