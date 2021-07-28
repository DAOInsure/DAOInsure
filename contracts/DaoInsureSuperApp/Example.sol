pragma solidity ^0.7.0;

import {
    ISuperfluid,
    ISuperToken,
    ISuperApp,
    ISuperAgreement,
    SuperAppDefinitions
} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {
    ISuperTokenFactory
}
from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";
import {
    IConstantFlowAgreementV1
} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import { INativeSuperToken, NativeSuperTokenProxy } from "./NativeSuperToken.sol";
import { SodaMachine } from "./SodaMachine.sol"; 

contract Example {
    
    event NewContract(address _contract);
    
    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token
    INativeSuperToken public _sodaToken;
    ISuperTokenFactory private _superTokenFactory;
    address public _sodaMachine;
    
    uint256 constant TOTAL_SUPPLY = 1000000000000000000000000; // 1 M tokens
    
    constructor(     
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken,
        ISuperTokenFactory superTokenFactory
        ) {
            _host = host;
            _cfa = cfa;
            _acceptedToken= acceptedToken;
            _superTokenFactory = superTokenFactory;
            
            step1_deploy();
            step2_initProxy();
            step3_initToken();
        }
    
    function step1_deploy() internal {
        // Deploy the Custom Super Token proxy
        _sodaToken = INativeSuperToken(address(new NativeSuperTokenProxy()));
        emit NewContract(address(_sodaToken));
        
        // Deploy the machine using the new SODA token address
        _sodaMachine = address(new SodaMachine(_host, _cfa, _acceptedToken, ISuperToken(address(_sodaToken))));
        emit NewContract(_sodaMachine);
    }
    
    function step2_initProxy() internal {
        // Set the proxy to use the Super Token logic managed by Superfluid Protocol Governance
        _superTokenFactory.initializeCustomSuperToken(address(_sodaToken));
    }
    
    function step3_initToken() internal {
        // Set up the token and mint 1M tokens to the machine
        _sodaToken.initialize(
            "DAO Insure",
            "DAOINS",
            TOTAL_SUPPLY,
            address(_sodaMachine)
        );
    }
}