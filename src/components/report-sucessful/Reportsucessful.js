import React from "react";
import classes from "./Reportsucessful.css";
import { Container } from "@mui/system";
import report_sucessimg from "../../images/reportsucessful.png";
import { Link } from "react-router-dom";


function ReportSucessful() {
  return (
    <section className="reportssucess">
      <Container fixed>
        <div className="row">
          <div data-aos="fade-down" className="sucessimg">
            <img src={report_sucessimg} className="rep-sucess" alt="Report Sucessful" />
            <span className="sucessgradient-bg"></span>
          </div>
          <div data-aos="fade-up" className="sucesstxt">
            <p className="sucessmsg"> Report successful please check your inbox !</p>
            <p className="backtohome"><Link to="/"> Back to home page </Link></p>
            <span className="sucessgradient-bg2"></span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReportSucessful;
