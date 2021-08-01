// SPDX-License-Identifier: MIT

// change the Oracle address and JobID to the one given by the node operator
// We are working on Matic Mumbai Testnet
pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract WeatherApi is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    uint256 public rain;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        // rinkeby address and adapter job id
        // oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
        // jobId = "6d1bfe27e7034b1d87b5270556b17277";

        //local node address and job id
        oracle = 0xD68D6Cd020F28587A9Ec75F253BF064300f2F9FB;
        
        jobId = "60e2c69193d34f5baae75d2c4e9fb898";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestWeatherData(uint256 _lat, uint256 _lon, uint256 _dt) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        // request.add("get", "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=19.0434&lon=72.8593&dt=1626840053&appid=d1faee1b8f1d93501e75d2ec9b4e7634");
        request.add("lat", "_lat");
        request.add("lon", "_lon");
        request.add("dt", "_dt");

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": ,
        //     }
        //    }
        //   }
        //  }
        // request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        request.add("path", "hourly.0.rain.1h"); // rain in mm

        
        // Multiply the result by 1000000000000000000 to remove decimals
        // int timesAmount = 10**18;
        // request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _rain) public recordChainlinkFulfillment(_requestId)
    {
        rain = _rain;
    }
 
    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}