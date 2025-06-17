

import { createContext, useContext, useEffect, useState } from "react";
import { globalNetworkStatus } from "../utils/axiosIntance";

const NetworkStatusContext = createContext();

export const NetworkStatusProvider = ({ children }) => {
    const [connectionError, setConnectionError] = useState(null);

    
    useEffect(() => {
        globalNetworkStatus.setConnectionError = setConnectionError;
    }, []);

    return (
        <NetworkStatusContext.Provider value={{ connectionError, setConnectionError }}>
            {children}
        </NetworkStatusContext.Provider>
    );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);
