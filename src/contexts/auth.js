import { createContext } from "react";

export const AuthContext = createContext({
    auth: {},
    setAuth: ({ token, userId, email }) => {},
});