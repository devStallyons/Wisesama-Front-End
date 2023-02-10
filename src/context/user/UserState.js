import axios from 'axios';
import { useState, useEffect } from "react"
import { useNavigation, useSearchParams } from "react-router-dom";
import { baseurl, CrateWallet, fetchUserWallet, UserDetailApi } from '../../api';

import UserContext from "./userContext"

export default function UserState({ children }) {
    const [state, setState] = useState({
        token: null,
        userData: null,
        loading: false
    });
    const [haveWallet, setHaveWallet] = useState(false);
    const [haveCryptoWallet, setHaveCryptoWallet] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const token = JSON.parse(localStorage.getItem('token')) ?
        JSON.parse(localStorage.getItem('token'))
        : searchParams.get('token');

    const header = {
        headers: {
            'x-auth-token': token
        }
    };

    const fetchUserData = async (authToken) => {
        // console.log(authToken);
        if (!authToken) return;

        try {
            const { data } = await axios.get(`${UserDetailApi}/${authToken}`, header);
            // console.log("user data================", data);
            // localStorage.setItem('user_data', JSON.stringify(data));

            state.userData = data;
            state.loading = false;
            setState({ ...state });



        } catch (ex) {
            state.token = null;
            state.loading = false;
            setState({ ...state });
            localStorage.removeItem("token")
        }
    };

    // const testApi = async () => {
    //     try {
    //         const { data } = await axios.get(`https://api.steamapis.com/steam/profile/76561198985145818?api_key=vZBj5fZ4wMOoEmR0ECULtArpcNw`, header);
    //         // console.log('test data', data);
    //     } catch (ex) {
    //         console.error('test', ex);
    //     }
    // };

    const handleReferral = async (isLoggedIn) => {
        const refId = searchParams.get('ref');

        if (!refId || refId == "") return;

        // // Get the current URL
        // const currentUrl = new URL(window.location.href);

        // // Create a new `URLSearchParams` object from the current URL's query string
        // const searchParamsA = new URLSearchParams(currentUrl.search);

        // // Remove the query parameter with the key "param"
        // searchParamsA.delete('ref');


        try {
            await axios.put(`${baseurl}referral/IncByOne/${refId}`, { valueToInc: "totalclicks", referred: true }, header);
            if (isLoggedIn) {
                localStorage.removeItem("refUniqueId");
            }

        } catch (ex) {
            console.error(ex);
        }
    };

    const handleNewLoginFromRefLink = async (steamID) => {
        // const refId = searchParams.get('ref');
        // console.log(refId);

        // if (!refId || refId == "") return;

        // try {
        //     await axios.put(`${baseurl}referral/IncByOne/${refId}`, { valueToInc: "totalclicks" }, header);
        //     // setSearchParams('');

        // } catch (ex) {
        //     console.error(ex);
        // }

        const refUniqueID = JSON.parse(localStorage.getItem('refUniqueId'));
        const userToken = JSON.parse(localStorage.getItem('token'));

        if (userToken) {
            try {
                await axios.put(
                    `${baseurl}referral/IncByOne/${refUniqueID}`,
                    {
                        valueToInc: "accountscreated",
                        token: userToken,
                        referred: refUniqueID ? true : false
                    },
                    header
                );
                setSearchParams('');
                localStorage.removeItem('refUniqueId');

            } catch (ex) {
                console.error(ex);
            }
        }

        // setSearchParams('');

    };


    useEffect(() => {
        localStorage.removeItem("user_data")
        const savedToken = JSON.parse(localStorage.getItem('token'));
        state.loading = true;
        setState({ ...state });
        if (!savedToken) {
            const authToken = searchParams.get('token');
            state.token = authToken;
            setState({ ...state });
            localStorage.setItem('token', JSON.stringify(authToken));
            if (!authToken) {
                state.loading = false;
                setState({ ...state });
            }
            fetchUserData(authToken);

            if (authToken) {

                console.log('new login');
                handleNewLoginFromRefLink();

            } else {
                console.log('not logged in');
                handleReferral();
            }


        } else {
            console.log('not new login');
            handleReferral(true);

            // const userData = JSON.parse(localStorage.getItem('user_data'));

            // console.log(userData);

            // if (!userData) {
            //     fetchUserData(savedToken);
            //     console.log("if working ------------------");
            // } else {
            //     console.log("else working ------------------");
            //     state.userData = userData;
            //     state.token = savedToken;
            //     state.loading = false;
            //     setState({ ...state });
            // };

            state.token = savedToken;
            state.loading = false;
            setState({ ...state });
            fetchUserData(savedToken);
        };

    }, []);

    // const createWallets = async () => {
    //     // alert("creating wallet")
    //     // if (!haveWallet) {
    //     //     try {
    //     //         const result = await axios.post(CrateWallet, { userId: data._id });
    //     //         console.log(result);
    //     //     } catch (ex) {
    //     //         setHaveWallet(true);
    //     //         console.error(ex);
    //     //     }

    //     // };

    //     // if (!haveCryptoWallet) {

    //     //     try {
    //     //         const result = await axios.post(CrateWallet, { userId: data._id, currency: "crypto" });
    //     //         console.log(result);
    //     //     } catch (ex) {
    //     //         setHaveCryptoWallet(true);
    //     //         console.error(ex);
    //     //     };
    //     // };
    // };

    // useEffect(() => {
    //     createWallets();
    // }, []);

    return (
        <UserContext.Provider value={{ state, setState }}>
            {children}
        </UserContext.Provider>
    )
};