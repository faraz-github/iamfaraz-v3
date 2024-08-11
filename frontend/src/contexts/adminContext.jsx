import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
}

export function AdminProvider({ children }) {

    const [token, setToken] = useState(JSON.parse(localStorage.getItem("admin")));
    const [admin, setAdmin] = useState(null);

    useEffect(() => {

        if (token) {
            const getAdminProfile = async () => {
                try {
                    const response = await axios.get("/api/admin/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    if (response) {
                        setAdmin(response.data);
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            getAdminProfile();
        } else {
            setAdmin(null);
        }


    }, [token]);


    return (
        <AdminContext.Provider value={{ token, setToken, admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}