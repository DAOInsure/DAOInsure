pragma solidity ^0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0-solc-0.7/contracts/token/ERC777/IERC777.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0-solc-0.7/contracts/introspection/IERC1820Registry.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0-solc-0.7/contracts/token/ERC777/IERC777Recipient.sol";

/**
 * @title Simple777Recipient
 * @dev Very simple ERC777 Recipient
 * see https://forum.openzeppelin.com/t/simple-erc777-token-example/746
 */
contract Simple777Recipient is IERC777Recipient {
    // erc 1820 registry keeps track of any interface implemented by any contract directly or via proxy.
    // address takes from EIP
    IERC1820Registry private _erc1820 =
        IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 private constant TOKENS_RECIPIENT_INTERFACE_HASH =
        keccak256("ERC777TokensRecipient");

    IERC777 private _token;

    // event DoneStuff(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    constructor(address token) {
        _token = IERC777(token);
        // erc 1820 is a registry that keeps the record of any interface implemented by any contract.
        // below statement tells erc1820 registry that this contract implements TOKENS_RECIPIENT_INTERFACE_HASH and the implementation is also this address.
        _erc1820.setInterfaceImplementer(
            address(this),
            TOKENS_RECIPIENT_INTERFACE_HASH,
            address(this)
        );
    }

    function tokensReceived(
        address,
        address,
        address,
        uint256,
        bytes calldata,
        bytes calldata
    ) external override {
        require(
            msg.sender == address(_token),
            "Simple777Recipient: Invalid token"
        );

        // do nothing
        // emit DoneStuff(operator, from, to, amount, userData, operatorData);
    }
}
