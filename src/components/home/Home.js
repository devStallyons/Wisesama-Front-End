import React from "react";
import classes from "./Home.css";
import { Container } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Mainimg from "../../images/home.png";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Statsline from "../../images/statsline.png";
import br_rightimg from "../../images/br_rightimg.png";
import scanicon from "../../images/scanicon.png";
import reporticon from "../../images/reporticon.png";
import alerticon from "../../images/alerticon.png";
import projecttokenicon from "../../images/projecttokenicon.png";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import br_circle from "../../images/Ellipse 18.png";
import comingsoon from "../../images/comingsoon.png";
import star from "../../images/Star.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import sideimg from "../../images/sideimg.png";
import sideimg2 from "../../images/sideimg2.png";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import copybtn from "../../images/copy.png";
import axios from "axios";
import apiUrl from "../../routes/apiUrl";
import moment from "moment"
import Swal from "sweetalert2";

// import { Animated } from "react-animated-css";
// import 'animate.css';
// import css from '../../Animations.css'

// import "animate.css/animate.min.css";
// import ScrollAnimation from 'react-animate-on-scroll';

function MainPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function createData(Id, Address, Reported, ReportedTimes, TotalTransactions) {
    return { Id, Address, Reported, ReportedTimes, TotalTransactions };
  }

  const autoFocusInput = useRef(null)

  const [search, setSearch] = React.useState("");

  const [message, setMessage] = React.useState("")

  const [rowsData, setRowsData] = useState([])

  const [reportCount, setReportCount] = useState(0)

  const [userCount, setUserCount] = useState(0)


  const handleChange = async (event) => {
    event.preventDefault();

    const response = await axios.get(`${apiUrl}crypto_tokens?token=${event.target.value}`);

    if (response.data.type === 'success') {
      // console.log(response.data.data)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (JSON.parse(localStorage.getItem('rc')).remainCount <= 0) {

      toastMixin.fire({
        animation: true,
        title: `Daily Search Limit Exceed`,
        icon: 'error'
      })

      return false
    }

    const payload = { token: search }

    const response = await axios.post(`${apiUrl}crypto_tokens/check`, payload);

    if (response) {
      setMessage(response.data.message)

      const RObj = {
        'starts': (JSON.parse(localStorage.getItem('rc')).starts),
        'expires': (JSON.parse(localStorage.getItem('rc')).expires),
        'remainCount': JSON.parse(localStorage.getItem('rc')).remainCount - 1
      }

      localStorage.removeItem('rc')

      localStorage.setItem('rc', JSON.stringify(RObj))

    }
  }


  const getMyReports = async () => {
    const url = apiUrl + 'reports/latest';

    const response = await axios.get(url)

    let data = response.data.data;

    setReportCount(response.data.reportCount)
    setUserCount(response.data.userCount)

    if (data.length > 0) {
      setRowsData(data)
    }

  }

  const getDifference = (date) => {

    let end = moment(date)
    let start = moment(new Date())

    return (start.diff(end, 'days'))
  }

  useEffect(() => {
    // console.log(rowsData)
  }, [rowsData]);

  useEffect(() => {
    getMyReports();
  }, []);

  const navigate = useNavigate();

  const handleSrch = () => { autoFocusInput.current.focus() }

  const navigateReport = () => { navigate("/report") }

  const toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });



  return (
    <section className="main-sec">
      <img src={sideimg} className="sideimg" alt="Side" />

      <Container fixed>

        <h1 data-aos="zoom-out" className="main_head">Wisesama Report & Scan Crypto Addresses</h1>

        <p data-aos="zoom-out" className="main_p">
          Let's make Polkadot the safest blockchain together Coincryp by
          reporting Polkadot address, token, or NFT.Use our advanced Coincryp
          scanner to save your assets.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="search-sec">
            <input
              ref={autoFocusInput}
              autoFocus
              type="text"
              placeholder="Wallet Address, Url or twitter handle"
              onKeyUp={handleChange}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <div className="br_icons">
              <span className="searchicon" onClick={handleSrch} >
                <SearchIcon />
              </span>
              <span className="brright_icon">
                <img src={br_rightimg} alt="" />
              </span>
            </div>
          </div>
          <div className="MessageAlert">
            {message ? message : ''}
          </div>
          <div className="buttonmain">
            <Stack direction="row" spacing={2}>
              <Button data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
                type="submit" variant="contained" color="success" className="searchbtn">
                <span className="searchbtntxt">Search</span>
              </Button>
              <Button data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
                variant="outlined" color="error" className="reportbtn" onClick={navigateReport}>
                <span className="reportbtntxt">Report</span>
              </Button>
            </Stack>
          </div>
        </form>




        <div data-aos="fade-up" className="homeimg">

          <img src={Mainimg} alt="main" className="mainimg" />

        </div>


        <div className="br_sideimg">
          <img data-aos="fade-up-left" src={sideimg2} className="sideimg2" alt="" />
        </div>

        <div className="our-stats">
          <span className="homegradient-1"></span>

          <h1 data-aos="fade-down" className="statshead">Our Stats</h1>

          <div className="statsinfo">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Item data-aos="zoom-in-right">
                    <span className="stats-no">
                      {reportCount} <span className="br_add">+</span>
                    </span>
                    <span className="stats-title">Reports</span>
                  </Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>
                    <img src={Statsline} alt="Stats" />
                  </Item>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Item data-aos="zoom-in-up">
                    <span className="stats-no">
                      {userCount}  <span className="br_add">+</span>
                    </span>
                    <span className="stats-title">Users</span>
                  </Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>
                    <Item>
                      <img src={Statsline} alt="Stats" />
                    </Item>
                  </Item>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Item data-aos="zoom-in-left">
                    <span className="stats-no">
                      {userCount} <span className="br_add">+</span>
                    </span>
                    <span className="stats-title">Active Accounts</span>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>

        <div className="scamsec">

          <span className="redline2"></span>

          <span className="redline">
            <span>Scam</span>
            <span>Scam</span> <span>Scam</span> <span className="brhide">Scam</span>{" "}
            <span className="brhide">Scam</span> <span className="brhide">Scam</span>
          </span>

        </div>

        <div className="our-features">
          <span className="homegradient-2"></span>
          <h1 data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="feat_head">Our Features</h1>

          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >

              <Grid xs={12} sm={12} md={6} lg={6}>
                {/* <Animated animationIn="slideInUp" animationOut="fadeOutLeft" isVisible={true} duration={5000}> */}
                {/* <ScrollAnimation animateIn="fadeIn"> */}
                <Item data-aos="fade-right"
                  data-aos-anchor-placement="center-bottom">
                  <img src={br_circle} className="br_circleimg" alt="" />
                  <div className="col-1">
                    <img src={scanicon} className="scanicon" alt="Scan" />
                    <div className="col1-des">
                      <span className="homegradient-3"></span>
                      <h2 className="col_1head">Scan</h2>
                      <p className="col_1p">
                        Use our scanner to evaluate in a matter of seconds if
                        the address or token you are looking at is safe.
                      </p>
                      <p className="br_learn">
                        Learn more{" "}
                        <span className="learnicon">
                          <EastOutlinedIcon />
                        </span>
                      </p>
                    </div>
                  </div>
                </Item>
                {/* </ScrollAnimation> */}
                {/* </Animated> */}

              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6}>
                <Item data-aos="fade-left"
                  data-aos-anchor-placement="center-bottom">
                  <div className="col-2">
                    <img src={reporticon} className="reporticon" alt="Report" />
                    <div className="col2-des">
                      <h2 className="col_2head">Report</h2>
                      <p className="col_2p">
                        Polkadot is a about community, let's make Cardano safer
                        and secure Cryptosphere by reporting..
                      </p>
                      <p className="br_learn">
                        Learn more{" "}
                        <span className="learnicon">
                          <EastOutlinedIcon />
                        </span>
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6}>
                <Item data-aos="fade-left"
                  data-aos-anchor-placement="center-bottom">
                  <div className="col-3">
                    <img src={alerticon} className="alerticon" alt="Alert" />
                    <div className="col3-des">
                      <h2 className="col_3head">Alert</h2>
                      <p className="col_3p">
                        Create an account, check the notification box and don’t
                        miss the launch of our advanced alert.
                      </p>
                      <p className="br_learn">
                        Learn more{" "}
                        <span className="learnicon">
                          <EastOutlinedIcon />
                        </span>
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6}>
                <Item data-aos="fade-right"
                  data-aos-anchor-placement="center-bottom">
                  <div className="col-4">
                    <span className="homegradient-4"></span>
                    <img
                      src={projecttokenicon}
                      className="projecttokenicon"
                      alt="Project token"
                    />
                    <div className="col4-des">
                      <h2 className="col_4head">Project token</h2>
                      <p className="col_4p">
                        Reporting makes you eligible to gain our project Token.{" "}
                      </p>
                      <p className="br_learn">
                        Learn more{" "}
                        <span className="learnicon">
                          <EastOutlinedIcon />
                        </span>
                      </p>
                      <img src={star} className="br_star" alt="" />
                    </div>
                  </div>
                </Item>
              </Grid>

            </Grid>
          </Box>

        </div>

        <div className="lastrep_token">

          <span className="homegradient-5"></span>

          <h1 data-aos="zoom-out-down" className="lastrep_head">
            Checkout the last reported addresses, tokens{" "}
          </h1>

          <span className="homegradient-6"></span>

          <div data-aos="zoom-in-up" className="reportsdata">

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                className="br_table"
                aria-label="simple table"
              >
                <TableHead>

                  <TableRow>

                    <TableCell className="table_head">Address</TableCell>

                    <TableCell align="center" className="br_repsp table_head">
                      Reported
                    </TableCell>

                    <TableCell align="center" className="br_rtsp table_head">
                      Reported Times
                    </TableCell>

                    <TableCell align="center" className="br_ttsp table_head">
                      Total Transactions
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {rowsData.map((row) => (

                    <TableRow
                      className="br_btmbrdr"
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >

                      <TableCell className="table_add table_address">
                        <span className="br_repid"></span> <span className="br_adcol">{row.bcp_address}</span>
                        <CopyToClipboard
                          text={row.bcp_address}
                          onCopy={() => toastMixin.fire({
                            animation: true,
                            title: `Copied to Clipboard`,
                            icon: 'info'
                          })}
                        >
                          <button className="br_copybtn">
                            <img src={copybtn} alt="images" />
                          </button>
                        </CopyToClipboard>

                      </TableCell>

                      <TableCell align="center" className="table_rep">
                        {getDifference(row.created)} Days Ago
                      </TableCell>

                      <TableCell align="center" className="table_reptime">
                        {row.token[0].reported_times} Times
                      </TableCell>

                      <TableCell align="center" className="table_trans">
                        {row.token[0].transaction_times} Transactions
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div data-aos="zoom-in-right" className="comingsoon">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Item>
                  <img src={comingsoon} alt="Other Chain Added Soon" />
                  <span className="homegradient-8"></span>

                  <span className="homegradient-9"></span>

                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <div className="cs-des">
                    <h2 className="cs-main">C O M I N G S O O N</h2>
                    <h1 className="cs-head">
                      Other chains also adding soon stay tuned...
                    </h1>
                    <p className="cs-p">
                      It's a dangerous business, Frodo, going out your door. You
                      step onto the road Where the Shadows lie.
                    </p>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div className="our-blogs">

          <h1 data-aos="zoom-out-up" className="blog-head">Our Blogs</h1>

          <p data-aos="zoom-out-right" className="blog-p">
            Home is behind, the world ahead and there are many paths to tread
            through shadows to the edge.
          </p>

          <div data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
            className="cards"
          >

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={16}>

                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Item data-aos="fade-right">
                    <React.Fragment>
                      <CardContent>
                        <Typography className="carddate">
                          March 14th, 2019
                        </Typography>
                        <Typography className="cardhrad">
                          Going against the grain, AngelPad kills its demo day
                        </Typography>
                        <Typography className="cardp">
                          Earlier this week, at the expansive Computer History
                          Museum in Mountain View, Calif., Y Combinator
                          introduced an exhaustive…
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" className="readbtn">
                          Read Full
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Item>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Item data-aos="fade-right">
                    <React.Fragment>
                      <CardContent>
                        <Typography className="carddate">
                          March 12th, 2019
                        </Typography>
                        <Typography className="cardhrad">
                          Lawyaw uses AI to help lawyers draft documents faster
                        </Typography>
                        <Typography className="cardp">
                          It’s no secret that much of the legal industry is
                          build on reusable content. Most law firms have their
                          own customized set of standard…
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" className="readbtn">
                          Read Full
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Item>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4} >
                  <Item data-aos="fade-left">
                    <React.Fragment>
                      <CardContent>
                        <Typography className="carddate">
                          March 11th, 2019
                        </Typography>
                        <Typography className="cardhrad">
                          Tumblr confirms 84 accounts linked to Kremlin trolls
                        </Typography>
                        <Typography className="cardp">
                          Tumblr has confirmed that Kremlin trolls were active
                          on its platform during the 2016 US presidential
                          elections…
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" className="readbtn">
                          Read Full
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Item>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4} >
                  <Item data-aos="fade-left">
                    <React.Fragment>
                      <CardContent>
                        <Typography className="carddate">
                          March 12th, 2019
                        </Typography>
                        <Typography className="cardhrad">
                          Lawyaw uses AI to help lawyers draft documents faster
                        </Typography>
                        <Typography className="cardp">
                          It’s no secret that much of the legal industry is
                          build on reusable content. Most law firms have their
                          own customized set of standard…
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" className="readbtn">
                          Read Full
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MainPage;
