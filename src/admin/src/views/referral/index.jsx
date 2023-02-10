import React, { useEffect, useRef, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import AppModal from '../../components/AppModal';
import baseUrl from '../../Constants';

import './style.css';
import EditAddReferral from './EditAddReferral';
import ReferralCharts from './ReferralCharts';
import MainreferralSection from './MainreferralSection';
import TxtCopyMessage from './TxtCopyMessage';
import LinkDetails from './LinkDetails';

const bURl = "steamartwork.com";

const ReferralLink = () => {
    const [dataFetchLoading, setDataFetchLoading] = useState(false);
    const [refLinks, setRefLinks] = useState([]);
    const [showAddLinkForm, setShowAddLinkForm] = useState(false);
    const [refSlug, setRefSlug] = useState('');
    const [refSlugErr, setRefSlugErr] = useState(false);
    const [refId, setRefId] = useState('');
    const [refIdErr, setRefIdErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTxtCopyMsg, setShowTxtCopyMsg] = useState(false);
    const [editLinkData, setEditLinkData] = useState({
        editable: false,
        name: null,
        uniqueId: null,
        _id: null
    });
    const { editable } = editLinkData;
    const [deleteLinkModal, setDeleteLinkModal] = useState(false);
    const [deleteLinkid, setDeleteLinkid] = useState(null);
    const [totalDepositsAffiliates, setTotalDepositsAffiliates] = useState([]);
    const [totalDepositsAffiliatesSeperated, setTotalDepositsAffiliatesSeperated] = useState([]);
    const [linkClicks, setLinkClicks] = useState([]);
    const [accountCreated, setAccountCreated] = useState([]);
    const [linkDetail, setLinkDetail] = useState({
        show: false
    });


    const header = {
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
        }
    };

    const refPageRef = useRef(null)

    const scrollToBottom = () => {
        refPageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }

    const scrollToTop = () => {
        refPageRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
    const textToCopyRef = useRef(null);

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    };

    const handleCopyTxt = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // The text was successfully copied to the clipboard
            setShowTxtCopyMsg(true);

            setTimeout(() => setShowTxtCopyMsg(false), 4000)
        }, () => {
            // There was an error copying the text to the clipboard
            console.error('Error copying text to clipboard');
        });
    };

    const checkInputFields = () => {
        if (refId == "" || refSlug == "") {
            if (refId == "" && refSlug == "") {
                setRefSlugErr(true);
                setRefIdErr(true);

            } else if (refSlug == "") {
                setRefSlugErr(true);
            } else if (refId == "") {
                setRefIdErr(true);
            }
            // else {
            //     setRefSlugErr(true);
            //     setRefIdErr(true);
            // }
            return false;
        } else {
            const link = refLinks.find(({ uniqueId }) => uniqueId == refId);

            if (!editable && link) {
                setRefIdErr(true);
                return false;
            }
            return true;
        }
    }

    const handleCreateLink = async () => {
        if (!checkInputFields()) return;

        setLoading(true);

        const reqOptions = {
            name: refSlug,
            uniqueId: refId
        };

        try {
            await axios.post(`${baseUrl}referral/`, reqOptions, header);
            setLoading(false);
            setRefSlug('');
            setRefId('');
            fetchReferralLinks();
            setShowAddLinkForm(false);

        } catch (ex) {
            console.error(ex);
            if (ex?.response?.data?.exists) {
                setRefIdErr(true);
            }
            setLoading(false);
        }
    };

    const handleDeleteLink = async () => {
        const id = deleteLinkid;
        try {
            await axios.delete(`${baseUrl}referral/${id}`, header);
            fetchReferralLinks();
            setDeleteLinkModal(false);
            setDeleteLinkid(null);

            fetchReferralLinks();
            fetchLinkClicksAndAccCreated();
            fetchTransactions();

        } catch (ex) {
            console.error(ex);
        }
    };

    const handleEditLinkClick = (link) => {
        setRefSlug(link.name);
        setRefId(link.uniqueId);
        setRefSlugErr(false);
        setRefIdErr(false);
        setShowAddLinkForm(true);


        setEditLinkData({ editable: true, ...link });
    };

    const handleEditLinkData = async () => {
        if (!checkInputFields()) return;

        const reqOptions = {
            name: refSlug,
            uniqueId: refId
        };

        try {
            await axios.put(`${baseUrl}referral/update/${editLinkData._id}`, reqOptions, header);
            setShowAddLinkForm(false);
            fetchReferralLinks();
            setRefSlug('');
            setRefId('');
            setEditLinkData({
                editable: false,
                name: null,
                uniqueId: null,
                _id: null
            });

        } catch (ex) {
            console.error(ex);
        }
    };

    const fetchReferralLinks = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}referral/`, header);
            setRefLinks(data.reverse());

        } catch (ex) {
            console.error(ex);
        }
    };

    const fetchLinkClicksAndAccCreated = async () => {
        const url = baseUrl + "referral/linkclicks";

        try {
            const { data } = await axios.get(url, header);
            setLinkClicks(data.filter(({ type }) => type === "totalclicks"));
            setAccountCreated(data.filter(({ type }) => type === "accountscreated"));
        } catch (ex) {
            console.log(ex);
        };
    };

    const calculateTotalDepositsAffiliates = (deposits) => {
        let num = 0;

        deposits.forEach(elem => {
            if (elem.status !== "underpaid") {
                num += elem.price;
            }
        });


        return kFormatter(num);
    };


    const fetchTransactions = async () => {
        const url = baseUrl + "transactions/all?userdata=true";

        try {
            const { data } = await axios.get(url, header);

            const affiliatedUsersDeposits = data.filter(({ user }) => user?.affiliated === true);

            const uniqueObjects = {};

            affiliatedUsersDeposits.forEach((elem) => {
                let type = elem.type;

                if (type === "Bonus Site Credit (Card)" || type === "Removing Site Credit (Card)") {
                    type = "card";
                } else if (type === "Bonus Site Credit (Crypto)" || type === "Removing Site Credit (Crypto)") {
                    type = "crypto";
                };

                if (uniqueObjects[elem.steamid]) {

                    if (elem.status !== "underpaid") {
                        uniqueObjects[elem.steamid].deposit[type] += elem.price;
                    }

                } else {
                    if (elem.status !== "underpaid") {
                        uniqueObjects[elem.steamid] = {
                            username: elem.name,
                            steamid: elem.steamid,
                            deposit: {
                                card: 0,
                                crypto: 0
                            },
                        };

                        uniqueObjects[elem.steamid].deposit[type] = elem.price;
                    }

                }

            });

            setTotalDepositsAffiliatesSeperated(Object.values(uniqueObjects).reverse());

            setTotalDepositsAffiliates(affiliatedUsersDeposits);

            setDataFetchLoading(false);

        } catch (ex) {
            console.log(ex);
            setDataFetchLoading(false);

        };
    };


    useEffect(() => {
        setDataFetchLoading(true);
        fetchReferralLinks();
        fetchLinkClicksAndAccCreated();
        fetchTransactions();
    }, []);


    return (
        <div ref={refPageRef}>
            {
                dataFetchLoading ?
                    <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                        style={{ width: '26px', height: '26px', fontSize: '15px', margin: "0px 15px 0px 15px", color: "#42b8fe" }}
                    /> :
                    <>
                        {
                            !linkDetail.show ?
                                <>
                                    <ReferralCharts
                                        showAddLinkForm={showAddLinkForm}
                                        calculateTotalDepositsAffiliates={calculateTotalDepositsAffiliates}
                                        totalDepositsAffiliates={totalDepositsAffiliates}
                                        linkClicks={linkClicks}
                                        accountCreated={accountCreated}
                                        totalDepositsAffiliatesSeperated={totalDepositsAffiliatesSeperated}
                                        setTotalDepositsAffiliatesSeperated={setTotalDepositsAffiliatesSeperated}
                                    />

                                    <div className='datatable-mainWrapper card dafasdfsdaf'>

                                        <div className='mainReferralLinksContainer'>
                                            {
                                                !showAddLinkForm ?
                                                    <>
                                                        <MainreferralSection
                                                            refLinks={refLinks}
                                                            textToCopyRef={textToCopyRef}
                                                            handleCopyTxt={handleCopyTxt}
                                                            bURl={bURl}
                                                            linkDetail={linkDetail}
                                                            scrollToTop={scrollToTop}
                                                            setLinkDetail={setLinkDetail}
                                                            setDeleteLinkModal={setDeleteLinkModal}
                                                            setDeleteLinkid={setDeleteLinkid}
                                                            handleEditLinkClick={handleEditLinkClick}
                                                            setRefSlugErr={setRefSlugErr}
                                                            setRefIdErr={setRefIdErr}
                                                            setShowAddLinkForm={setShowAddLinkForm}
                                                        />
                                                    </> :
                                                    <>
                                                        <EditAddReferral
                                                            bURl={bURl}
                                                            editable={editable}
                                                            editLinkData={editLinkData}
                                                            scrollToBottom={scrollToBottom}
                                                            handleEditLinkData={handleEditLinkData}
                                                            handleCreateLink={handleCreateLink}
                                                            refSlug={refSlug}
                                                            refId={refId}
                                                            refSlugErr={refSlugErr}
                                                            setRefSlugErr={setRefSlugErr}
                                                            setRefSlug={setRefSlug}
                                                            refIdErr={refIdErr}
                                                            setRefIdErr={setRefIdErr}
                                                            setRefId={setRefId}
                                                            setEditLinkData={setEditLinkData}
                                                            setShowAddLinkForm={setShowAddLinkForm}
                                                            loading={loading}
                                                        />
                                                    </>
                                            }
                                        </div>

                                        <AppModal
                                            title="Delete Link"
                                            body="Warning: Deleting this link is a permanent action. Are you sure you want to proceed?"
                                            onClose={() => setDeleteLinkModal(false)}
                                            visible={deleteLinkModal}
                                            handleBtnClick={handleDeleteLink}
                                        />

                                    </div>

                                    <TxtCopyMessage showTxtCopyMsg={showTxtCopyMsg} />
                                </> :
                                <LinkDetails
                                    linkDetail={linkDetail}
                                    setLinkDetail={setLinkDetail}
                                    scrollToBottom={scrollToBottom}
                                    showAddLinkForm={showAddLinkForm}
                                    calculateTotalDepositsAffiliates={calculateTotalDepositsAffiliates}
                                    totalDepositsAffiliates={totalDepositsAffiliates}
                                    linkClicks={linkClicks}
                                    accountCreated={accountCreated}
                                    totalDepositsAffiliatesSeperated={totalDepositsAffiliatesSeperated}
                                    setTotalDepositsAffiliatesSeperated={setTotalDepositsAffiliatesSeperated}
                                />

                        }
                    </>
            }

        </div>
    )
}

export default ReferralLink;