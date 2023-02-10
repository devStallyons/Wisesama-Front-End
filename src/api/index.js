import axios from "axios";

export const baseurl = 'https://steamartwork.com/api/api/';
// api's -------------------------
export const EmailVerificationApi = `${baseurl}auth/emailverification`;
export const UserDetailApi = `${baseurl}auth/userDetail`;
export const CreateTicketApi = `${baseurl}tickets/create`;
export const GetTicketsApi = `${baseurl}tickets/usertickets`;
export const CloseTicketApi = `${baseurl}tickets/close`;
export const GetTicketCommentsApi = `${baseurl}tickets/comment`;
export const AddCommentsApi = `${baseurl}tickets/comments/add`;
export const StripePaymentApi = `${baseurl}payment/`;
export const CreateTransactionApi = `${baseurl}transactions/`;
export const UpdateTransactionApi = `${baseurl}transactions`;
export const GetUserTransactionApi = `${baseurl}transactions`;
export const CreateOrderApi = `${baseurl}orders/`;
export const GetUserOrderApi = `${baseurl}orders`;
export const GetUserOpenOrderApi = `${baseurl}orders/user/openorders`;
export const PricingApi = `${baseurl}pricing`;
export const GetUserWallet = `${baseurl}wallet/data`;
export const UpdateWalletBalance = `${baseurl}wallet/increment`;
export const DecrementWalletBalance = `${baseurl}wallet/decrement`;
export const CrateWallet = `${baseurl}wallet/create`;

const header = {
    headers: {
        'x-auth-token': JSON.parse(localStorage.getItem('token'))
    }
};

export const fetchUserWallet = async (userid, headers) => {
    const { data } = await axios.get(`${GetUserWallet}/${userid}`, headers);
    return data[0];
};

export const fetchUserCryptoWallet = async (userid, headers) => {
    const { data } = await axios.get(`${GetUserWallet}/${userid}`, headers);
    return data[1];
};

export const decrementWalletBalance = async (walletId, price) => {
    // console.log(walletId);

    const requestData = {
        amount: price
    };
    try {
        const response = await axios.put(`${DecrementWalletBalance}/${walletId}`, requestData, header);
        return response;
    } catch (ex) {
        console.error(ex);
    }
};
// const [searchParams, setSearchParams] = useSearchParams();
// , {
//                 headers: {
//                     'x-auth-token': JSON.parse(localStorage.getItem('token')) ?
//                         JSON.parse(localStorage.getItem('token'))
//                         : searchParams.get('token')
//                 }
//             }

export const incrementWalletBalance = async (walletId, amount) => {
    try {
        const response = await axios.put(`${UpdateWalletBalance}/${walletId}`, { amount: amount }, header);
        return response;
    } catch (ex) {
        console.error(ex);
    }
};
