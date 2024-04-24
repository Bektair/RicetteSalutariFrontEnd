import { jwtDecode } from "jwt-decode";
import api from "./api";
import { RefreshToken, AccessToken } from "./constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import storage from "./Storage";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);



const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const [isLoading, setLoading] = useState(true);

    //I think onload this is set to false
    useEffect(() =>  {
        auth().catch(()=>setIsLoggedIn(false))
    }, []);

    const refreshToken = async () => {
        const refreshToken = ''
        await storage.load({
            key: RefreshToken,
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            refreshToken = ret.token;
        }).catch(err => {
            alert(err)
        })

        try {
            const res = await api.post("/api/token/refresh/",{
                refresh: refreshToken
            })
            if(res.status === 200){
              storage.save({
                  key: AccessToken,
                  data: {
                      token: res.data.access
                  }
              });
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        }catch (error){
            console.log(error);
            setIsLoggedIn(false);
        } finally{
            setLoading(false)
        }

    }

    const auth = async () => {
        token = "";
        await storage.load({
            key: AccessToken,
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            token = ret.token;
        }).catch(err => {
            switch(err.name){
                case 'NotFoundError':
                    setIsLoggedIn(false)
                    return
                case 'ExpiredError':
                    //TODO
                    break;
            }
        })

        const decoded = jwtDecode(token)
        const tokenExpiration  = decoded.exp
        const now = Date.now()

    
        if(tokenExpiration && tokenExpiration < now){
            await refreshToken()
        } else {
            setIsLoggedIn(true)
            setLoading(false)
        }


    } 
    return  (
        <GlobalContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            isLoading,
            setLoading
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
    };

export default GlobalProvider;