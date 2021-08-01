import React from "react";
import { useEffect, useState } from "react";
import { getClient } from '../utils/textile';

export const AppContext = React.createContext(undefined);

export function AppContextProvider({ children }) {
    
    const [ textileClient, setTextileClient ] = useState();

    useEffect(() => {
        async function init() {
            let client = await getClient();
            setTextileClient(client);
        } 
        init();
    },[]);

    return (
        <AppContext.Provider value={{
            textileClient
        }}
        >
            {children}
        </AppContext.Provider>
    )
}
