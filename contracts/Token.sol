// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol";

contract Token is ERC20, Pausable, Ownable {
    constructor(uint256 initialMint, uint256 initialPrice) ERC20("Token", "TKN") {
        _mint(msg.sender, initialMint * 10 ** decimals());
        setPrice(initialPrice);
    }

    uint256 private _price;

    event PriceChanged(uint256 price);
    event Received(address, uint);

    // The onlyOwner modifier restricts who can call the store function
    function setPrice(uint256 price) public onlyOwner {
        _price = price;
        emit PriceChanged(price);
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    receive() external payable whenNotPaused {
        console.log('value', _price / msg.value);

        uint256 tokens = msg.value / _price;
        _mint(msg.sender, tokens);
        emit Received(msg.sender, msg.value);
    }

    function _requireNotPaused() internal view virtual override{
        require(!paused(), "The bank is not selling tokens right now. Please buy from your peers.");
    }
}