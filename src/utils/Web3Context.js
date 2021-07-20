import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

export const Web3Context = React.createContext(undefined);

export function Web3ContextProvider({ children }) {

    const [ web3Modal, setWeb3Modal ] = useState(undefined);
    const [ provider, setProvider ] = useState(undefined);
    const [ signerAddress, setSignerAddress ] = useState("");
    const [ isPortisLoading, setIsPortisLoading ] = useState(false);

    const getAddress = async () => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setSignerAddress(ethers.utils.getAddress(address));
        let tp = new ethers.providers.InfuraProvider("rinkeby","57eb51f7bf2b476b8c5a358b585edcf5");
    }

    useEffect(() => {
        if (provider) {
            getAddress();
        }
        else {
            setSignerAddress("");
        }

    }, [provider])


    useEffect(() => {
        const providerOptions = {
            portis: {
                display: {
                    name: "Portis",
                    description: "Connect with Email and Password"
                },
                package: Portis,
                options: {
                    id: 'e6e65744-ec7a-4360-a174-d88df93094cc'
                }
            }
        }

        let w3m = new Web3Modal({
            providerOptions
        })

        setWeb3Modal(w3m);
    }, []);

    async function connectWallet(choice = "") {
        try {
            if(choice == "portis") {
                setIsPortisLoading(true);
            }

            let modalProvider;
            if(choice !== ""){
                modalProvider = await web3Modal.connectTo(choice);
            } else {
                modalProvider = await web3Modal.connect();
            }

            if(modalProvider.on){
                modalProvider.on("accountsChanged", (event, callback) => {
                    window.location.reload();
                })

                modalProvider.on("chainChanged", () => {
                    window.location.reload();
                })
            }

            const ethersProvider = new ethers.providers.Web3Provider(modalProvider);
            setProvider(ethersProvider);

        } catch(e) {
            disconnectWallet();
            console.log(e);
        }

        setIsPortisLoading(false);
    }

    function disconnectWallet() {
        web3Modal?.clearCachedProvider();
        setProvider(undefined);
    }

    return (
        <Web3Context.Provider value={{
            connectWallet,
            disconnectWallet,
            provider,
            web3Modal,
            isPortisLoading,
            signerAddress
        }}>
            {children}
        </Web3Context.Provider>
    )
}