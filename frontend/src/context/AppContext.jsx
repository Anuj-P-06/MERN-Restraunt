import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom"

export const AppContext = createContext();

import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true; // frontend to backend cookies will be send cookies
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);


const AppContextProvider = ({children}) => {
    const navigate = useNavigate(); // To navigate around different pages around website.
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const value = { navigate, loading, setLoading, user, setUser, axios };
    console.log("AXIOS:", axios);

    
    return (
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
