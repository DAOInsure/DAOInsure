// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {SuperAppBase} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import {Simple777Recipient} from "./Simple777Recipient.sol";

import {IERC20} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0-solc-0.7/contracts/token/ERC20/IERC20.sol";

// below 2 interface could be merged.
interface DAOContractInterface {
    function addDaoMember(
        address _memberAddress,
        int256 _lat,
        int256 _long
    ) external;

    function removeDaoMember(address _memberAddress) external;
}

/// @title DAOInsure SuperApp
/// @notice SuperFluid compatible SuperApp for DAOInsure
contract DAOInsureApp is Simple777Recipient, SuperAppBase {
    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token
    address private _receiver;
    ISuperToken private daoToken;

    // dao contract address
    address public daoContractAddress;

    // fake dai address
    IERC20 public fDai = IERC20(0x88271d333C72e51516B67f5567c728E702b3eeE8);

    // Simple777 is inherited to let other contracts know that this contract can receive erc777
    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken,
        ISuperToken daoToken
    ) Simple777Recipient(address(daoToken)) {
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
        assert(address(acceptedToken) != address(0));
        assert(address(daoToken) != address(0));
        _host = host;
        _cfa = cfa;
        _acceptedToken = acceptedToken;
        daoToken = daoToken;

        // config word to basically let the host know which function are not implemented.
        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        // register the app with host just like 1820 registry for receiving ERC777 tokens.
        _host.registerApp(configWord);
    }

    modifier onlyHost() {
        require(
            msg.sender == address(_host),
            "SatisfyFlows: support only one host"
        );
        _;
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        require(_isSameToken(superToken), "SatisfyFlows: not accepted token");
        require(_isCFAv1(agreementClass), "SatisfyFlows: only CFAv1 supported");
        _;
    }

    /**************************************************************************
     * SatisfyFlows Logic
     *************************************************************************/
    /// @dev If a new stream is opened, or an existing one is opened
    function _updateOutflow(
        bytes calldata ctx,
        address customer,
        bytes32 agreementId
    ) private returns (bytes memory newCtx) {
        newCtx = ctx;

        (, int96 inFlowRate, , ) = _cfa.getFlowByID(
            _acceptedToken,
            agreementId
        );
        (, int96 outFlowRate, , ) = _cfa.getFlow(
            daoToken,
            address(this),
            customer
        );

        if (inFlowRate < 0) inFlowRate = -inFlowRate; // Fixes issue when inFlowRate is negative

        if (inFlowRate == int96(0)) {
            // @dev if inFlowRate is zero, delete outflow.
            (newCtx, ) = _host.callAgreementWithContext(
                _cfa,
                abi.encodeWithSelector(
                    _cfa.deleteFlow.selector,
                    daoToken,
                    address(this),
                    customer,
                    new bytes(0) // placeholder
                ),
                "0x",
                newCtx
            );
        } else {
            // @dev If there is no existing outflow, then create new flow to equal inflow
            (newCtx, ) = _host.callAgreementWithContext(
                _cfa,
                abi.encodeWithSelector(
                    _cfa.createFlow.selector,
                    daoToken,
                    customer,
                    inFlowRate,
                    new bytes(0) // placeholder
                ),
                "0x",
                newCtx
            );
        }
    }

    /**************************************************************************
     * Added by Shrey
     *************************************************************************/

    function addMemberToDao(
        address _address,
        int256 _lat,
        int256 _long
    ) public {
        DAOContractInterface(daoContractAddress).addDaoMember(
            _address,
            _lat,
            _long
        );
    }

    function removeMemberFromDao(address _address) public {
        DAOContractInterface(daoContractAddress).removeDaoMember(_address);
    }

    // 🚨 This function needs restriction
    function setDaoContractAddress(address _address) public {
        daoContractAddress = _address;
    }

    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/
    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        address customer = _host.decodeCtx(_ctx).msgSender;

        // hard coded co-ordinates, but we can pass them in ctx using user_data field.
        addMemberToDao(customer, -90, 90);

        return _updateOutflow(_ctx, customer, _agreementId);
    }

    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata _agreementData,
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        // According to the app basic law, we should never revert in a termination callback
        if (!_isSameToken(_superToken) || !_isCFAv1(_agreementClass))
            return _ctx;
        (address customer, ) = abi.decode(_agreementData, (address, address));

        removeMemberFromDao(customer);

        return _updateOutflow(_ctx, customer, _agreementId);
    }

    function withdrawAmount(address _recipient, uint256 _amount) public {
        _acceptedToken.downgrade(_acceptedToken.balanceOf(address(this)));
        fDai.approve(_recipient, _amount);

        fDai.transfer(_recipient, _amount);
    }

    function getNetFlow() public view returns (int96) {
        return _cfa.getNetFlow(_acceptedToken, address(this));
    }

    function _isSameToken(ISuperToken superToken) private view returns (bool) {
        return address(superToken) == address(_acceptedToken);
    }

    function _isCFAv1(address agreementClass) private view returns (bool) {
        return
            ISuperAgreement(agreementClass).agreementType() ==
            keccak256(
                "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            );
    }
}
