import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HostContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useHost() {
    return useContext(HostContext)
}

export function HostProvider({ hostId, children }) {
    
    const [, setLoading] = useState(true)
    const [host, setHost] = useState(null)
        
    const fetchHost = async () => {
        try {
            const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/auth/${hostId}`,
                { headers: { "ngrok-skip-browser-warning": "true" } }
            );
            setHost(response.data);
        } catch (err) {
            console.error("Error fetching host:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hostId) fetchHost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostId]);

    const updateStaycation = (staycationId, changes) => {
        setHost((prevHost) => {
            const newHost = { ...prevHost };

            const updatedStaycations = prevHost.staycations.map((s) => {
                if (s.id === staycationId) {
                    const updatedStaycation = { ...s, ...changes };
                    return updatedStaycation;
                }
                return s;
            });

            newHost.staycations = updatedStaycations;
            return newHost;
        });
    };

    const refreshHost = () => {
        if (hostId) fetchHost();
    };


    return (
        <HostContext.Provider
            value={{ host, updateStaycation, refreshHost }}>
                {children}
        </HostContext.Provider>
    );

};


