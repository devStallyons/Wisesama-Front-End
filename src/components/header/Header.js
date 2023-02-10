import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import logo from "../../images/Wisesama Logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PopupMenu } from "react-simple-widgets";
import Avatar from "@mui/material/Avatar";
// import profile_img from "../../images/profile.png";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import profile_line from "../../images/profileline.png";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Mobilemenu from "../mobile-menu/Mobilemenu";
// import NativeSelect from "@mui/material/NativeSelect";
// import InputBase from "@mui/material/InputBase";
import englang from "../../images/englang.png";
import frenlang from "../../images/francelang.png";
import itallang from "../../images/italylang.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import connectimg1 from "../../images/connectimg1.png";
import connectimg2 from "../../images/connectimg2.png";
import congoogle from "../../images/congoogle.png";
import congithub from "../../images/congithub.png";
// import { useLocation } from 'react-router-dom';
// import GitHubLogin from 'react-github-login';
import axios from "axios";
import apiUrl from "../../routes/apiUrl";
import { useState } from "react";
import BACKEND_URL from '../../routes/backendUrl'
import moment from 'moment'
import { useEffect } from "react";
// import { Cipher } from "js-cipher";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));



function Header() {

  const [hasAuth, setHasAuth] = useState(false)
  const [authUser, setAuthUser] = useState({})
  const [token, setToken] = useState('')

  const [showInfoBar, setShowInfoBar] = useState(true)

  const checkForRestriction = () => {

    var data = localStorage.getItem('rc');

    if (data === null) {

      const RObj = {
        'starts': Date.parse(new Date()),
        'expires': Date.parse(moment(new Date()).add(1, 'd')),
        'remainCount': 50
      }

      localStorage.setItem('rc', JSON.stringify(RObj))

    } else {

      if (JSON.parse(localStorage.getItem('rc')).expires < Date.parse(new Date())) {

        const RObj = {
          'starts': Date.parse(new Date()),
          'expires': Date.parse(moment(new Date()).add(1, 'd')),
          'remainCount': 50
        }

        localStorage.setItem('rc', JSON.stringify(RObj))
      }
    }
  }

  useEffect(() => {

    if (window.location.search.replace('?token=', '') !== '') {

      if (!localStorage.getItem('x-user-token') || localStorage.getItem('x-user-token') === '') {

        setToken(JSON.stringify(window.location.search.replace('?token=', '')))

        localStorage.setItem('x-user-token', JSON.stringify(window.location.search.replace('?token=', '')));

        getAuthUser(JSON.stringify(window.location.search.replace('?token=', '')));

      }
    }
    else {
      // 
    }

    checkForRestriction()
  }, [])


  useEffect(() => {

    if (localStorage.getItem('x-user-token') && localStorage.getItem('x-user-token') !== '') {
      getAuthUser()
    }
    else {
      // 
    }

  }, [])



  const [lang, langSel] = React.useState(10);

  const handleChange = (event) => {
    langSel(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const googleLogin = async () => {
    window.open(`${BACKEND_URL}/auth/google/callback`, '_self')
  }

  const githubLogin = async () => {
    window.open(`${BACKEND_URL}/auth/github/callback`, '_self')
  }

  const hideInfoBar = async () => {

    setShowInfoBar(false)

  }

  var headers = {
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('x-user-token')) !== '' ? JSON.parse(localStorage.getItem('x-user-token')) : token
    }
  }


  const getAuthUser = async (token = null) => {

    const url = `${apiUrl}auth/check`

    var myheader = '';

    if (token) {
      myheader = {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('x-user-token')) !== '' ? JSON.parse(localStorage.getItem('x-user-token')) : token
        }
      }
    } else {
      myheader = headers
    }


    const response = await axios.get(url, myheader)

    if (response.status === 200) {

      setHasAuth(true)

      setAuthUser(response.data.user.user[0])
    } else {
      Location.reload()
    }
  }

  const signOutUser = async () => {

    const url = `${apiUrl}auth/logout`

    const response = await axios.delete(url, headers)

    if (response.status === 200) {
      localStorage.removeItem('x-user-token')
      setHasAuth(false)

    }

  }


  return (
    <header className="header">
      <div className="header1">
        <Container className="br_mbhead">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs lg={4}>
                <div className="nav-logo">
                  <Link to="/" className="home_pg">
                    <img src={logo} alt="Wisesama" className="Wisesamalogo" />
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} lg={4}>
                <Item>
                  <nav className="nav-link">
                    <Link to="/" >Home</Link>
                    <Link to="/report" >Report</Link>
                    <Link to="/api">API Docs</Link>
                  </nav>
                </Item>
              </Grid>

              <Grid item xs lg={2}>
                <Item className="language-switcher desk ">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Language</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={lang}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>
                        <img src={englang} className="br_lgfg" alt="English" />
                        <span className="br_langna">ENG </span>
                      </MenuItem>
                      <MenuItem value={20}>
                        <img src={frenlang} className="br_lgfg" alt="French" />
                        <span className="br_langna">FRE </span>
                      </MenuItem>
                      <MenuItem value={30}>
                        <img src={itallang} className="br_lgfg" alt="Urdu" />
                        <span className="br_langna"> ITA </span>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Grid>

              <Grid item xs={8} lg={2}>
                <Item>
                  {
                    hasAuth ? <div className="profile">
                      <PopupMenu>
                        <small>
                          <Stack direction="row" spacing={2}>
                            <Avatar alt="profile" src={authUser.imageUrl} />
                            {/* <Avatar alt="profile" src={profile_img} /> */}
                          </Stack>
                        </small>


                        <div className="card">
                          <div className="card-body">
                            <h5 className="profile_text">
                              <a href="#">Developer Report</a>
                              <span className="close-icon">
                                <CloseIcon />
                              </span>
                            </h5>
                            <p className="profile_text2">

                              <Link to="/my-reports" >My Reports</Link>
                            </p>

                            <img alt="space" src={profile_line} />

                            <div className="signout">
                              <button onClick={signOutUser} className="signout-btn">
                                <span className="exit-icon">
                                  <ExitToAppIcon />
                                </span>
                                <small className="br_exit">Sign Out</small>
                              </button>
                            </div>
                          </div>
                        </div>
                      </PopupMenu>
                    </div> :
                      <div className="join-popup">
                        <Button variant="outlined" className="joinbtn" onClick={handleClickOpen}>
                          Join Us
                        </Button>

                        <Dialog
                          className="brjoin-form"
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >

                          <DialogTitle id="responsive-dialog-title">
                            <img src={connectimg1} alt="" className="br_conimg1" />
                          </DialogTitle>

                          <div className="closepopup" onClick={handleClose}>
                            <CloseIcon />
                          </div>

                          <DialogActions>
                            <div className="br_google">

                              <a onClick={googleLogin}>
                                <img alt="" src={congoogle} />
                              </a>
                            </div>
                            <div className="conspace">
                              <h2>OR</h2>
                            </div>
                            <div className="br_git">
                              <a onClick={githubLogin}>
                                <img src={congithub} alt="" />
                              </a>

                            </div>
                          </DialogActions>

                          <DialogTitle id="responsive-dialog-title">
                            <img src={connectimg2} className="br_conimg2" alt="" />
                          </DialogTitle>
                        </Dialog>
                      </div>
                  }
                </Item>
              </Grid>
              <Mobilemenu />
            </Grid>
          </Box>
        </Container>


        {showInfoBar}
        {showInfoBar ?
          <section className="main-header">
            <Container>
              <div className="header-2">

                <Box sx={{ flexGrow: 1 }}><Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <Item className="info_head">
                      <span className="info-icon">
                        <InfoIcon />
                      </span>
                      <p className="info-text">Info Text</p>
                    </Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item onClick={hideInfoBar} className="head-close">
                      <CloseIcon />
                    </Item>
                  </Grid>
                </Grid>
                </Box>
              </div>
            </Container>
          </section>
          : ''}

      </div>
    </header >
  );
}

export default Header;
