import * as React from "react";
import classes from "./Footer.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import logo from "../../images/Wisesama Logo.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import instagram from "../../images/instagram.png";
import youtube from "../../images/youtube.png";
import submiticon from "../../images/submiticon.png";
import space from "../../images/space.png";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from '../../routes/apiUrl'
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({}));

export default function RowAndColumnSpacing() {

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

  const [userEmail, setEmail] = React.useState("")

  const [showMessage, setShowMessage] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { email: userEmail, }

    const url = `${apiUrl}news-letters`;

    const response = await axios.post(url, payload);

    if (response.data.type === 'success') {

      setEmail("")
      setShowMessage(true)

      toastMixin.fire({
        animation: true,
        title: `${response.data.message}`,
        icon: 'success'
      });

    } else {

      toastMixin.fire({
        animation: true,
        title: `${response.data.message}`,
        icon: 'error'
      });

    }

  }

  return (
    <footer>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12} sm={6} lg={4}>
              <Item className="f-s1">
                <Link to="/" className="home_pg">
                  <img src={logo} alt="Wisesama" className="FtWisesamalogo" />
                </Link>
                <p className="footer_text">
                  Lorem ipsum dolor sit amet,
                  <br /> consectetur adipiscing elit. Nibh in <br /> maecenas
                  posuere at congue.
                </p>
                <Item className="social-profile">
                  <a href="https://www.facebook.com/" target="_blank">
                    <img
                      src={facebook}
                      className="social_icons"
                      alt="Facebook"
                    />
                  </a>
                </Item>
                <Item className="social-profile">
                  <a href="https://twitter.com/" target="_blank">
                    <img src={twitter} className="social_icons" alt="Twitter" />
                  </a>
                </Item>
                <Item className="social-profile">
                  <a href="https://www.instagram.com/" target="_blank">
                    <img
                      src={instagram}
                      className="social_icons"
                      alt="Instagram"
                    />
                  </a>
                </Item>
                <Item className="social-profile">
                  <a href="https://www.youtube.com/" target="_blank">
                    <img src={youtube} className="social_icons" alt="Youtube" />
                  </a>
                </Item>
              </Item>
            </Grid>

            <Grid xs={12} sm={6} lg={2}>
              <Item className="f-s2">
                <h1 className="footer_head">Company</h1>
                <li className="company_li">
                  <Link to="/"> Scan </Link>
                </li>
                <li className="company_li">
                  <Link to="/report"> Report </Link>
                </li>
                <li className="company_li">
                  <Link to="/api"> API Doc </Link>
                </li>
              </Item>
            </Grid>

            <Grid xs={12} sm={6} lg={2}>
              <Item className="f-s3">
                <h1 className="footer_head">Legal</h1>
                <li className="legal_li">
                  <Link to="/privacy-policy"> Privacy Policy </Link>
                </li>
                <li className="legal_li">
                  <Link to="/terms-of-use"> Terms of Service </Link>
                </li>
                <li className="legal_li">
                  <Link to="/my-reports"> My Reports </Link>
                </li>
                <li className="legal_li">
                  <Link to="/reports-data"> Reports Data </Link>
                </li>
                <li className="legal_li">
                  <Link to="/developers-setting"> Developers Setting </Link>
                </li>
                <li className="legal_li">
                  <Link to="/report-sucessful"> Report Sucessful </Link>
                </li>
              </Item>
            </Grid>

            <Grid xs={12} sm={6} lg={4}>
              <Item className="f-s4">
                <h1 className="footer_head">Newsletter</h1>
                <p className="f-s4text">
                  Sign up for our newsletter to get the lattest news in your
                  inbox.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="footer_submit">
                    <input
                      type="email"
                      placeholder="enter your email"
                      className="br_email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={userEmail}
                    />
                    <button className="ficons" type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                    </button>
                  </div>
                </form>

                {showMessage ? <span class="NewLetterSpan">News Letter Subscribed</span> : ''}
                {/* </div> */}
              </Item>
            </Grid>
          </Grid>
        </Box>

        <div className="footer-sm">
          <div className="row">
            <img src={space} className="space" alt="space" />
            <div className="copyright">
              <p className="copyright_text">
                Copyright 2022 © Coincryp, All Right Reserved
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
