import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../ContractConfig/daoContract";
import {
  SUPERTOKEN_CONTRACT_ADDRESS,
  SUPERTOKEN_CONTRACT_ABI,
} from "../ContractConfig/superToken";

export const Web3Context = React.createContext(undefined);

export function Web3ContextProvider({ children }) {
  const [web3Modal, setWeb3Modal] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [isPortisLoading, setIsPortisLoading] = useState(false);
  const [infuraRPC, setInfuraRPC] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [proposalsArray, setProposalsArray] = useState([]);

  const getAddress = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setSignerAddress(ethers.utils.getAddress(address));
    const tp = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.infura.io/v3/a466d43409994804b44149a1283d131f"
    );
    setInfuraRPC(tp);
    setSigner(signer);
  };

  useEffect(() => {
    if (provider) {
      getAddress();
    } else {
      setSignerAddress("");
    }
  }, [provider]);

  useEffect(() => {
    const providerOptions = {
      portis: {
        display: {
          name: "Portis",
          description: "Connect with Email and Password",
        },
        package: Portis,
        options: {
          id: "e6e65744-ec7a-4360-a174-d88df93094cc",
        },
      },
    };

    let w3m = new Web3Modal({
      providerOptions,
    });

    setWeb3Modal(w3m);
  }, []);

  async function connectWallet(choice = "") {
    try {
      if (choice == "portis") {
        setIsPortisLoading(true);
      }

      let modalProvider;
      if (choice !== "") {
        modalProvider = await web3Modal.connectTo(choice);
      } else {
        modalProvider = await web3Modal.connect();
      }

      if (modalProvider.on) {
        modalProvider.on("accountsChanged", (event, callback) => {
          window.location.reload();
        });

        modalProvider.on("chainChanged", () => {
          window.location.reload();
        });
      }

      const ethersProvider = new ethers.providers.Web3Provider(modalProvider);
      setProvider(ethersProvider);
      setIsPortisLoading(false);
      return ethersProvider;
    } catch (e) {
      disconnectWallet();
      setIsPortisLoading(false);

      console.log(e);
    }
  }

  function disconnectWallet() {
    web3Modal?.clearCachedProvider();
    setProvider(undefined);
  }

  const createProposals = async () => {
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      "0xf4c8a63Dd1b56847a9ef26efa2Fcc9a4a36663Ee",
      DAO_CONTRACT_ABI,
      signer
    );
    console.log(contract, signer);
    const tx = await contract.createProposal("hi");
    const receipt = await tx.wait();
    console.log(receipt);
  };

  const fetchProposals = () => {
    let contract = new ethers.Contract(
      DAO_CONTRACT_ADDRESS,
      DAO_CONTRACT_ABI,
      signer
    );

    contract.returnUserClaims(`${signerAddress}`).then((data) => {
      const claimIDs = data;
      claimIDs.forEach(async (element) => {
        console.log(element.toNumber());
        let item = await contract.proposalsMapping(element.toNumber());
        console.log(item);
        setProposalsArray((oldArray) => [...oldArray, item]);
      });
    });
  };

  // getClaimIDs
  //   .forEach(async (element) => {
  //     console.log(element.toNumber());
  //     let item = await contract.proposalsMapping(element.toNumber());
  //     console.log(item);
  //     proposalArray.push(item);
  //   })
  //   .
  //     return proposalArray;
  //   });

  const checkIfMemberExists = async (provider) => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const signerAdd = ethers.utils.getAddress(address);

    console.log(provider);
    let contract = new ethers.Contract(
      DAO_CONTRACT_ADDRESS,
      DAO_CONTRACT_ABI,
      provider
    );
    let status = await contract.isUserADaoMember(`${signerAdd}`);
    console.log(status);

    return status;
  };

  const userDaoTokenBalance = async () => {
    let contract = new ethers.Contract(
      SUPERTOKEN_CONTRACT_ADDRESS,
      SUPERTOKEN_CONTRACT_ABI,
      provider
    );
    let balance = await contract.balanceOf(`${signerAddress}`);
    let decimalBalance = ethers.utils.formatEther(balance);
    console.log(decimalBalance);
    return decimalBalance;
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        provider,
        web3Modal,
        isPortisLoading,
        signerAddress,
        infuraRPC,
        createProposals,
        checkIfMemberExists,
        fetchProposals,
        userDaoTokenBalance,
        proposalsArray,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
