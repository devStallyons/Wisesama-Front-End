import React, { useContext, useEffect } from 'react';
import { Route, Routes } from "react-router";

import { Account } from '../pages/account/Account';
import { Balance } from '../pages/balance/Balance';
import { Home } from '../pages/home/Home';
import { Orders } from '../pages/orders/Orders';
import { Support } from '../pages/support/Support';
import { SupportDetail } from '../pages/supportDetail/SupportDetail';
import { CreateTicket } from '../pages/createTicket/CreateTicket';
import { Privacy } from '../pages/privacy/Privacy';
import MyVerticallyCenteredModal from '../components/Modal/MyVerticallyCenteredModal';
import UserContext from '../context/user/userContext';
import axios from 'axios';
import { baseurl, EmailVerificationApi, UserDetailApi } from '../api';
import LoginModal from '../components/Modal/Login-modals/LoginModal';
import { useNavigate } from 'react-router';
import BannedUserModal from '../components/Modal/BannedUser-Modal/BannedUserModal';
import Error404 from '../components/Error404';

import { useLocation } from 'react-router';
import FAndQ from '../pages/F&Q';

export const AppRoutes = ({ bottomReached, showNavWarning, setShowNavWarning }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [Message, setMessage] = React.useState('');
  const [color, setColor] = React.useState('');
  const [ModalBtn, setModalBtn] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const [modalTradeUrl, setModalTradeUrl] = React.useState(false);
  const [invalidUrl, setInvalidUrl] = React.useState(false);
  const [wrongURl, setWrongURl] = React.useState(false);
  const [urlUpdated, setUrlUpdated] = React.useState(false);
  const [tradeUrlLoading, setTradeUrlLoading] = React.useState(false);

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('token'))
    }
  };

  const updateUserTradeUrl = async () => {

    const userDetail = user.state.userData;

    try {
      const res = await axios.put(`${baseurl}/auth/updateuser/${userDetail._id}`, { tradeUrl: modalTradeUrl, isTradeUrlVerified: true }, header);
      console.log(res);
      setTradeUrlLoading(false);
      setUrlUpdated(true);
      setInvalidUrl(false);
      setWrongURl(false);

      user.state.userData.isTradeUrlVerified = true;
      user.state.userData.tradeUrl = modalTradeUrl;

      user.setState({ ...user.state });

      setTimeout(() => {
        setModalShow(false);
        setModalTradeUrl("");
      }, 3000)

    } catch (ex) {
      setTradeUrlLoading(false);
      console.error(ex);
    }

  }

  function isURL(str) {
    var pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (pattern.test(str)) {
      return str.startsWith('https://steamcommunity.com/tradeoffer/new/')
    } else {
      return pattern.test(str);
    }
  }

  const handleTradeUrlUpdate = (e) => {
    setTradeUrlLoading(true);
    e.preventDefault();

    setUrlUpdated(false);

    const stringIsUrl = isURL(modalTradeUrl);

    if (!stringIsUrl) {
      setTradeUrlLoading(false);
      return setInvalidUrl(true)
    };

    // Create a new URL object and pass it the URL string
    let urlObject = new URL(modalTradeUrl);

    // Get the value of the "partner" parameter
    let partnerValue = urlObject.searchParams.get("partner");
    let tokenValue = urlObject.searchParams.get("token");


    if (partnerValue?.trim() === "" || partnerValue === null || tokenValue?.trim() === "" || tokenValue === null) {
      //invalid url
      setInvalidUrl(true);
      setWrongURl(false);
      setTradeUrlLoading(false);
    } else {

      const steamid = user.state.userData?.steamid;
      if (steamid == partnerValue) {
        updateUserTradeUrl();
      } else {
        //wrong url
        setTradeUrlLoading(false);
        setWrongURl(true);
        setInvalidUrl(false);
      }
    }

  };

  const changeVisiblity = () => {
    if (user.state.userData?.verified === false) {
      setModalShow1(true);
    };
  };

  const checkUserEmailVerification = async () => {
    // console.log("time out working ----------------------------------------------");
    if (user.state.userData?.verified) {
      clearInterval(verificationInterval);
      setMessage('Email verified.')
      setEmailVerified(true);
    } else {
      try {
        const { data } = await axios.get(`${UserDetailApi}/${user.state.token}`, header);
        user.state.userData = data;
        user.setState({ ...user.state });
      } catch (ex) {
        // console.log(ex);
      };

    }
  };

  let verificationInterval;

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalBtn(true);
    const requestData = {
      email: input,
      id: user.state.userData?._id
    };



    axios.post(EmailVerificationApi, requestData, header)
      .then((result) => {

        setMessage('Verification request sent to Your Email.');
        setModalBtn(false);

        verificationInterval = setInterval(checkUserEmailVerification, 3000);

        setColor('#00ff18');
        // console.log('then', result);
        // console.log('then', result);
        // console.log('then', result);
        // console.log('then', result);
        // console.log('then', result);
      })
      .catch(ex => {
        // console.log('catch', ex);
        setColor('#ff0707');
        if (ex.response.data == 'email already verified.') {
          setMessage('Email already verified.')
        } else if (ex.response.data == '"id" is required') {
          setMessage('login first!');
        } else {
          setMessage('User with this email already exist.');
        };
        setModalBtn(false);
      });
  };

  const handleLogout = () => {
    user.setState({ token: null, userData: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    navigate("/");
    window.location.reload()
  };

  const checkForRefInUrl = () => {
    // Create a new URL object and pass it the URL string
    let urlObject = new URL(window.location.href);

    // Get the value of the "partner" parameter
    let refID = urlObject.searchParams.get("referrer");

    if (!refID || refID == "") {
      console.log('referrer not exist in url');
      localStorage.removeItem("refUniqueId");
      return;
    }

    console.log(refID);


  };

  useEffect(() => {
    // checkForRefInUrl();
    if (location.pathname !== "/") {
      const savedToken = JSON.parse(localStorage.getItem('token'));
      // console.log(location.pathname);

      if (location.pathname == "/user") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

      if (location.pathname == "/balance") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

      if (location.pathname == "/orders") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

      if (location.pathname == "/support") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

      if (location.pathname == "/support/detail") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

      if (location.pathname == "/support/create") {

        if (!savedToken) {
          window.location.href = baseurl + "auth/steam";
        };
      };

    };

  }, []);


  React.useEffect(() => {
    // console.log(user.state);
    if (user.state.userData?.isBan) {
      setLoginModal(true);
    } else {
      if (user.state.userData?.verified) {
        setIsVerified(true);
      };
    };
  }, [user.state.userData]);

  return (
    <>
      <Routes>
        <Route path='/' element={
          <Home setShowNavWarning={setShowNavWarning} showNavWarning={showNavWarning} showTradeUrlModal={() => setModalShow(true)} changeVisiblity={changeVisiblity} isVerified={isVerified} bottomReached={bottomReached} />
        } />
        <Route path="*" element={<Error404 />} />
        <Route path='user' element={<Account bottomReached={bottomReached} />} />
        <Route path='balance' element={<Balance />} />
        <Route path='orders' element={
          <Orders user={user.state} />
        } />
        <Route path='support' element={
          <Support changeVisiblity={changeVisiblity} />
        } />
        <Route path='privacy' element={
          <Privacy />
        } />
        <Route path='questions' element={
          <FAndQ />
        } />
        <Route path='support/detail' element={
          <SupportDetail />
        } />
        <Route path='support/create' element={
          <CreateTicket />
        } />
      </Routes>
      <MyVerticallyCenteredModal
        heading='We Need your trade URL'
        description='In order for us to be able to send you a trade, we need your trade URL. You can find it'
        showHere={true}
        small='Trade URL not valid'
        inpPlaceholder='Your Steam Trade URL'
        btnPlaceholder='Confirm'
        Message="djakfjdkfs"
        show={modalShow}
        onHide={() => setModalShow(false)}
        setInput={setModalTradeUrl}
        handleSubmit={handleTradeUrlUpdate}
        btnDisabled={tradeUrlLoading}
        info={{
          tradeUrl: true,
          invalidUrl: invalidUrl,
          wrongURl: wrongURl,
          urlUpdated: urlUpdated
        }}
      />
      <MyVerticallyCenteredModal
        heading='Please Enter an Email Address To Use'
        description='In Order to use the following services, we ask that you to leave your email so that we can process your request'
        showHere={false}
        inpPlaceholder='Your Email address'
        btnPlaceholder='Confirm'
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
        Message={Message}
        color={color}
        type='email'
        btnDisabled={ModalBtn}
        emailVerified={emailVerified}
      />

      <BannedUserModal
        heading="User's Ban"
        description='You are banned from this websites this means you dont have acces to this website and its services.'
        btnPlaceholder1='Okay'
        show={loginModal}
        onHide={handleLogout}
        handleClick={handleLogout}
      />
    </>

  )
}
