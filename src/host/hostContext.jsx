import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../config/api";
import { handleApiError } from "../utils/errorHandler";

const HostContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useHost() {
    return useContext(HostContext)
}

export function HostProvider({ hostId, children }) {

    const [loading, setLoading] = useState(true);
    const [host, setHost] = useState(null);

    const fetchHost = async () => {
        setLoading(true);

        try {
            const response = await apiClient.get(`/auth/${hostId}`);
            setHost(response.data);
        } catch (err) {
            handleApiError(err, 'Fetch Host');
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
            value={{ host, loading, updateStaycation, refreshHost }}>
            {children}
        </HostContext.Provider>
    );

};


