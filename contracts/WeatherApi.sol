pragma solidity ^0.8.1;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract WeatherApi is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public rain;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);

        oracle = 0xc8D925525CA8759812d0c299B90247917d4d4b7C;

        jobId = "6e0c724ba5c149268ea5877d0914c4a2";
        fee = 0.01 * (10 ** 18); // (Varies by network and job)
    }


    function requestWeatherData(string memory _lat, string memory _lon, string memory _dt) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        request.add("lat", _lat);
        request.add("lon", _lon);
        request.add("dt", _dt);
        request.addInt("times", 100);

        // request.add("path", "hourly.6.rain.1h"); // rain in mm  not sure if we can add this


        // Multiply the result by 1000000000000000000 to remove decimals
        // int timesAmount = 10**18;
        // request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }


    function fulfill(bytes32 _requestId, uint256 _rain) public recordChainlinkFulfillment(_requestId)
    {
        rain = _rain;
    }
 
    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
