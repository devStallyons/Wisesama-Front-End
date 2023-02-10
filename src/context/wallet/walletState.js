import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { fetchUserWallet } from "../../api";

import UserContext from "../user/userContext";
import WalletContext from "./walletContext"

export default function WalletState({ children }) {
    const [walletState, setWalletState] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    const user = useContext(UserContext);

    const fetchWallet = async () => {
        // console.log("this is user state", user.state.userData);
        if (user.state.userData?._id) {
            try {
                const wallet = await fetchUserWallet(user.state.userData?._id, {
                    headers: {
                        'x-auth-token': JSON.parse(localStorage.getItem('token')) ?
                            JSON.parse(localStorage.getItem('token'))
                            : searchParams.get('token')
                    }
                });
                setWalletState(wallet);

                // console.log('wallet-------', wallet);
            } catch (ex) {
                // setWallet(wallet);
                console.error(ex);
            }
        }
    };

    useEffect(() => {
        fetchWallet()
    }, [user.state.userData]);

    return (
        <WalletContext.Provider value={{ walletState, setWalletState }}>
            {children}
        </WalletContext.Provider>
    )
};