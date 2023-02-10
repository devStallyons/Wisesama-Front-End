import { React, useState } from "react";
import classes from "./Report.css";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import report from "../../images/report.png";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import apiUrl from "../../routes/apiUrl";
import Swal from 'sweetalert2'
import { useEffect } from "react";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


function Report() {

  const headers = {
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('x-user-token'))
    }
  };

  const navigate = useNavigate();

  const [scam_type, setScamType] = useState("");
  const [bcp_address, setBcpAddress] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);

  const handleSubmit = async (event) => {

    event.preventDefault();

    const payload = { scam_type: scam_type, bcp_address: bcp_address, description: description }

    try {
      const response = await axios.post(`${apiUrl}reports`, payload, headers);

      if (response.status === 201 && response.data.type === 'success') {
        navigate("/report-sucessful")
      }
      else {
        if (response.status === 401) {

          toastMixin.fire({
            animation: true,
            title: `Please Login to Submit Report`,
            icon: 'error'
          });

        } else {
          response.data.message.reverse().forEach((item) => {
            toastMixin.fire({
              animation: true,
              title: `${item}`,
              icon: 'error'
            });
          })
        }
      }
    } catch (e) {

      if (e.response.status === 401) {
        toastMixin.fire({
          animation: true,
          title: `Please Login to Submit Report`,
          icon: 'error'
        });
      }

    }

  }

  const getScamTypes = async () => {
    const url = `${apiUrl}settings/adminScamTypes`

    try {
      const response = await axios.get(url);
      setOptions(response.data.data.value);

    } catch (ex) {
      console.log(ex);
    };

  };

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


  useEffect(() => {
    getScamTypes()
  }, [])


  return (
    <section className="report" >

      <Container fixed>

        <Box sx={{ flexGrow: 1 }}>

          <Grid container spacing={2} columns={16}>

            <Grid data-aos="zoom-out-right" item xs={8} md={12}>
              
              <Item>
               
                <span className="report-gradient"></span>

                <div className="reportimg">
                  <img src={report} alt="report" />
                </div>

              </Item>

            </Grid>

            <span className="report-gradient1"></span>

            <Grid data-aos="zoom-out-left" item xs={8} md={12}>
              <Item>
                <div className="form_bg">
                  <form onSubmit={handleSubmit}>
                    <div className="formsec">
                      <h2 className="filereport">
                        File Scam
                        <span className="scamreport"> Report</span>
                      </h2>
                      <p className="formp">
                        Help us find crypto crime by filling the form below!
                      </p>

                      <div className="formrep">
                        <div class="form-floating">
                          <label className="scamSelect" for="floatingSelect">
                            Scam
                          </label>
                          <select
                            class="form-select"
                            id="floatingSelect"
                            aria-label="Select a scam"
                            onChange={(e) => setScamType(e.target.value)}
                            value={scam_type}
                          >
                            <option selected>Select a Scam</option>
                            {options.map(item => <option option value={item} > {item}</option>)}
                          </select>
                        </div>

                        <div className="formpay">
                          <label for="input" className="addhead">
                            {" "}
                            Block Chain Payment Address{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addInput"
                            placeholder="1PRugWeVRR7aAuSJJVit2mp2gb4hqccMn"
                            onChange={(e) => setBcpAddress(e.target.value)}
                            value={bcp_address}
                          />
                        </div>

                        <div className="formdes">
                          <label for="input" className="deshead">
                            {" "}
                            Description{" "}
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="desInput"
                            placeholder="COMPANY NAME 
                              STOLEN AMOUNT
                              TRANSACTION HASH
                              SCAMMER CONTACT DETAILS"
                            rows="6" cols="50"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="report-btn">
                          <Button type='submit' variant="contained">Report</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container >
    </section >
  );
}

export default Report;
