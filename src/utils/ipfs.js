import { create } from "ipfs-http-client";

const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
}

export const connectToInfuraIpfs = async () => {
    const ipfs = await create("https://ipfs-api.voodfy.com", ipfsOptions);
    return ipfs;
}
