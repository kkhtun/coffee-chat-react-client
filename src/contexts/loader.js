import React, { createContext, useState } from "react";
import Loader from "../components/Loader/Loader";

const LoaderContext = createContext({});
function LoaderContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            <Loader show={loading} />
            {children}
        </LoaderContext.Provider>
    );
}

export { LoaderContextProvider, LoaderContext };
