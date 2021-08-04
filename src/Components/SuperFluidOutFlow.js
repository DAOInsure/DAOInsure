import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";

const web3 = new Web3();

function SuperFluidOutFlow() {

    const [ outFlowed, setOutFlowed ] = useState();
    const [ outFlowRate, setOutFlowRate ] = useState();
    const [ outFlowedETH, setOutFlowedETH ] = useState();

    async function init() {
        let response = await axios.post("https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-rinkeby", {
                query: `
                {
                    flows(where: { owner: "0x22b2dd2cfef2018d15543c484acef6d9b5435863", flowRate_gt: 0 }){
                        id
                        owner {
                            id
                        }
                        recipient {
                            id
                        }
                            flowRate
                            lastUpdate
                    }
                }
                `
            });

        let outFlowRate_ = response.data.data.flows[0].flowRate;

        let outFlowRate = web3.utils.toBN(outFlowRate_);
        setOutFlowRate(outFlowRate);
        
        let lastUpdate = response.data.data.flows[0].lastUpdate;
        let multipler = Math.floor(Date.now() / 1000) - (lastUpdate);
        let outFlowed = outFlowRate.mul(web3.utils.toBN(multipler));
        console.log(outFlowed.toString());

        setOutFlowedETH(web3.utils.fromWei(outFlowed.toString()));
        setOutFlowed(outFlowed);

    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if(outFlowed != undefined && outFlowRate != undefined) {
            setTimeout(() => {
                console.log("increment");
                let outFlowed_ = outFlowed.add(outFlowRate);
                setOutFlowed(outFlowed_);
                setOutFlowedETH(web3.utils.fromWei(outFlowed.add(outFlowRate)));
            }, 1000);
        }
    }, [outFlowed]);

    return (
        <>
            {
                outFlowedETH !== undefined ?
                <Stat>
                    <StatLabel>
                        Premium Paid
                    </StatLabel>
                    <StatNumber>
                        {outFlowedETH.toString().substr(0,9)} DAIx
                    </StatNumber>
                </Stat>
                :
                <>
                </>
            }
        </>
    );
}

export default SuperFluidOutFlow;