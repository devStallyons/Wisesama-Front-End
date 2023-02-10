import React from 'react'
import ReferralCharts from './ReferralCharts'
import CIcon from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';
import axios from 'axios';
import baseUrl from '../../Constants';

export default function LinkDetails({
    linkDetail,
    setLinkDetail,
    scrollToBottom,
    showAddLinkForm,
    calculateTotalDepositsAffiliates,
    totalDepositsAffiliates,
    linkClicks,
    accountCreated,
    totalDepositsAffiliatesSeperated,
    setTotalDepositsAffiliatesSeperated
}) {

    const [users, setUsers] = React.useState([]);
    const [affiliateDeposits, setAffiliateDeposits] = React.useState([]);

    const header = {
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };

    const getUsersWithLink = async () => {
        console.log(linkDetail);
        console.log(totalDepositsAffiliatesSeperated);

        let arr = [];
        let arr1 = [];
        try {
            const url = baseUrl + "referral/existingUsers";

            const { data } = await axios.get(url, header);
            const linkUsers = data.filter(({ affiliateID }) => affiliateID == linkDetail.uniqueId);

            totalDepositsAffiliates.forEach(element => {
                linkUsers.forEach(item => {
                    if (element.steamid == item.steamid) {
                        arr.push(element);
                    }
                })
            });

            totalDepositsAffiliatesSeperated.forEach(element => {
                linkUsers.forEach(item => {
                    if (element.steamid == item.steamid) {
                        arr1.push(element);
                    }
                })
            });

            setUsers(arr);
            setAffiliateDeposits(arr1);

        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        console.log('useEffect working');
        if (linkDetail.show) {
            getUsersWithLink();
        }
    }, [linkDetail.show])
    return (
        <>
            <div>
                <CIcon
                    onClick={() => (setLinkDetail({ ...linkDetail, show: false }), setTimeout(() => scrollToBottom(), 200))}
                    style={{ color: "#42b8fe", cursor: "pointer", width: "25px", height: "25px" }} icon={cilArrowLeft} className="me-2" />
            </div>
            <ReferralCharts
                showdeposits={false}
                showAddLinkForm={showAddLinkForm}
                calculateTotalDepositsAffiliates={calculateTotalDepositsAffiliates}
                totalDepositsAffiliates={users}
                linkClicks={linkClicks.filter(({ uniqueId }) => uniqueId == linkDetail.uniqueId)}
                accountCreated={accountCreated.filter(({ uniqueId }) => uniqueId == linkDetail.uniqueId)}
                totalDepositsAffiliatesSeperated={affiliateDeposits}
                setTotalDepositsAffiliatesSeperated={setAffiliateDeposits}
            />
        </>
    )
}
