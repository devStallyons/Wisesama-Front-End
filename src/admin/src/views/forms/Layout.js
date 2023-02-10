import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CWidgetStatsF,
  CButtonGroup,
  CFormFloating,
  CRow,
  CAlert,
} from '@coreui/react'
// import { DocsExample } from 'src/components'
import { useLocation } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import './layout.css'
import { v4 as uuidv4 } from 'uuid';

import { cilDollar, cilDiamond, cibBitcoin, cilGamepad, cibKaspersky } from '@coreui/icons'

import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Fade } from 'react-reveal'
import AppModal from '../../components/AppModal'
import baseUrl from '../../Constants'

const Layout = () => {
  const [email, setEmail] = useState("");
  const [cardAmmount, setCardAmmount] = useState("");
  const [cryptoAmmount, setCryptoAmmount] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showCardGiftSentAlert, setShowCardGiftSentAlert] = useState(false);
  const [cardWalletBalance, setCardWalletBalance] = useState("");
  const [cryptoWalletBalance, setCryptoWalletBalance] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [amountInModal, setAmountInModal] = useState(0);
  const [method, setMethod] = useState("");

  let location = useLocation();

  const { state } = location;

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  // console.log(state);

  let navigate = useNavigate();

  const viewOrders = (row, event) => { navigate("/orders", { state: state }); };
  const viewTransactions = (row, event) => { navigate("/transactions", { state: state }); };
  const viewTickets = (row, event) => { navigate("/support", { state: state }); };


  const handleSubmition = async (e) => {
    e.preventDefault();

    const url = baseUrl + "auth/updateuser/" + state._id;

    try {
      await axios.put(url, { email: email }, header);
      setShowEmailAlert(true);

      setTimeout(() => {
        setShowEmailAlert(false);
      }, 5000);

    } catch (err) {
      console.log(err);
    };
  };

  const handleRemoveUserEmail = async () => {
    const url = baseUrl + "auth/updateuser/" + state._id;

    const uniqueId = uuidv4();

    try {
      await axios.put(url, { email: uniqueId, verified: false }, header);
      setShowEmailAlert(true);
      state.verified = false;

      setTimeout(() => {
        setShowEmailAlert(false);
      }, 5000);

    } catch (err) {
      console.log(err);
    };
  };

  const getWallet = async (userid) => {
    const url = baseUrl + "wallet/data";

    try {
      const { data } = await axios.get(`${url}/${userid}`, header);
      return data;

    } catch (ex) {
      console.error(ex);
      return ex;

    };

  };

  const handleModalOpen = (method) => {
    if (method == "card") {
      if (!cardAmmount || cardAmmount == 0) return;

      setAmountInModal(`$${cardAmmount}`);
    } else {
      if (!cryptoAmmount || cryptoAmmount == 0) return;

      setAmountInModal(`${cryptoAmmount} btc`);
    }

    setVisible(true);

    setMethod(method);
  };

  const handleModalButtonClick = () => {
    setVisible(true);
    if (method == "card") {
      handleUsdGift();
      setVisible(false);
    } else {
      handleCryptoGift();
      setVisible(false);
    }
  };

  const createTransaction = async (ammount, user, type) => {
    const url = baseUrl + "transactions/";

    let transactionName = `Bonus Site Credit (${type})`;

    if (ammount.search("-") == 0) {
      transactionName = `Removing Site Credit (${type})`;
    };

    const id = uuidv4();

    try {
      await axios.post(url, {
        transactionid: id,
        user: user._id,
        steamid: user.steamid,
        type: transactionName,
        price: ammount,
        email: user.email == "" ? "email not available" : user.email,
        name: user.personaname
      }, header);

    } catch (ex) {
      alert('transaction failed');
      console.error(ex);
    };
  };

  const handleUsdGift = async () => {
    const url = baseUrl + "wallet/increment";

    const wallet = await getWallet(state._id);

    const requestOptions = {
      amount: cardAmmount
    };

    try {
      const result = await axios.put(`${url}/${wallet[0]._id}`, requestOptions, header);

      createTransaction(cardAmmount, state, "Card");

      setCardAmmount("");
      setShowCardGiftSentAlert(true);
      setCardWalletBalance(result.data.balance);

      // console.log('result', result)

      setVisible1(true);

    } catch (ex) {
      console.error(ex);
      setShowCardGiftSentAlert(false);
    };

  };

  const handleCryptoGift = async () => {
    const url = baseUrl + "wallet/increment";

    const wallet = await getWallet(state._id);

    let cryptoWallet = wallet[1];

    if (!cryptoWallet) {
      const { data } = await createWallet();

      cryptoWallet = data;
    };

    const requestOptions = {
      amount: cryptoAmmount
    };

    try {
      const result = await axios.put(`${url}/${cryptoWallet._id}`, requestOptions, header);

      createTransaction(cryptoAmmount, state, "Crypto");

      setCryptoAmmount("");
      setShowCardGiftSentAlert(true);
      setCryptoWalletBalance(result.data?.balance);

      setVisible1(true);

    } catch (ex) {
      console.error(ex);
      setShowCardGiftSentAlert(false);
    };

  };

  const createWallet = async () => {
    const url = baseUrl + "wallet/create";

    try {
      const result = await axios.post(url, { userId: state?._id, currency: "crypto" }, header);
      return result;

    } catch (ex) {
      return ex;
    };

  };

  const getCardWalletBalance = async () => {
    const wallets = await getWallet(state._id);
    setCardWalletBalance(wallets[0].balance);
    setCryptoWalletBalance(wallets[1] ? wallets[1].balance : 0);

  };

  useEffect(() => {
    getCardWalletBalance();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{!location.pathname.includes('view-user') ? 'Add User' : 'User Details'} </strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmition} className="row g-3">
                {/* <CRow className="g-3"> */}
                {/* </CRow>
              <CForm className="row g-3"> */}
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <CFormInput
                      required
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      style={{ width: "90%", borderRadius: "10px 0 0 10px" }}
                      placeholder={state.verified ? state.email : "Not available"}
                      type="email"
                      id="inputEmail"
                    />

                    <button
                      type='button'
                      style={{
                        width: "10%",
                        border: "none",
                        background: "#eeeeee",
                        borderRadius: "0px 10px 10px 0",
                        borderLeft: "1px solid white"
                      }}

                      onClick={handleRemoveUserEmail}
                    >
                      <img
                        style={{ width: "60%", height: "60%", objectFit: "contain" }}
                        src='images/remove.png'
                        title="remove email"
                      />
                    </button>
                  </div>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputTrade">Stream Trade Offer URL</CFormLabel>
                  <CFormInput placeholder="Trade Offer URL" type="text" id="inputTrade" />
                </CCol>
                {
                  showEmailAlert ?
                    <Fade top>
                      <div style={{ padding: "0 8px", marginBottom: "-13px" }}>
                        <CAlert style={{ height: "40px", display: "flex", alignItems: "center" }} color="info">
                          User Email Updated!
                        </CAlert>
                      </div>
                    </Fade>
                    : null
                }
                <CCol md={12}>
                  <CRow className="justify-content-end align-items-end">
                    <CCol xs="auto">
                      <CButton type='submit'>Update Info</CButton>
                    </CCol>
                  </CRow>
                </CCol>
                {/* <CCol xs={12}>
                  <CInputGroup className="mb-3">
                  <CFormInput type="file" accept='image/*' id="inputGroupFile02" />
                  <CInputGroupText component="label" htmlFor="inputGroupFile02">Upload</CInputGroupText>
                  </CInputGroup>
                </CCol> */}
                {/* </CForm> */}
                {/* <CRow> */}
                {/* </CRow> */}
              </CForm>
            </CCardBody>
          </CCard>
          <CRow className="align-self-center mz-dashboard mb-5">
            <CCol xs={12}>
              <h2 className='mt-4 mb-5'>Balance</h2>
            </CCol>
            <CCol className='mz-updateBal' xs={12} md={6} lg={5} xl={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<img className='key-icon' src='images/cardImages/pay_card.png' />}
                // icon={<CIcon className="thisisicon" icon={cilDollar} height={24} />}
                title={
                  <img
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    onClick={() => handleModalOpen("card")}
                    src="images/update.png"
                    alt="update image"
                    title="update balance"
                    loading="lazy"
                  />}
              // value="450K"
              />
              <CFormFloating className="mb-3 thisisit">
                <CFormInput
                  onChange={(e) => setCardAmmount(e.target.value)}
                  value={cardAmmount}
                  type="number"
                  className="balance_input_btn"
                  id="floatingInput"
                  placeholder={cardWalletBalance}
                />
                <CFormLabel htmlFor="floatingInput">{cardWalletBalance}</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol className='mz-updateBal' xs={12} md={6} lg={5} xl={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<img className='key-icon' src='images/cardImages/pay_btc.png' />}
                // icon={<CIcon className="thisisicon" icon={cibBitcoin} height={24} />}
                title={
                  <img
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    onClick={() => handleModalOpen("crypto")}
                    src="images/update.png"
                    alt="update image"
                    title="update balance"
                    loading="lazy"
                  />}
              // value="450K"
              />
              <CFormFloating className="mb-3 thisisit">
                <CFormInput
                  onChange={(e) => setCryptoAmmount(e.target.value)}
                  value={cryptoAmmount}
                  type="number"
                  className="balance_input_btn"
                  id="floatingInput"
                  placeholder="Enter Balance"
                />
                <CFormLabel htmlFor="floatingInput">{cryptoWalletBalance}</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol className='mz-updateBal' xs={12} md={6} lg={5} xl={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<img className='key-icon' src='images/cardImages/pay_csgo.png' />}
                // icon={<CIcon className='thisisicon' icon={cilGamepad} height={24} />}
                title={
                  <img
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    src="images/update.png"
                    alt="update image"
                    title="update balance"
                    loading="lazy"
                  />}
              // value="450K"
              />
              <CFormFloating className="mb-3 thisisit">
                <CFormInput type="number" className="balance_input_btn" id="floatingInput" placeholder="Enter Balance" />
                <CFormLabel htmlFor="floatingInput">0</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol className='mz-updateBal' xs={12} md={6} lg={5} xl={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<img className='key-icon' src='images/cardImages/pay_steam.png' />}
                // icon={<CIcon className="thisisicon" icon={cilDiamond} height={24} />}
                title={
                  <img
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    src="images/update.png"
                    alt="update image"
                    title="update balance"
                    loading="lazy"
                  />}
              // value="450K"
              />
              <CFormFloating className="mb-3 thisisit">
                <CFormInput type="number" className="balance_input_btn" id="floatingInput" placeholder="Enter Balance" />
                <CFormLabel htmlFor="floatingInput">0</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol className='mz-updateBal' xs={12} md={6} lg={5} xl={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                // icon={<CIcon className="thisisicon" icon={cibKaspersky} height={24} />}
                icon={<img className='key-icon' src='images/cardImages/pay_keys.png' />}
                title={
                  <img
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    src="images/update.png"
                    alt="update image"
                    title="update balance"
                    loading="lazy"
                  />}
              // value="450K"
              />
              <CFormFloating className="mb-3 thisisit">
                <CFormInput type="number" className="balance_input_btn" id="floatingInput" placeholder="Enter Balance" />
                <CFormLabel htmlFor="floatingInput">0</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow className="mz-users-actions">
            <CCol xs={12}>
              <CButtonGroup role="group" aria-label="Basic example">
                <CButton onClick={viewOrders} color="primary" size="lg">View Orders</CButton>
                <CButton onClick={viewTransactions} size="lg">View Transactions</CButton>
                <CButton onClick={viewTickets} size="lg">View Tickets</CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <AppModal
        title="Give Balance"
        body={`You are about to Give ${amountInModal} to this user.`}
        onClose={() => setVisible(false)}
        visible={visible}
        showBtn1={false}
        btn2Title="Update"
        btn2Color="primary"
        handleBtnClick={handleModalButtonClick}
      />

      <AppModal
        title="Completed"
        body={`You successfully gave ${amountInModal} to this user.`}
        onClose={() => setVisible1(false)}
        visible={visible1}
        showBtn1={false}
        btn2Title="Okay"
        btn2Color="primary"
        handleBtnClick={() => setVisible1(false)}
      />

    </>
  )
}

export default Layout
