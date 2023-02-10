import React from "react";
import classes from "./Myreport.css";
import { Container } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import report_img from "../../images/Frame.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import moment from 'moment'
import apiUrl from "../../routes/apiUrl";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import copybtn from "../../images/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

import { ThreeCircles } from 'react-loader-spinner'
import { setInterval } from "core-js";


function Myreports() {

  const headers = {
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('x-user-token'))
    }
  };

  const [isLoading, setLoader] = useState(true);


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  const [rowsData, setRowsData] = useState([])

  const getMyReports = async () => {
    const url = apiUrl + 'reports/my-reports';

    const response = await axios.get(url, headers)

    let data = response.data.data;

    if (data.length > 0) {
      setRowsData(data)

      setInterval(() => {
        setLoader(false)
      }, 3000)

    }

  }

  const getDifference = (date) => {

    let end = moment(date)
    let start = moment(new Date())

    return (start.diff(end, 'days'))
  }



  useEffect(() => {
    console.log(rowsData)

  }, [rowsData]);

  useEffect(() => {

    getMyReports();

  }, []);


  return (
    <section className="myreports">


      {isLoading ?

        <Container fixed>
          <h1 className="myreports_head">My Reports</h1>
          <p className="myreports_p">
            Checkout the last reported addresses, token and NFT
          </p>

          <ThreeCircles
            height="100"
            width="100%"
            color="#6132DA"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
            className={'MyLoader'}
          />

        </Container>

        :

        <Container fixed>
          <h1 className="myreports_head">My Reports</h1>
          <p className="myreports_p">
            Checkout the last reported addresses, token and NFT
          </p>

          {rowsData.length > 0 ? <div className="lastrep_token">

            <div className="reportsdata">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  className="br_table"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      {/* <TableCell className="table_head" className="id_head"></TableCell> */}

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
                            onCopy={() => console.log('copied')}
                          >
                            <button className="br_copybtn">
                              <img src={copybtn} alt="images" />
                            </button>
                          </CopyToClipboard>
                        </TableCell>
                        <TableCell align="center" className="table_rep">

                          {getDifference(row.created)} Days
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
            :
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <div className="myreport-gradient" />

              <div className="myreport_img">
                <Grid xs={4}>
                  <img src={report_img} className=" myreport_frame" alt="" />
                </Grid>
                <p className="myreports_p2">Oops there are no reports</p>
                <div className="myreport_now">
                  <Link to="/report">  Report Now </Link>
                </div>
              </div>
            </Grid>
          }

          <div className="myreport-gradient2" />

        </Container>}

    </section>
  );
}

export default Myreports;