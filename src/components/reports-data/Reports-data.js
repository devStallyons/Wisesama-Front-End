import React from "react";
import classes from "./Reports-data.css";
import { Container } from "@mui/system";
import line_space from "../../images/Line 1.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copybtn from "../../images/copy.png";

function createData(Id, Address, Reported, ReportedTimes, TotalTransactions) {
  return { Id, Address, Reported, ReportedTimes, TotalTransactions };
}

const rows = [
  createData(
    "1.",
    "00e71...48e389f5335b",
    "1 Week Ago",
    "3 Times",
    "9 Transactions"
  ),
  createData(
    "2.",
    "00e71...48e389f5335b",
    "1 Week Ago",
    "3 Times",
    "9 Transactions"
  ),
  createData(
    "3.",
    "00e71...48e389f5335b",
    "1 Week Ago",
    "3 Times",
    "9 Transactions"
  ),
  createData(
    "4.",
    "00e71...48e389f5335b",
    "1 Week Ago",
    "3 Times",
    "9 Transactions"
  ),
  createData(
    "5.",
    "00e71...48e389f5335b",
    "1 Week Ago",
    "3 Times",
    "9 Transactions"
  ),
];

function ReportsData() {
  // state = {
  //   value: "",
  //   copied: false,
  // };
  return (
    <section className="myreports">
      <Container fixed>
        <h1 className="myreports_head">My Reports</h1>
        <p className="myreports_p">
          Checkout the last reported addresses, token and NFT
        </p>
        <span className="reportsdatagradient-bg"></span>

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
                {rows.map((row) => (
                  <TableRow
                    className="br_btmbrdr"
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component="th" scope="row">
                      {row.Id}
                    </TableCell> */}
                    {/* <TableCell className="table_add" className="table_id"></TableCell> */}
                    <TableCell className="table_add table_address">
                      <span className="br_repid">{row.Id}</span> <span className="br_adcol">{row.Address}</span>
                      <CopyToClipboard
                        text={row.Address}
                        onCopy={() => console.log('qwerty')}
                      >
                        <button className="br_copybtn">
                          <img src={copybtn} />
                        </button>
                      </CopyToClipboard>
                    </TableCell>
                    <TableCell align="center" className="table_rep">
                      {row.Reported}
                    </TableCell>
                    <TableCell align="center" className="table_reptime">
                      {row.ReportedTimes}
                    </TableCell>
                    <TableCell align="center" className="table_trans">
                      {row.TotalTransactions}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <span className="reportsdatagradient-bg2"></span>
          </TableContainer>
        </div>
      </Container>
    </section>
  );
}

export default ReportsData;
