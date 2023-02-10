import React from "react";
import classes from "./Developersetting.css";
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import apiUrl from "../../routes/apiUrl";
import { useEffect } from "react";

import Swal from 'sweetalert2'


export default function BoxSx() {

  const headers = {
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('x-user-token'))
    }
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

  const [tokenName, setTokenName] = useState()

  const [hasToken, setHasToken] = useState(false)

  const [myToken, setMyToken] = useState({})

  const getMyToken = async () => {

    const url = apiUrl + 'api-token/my-token'

    const response = await axios.get(url, headers)

    if (response.data.data === null) { setHasToken(false) }
    else {
      setHasToken(true)
      setMyToken(response.data.data)
    }

  }
  const deleteMyToken = async () => {

    const url = apiUrl + 'api-token/my-token'

    const response = await axios.delete(url, headers)

    if (response.status === 200) {
      setHasToken(false)

      toastMixin.fire({
        animation: true,
        title: `${response.data.message}`,
        icon: 'success'
      });
    }

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = { token_name: tokenName }

    try {

      const response = await axios.post(apiUrl + 'api-token', payload, headers)

      if (response.status === 201 && response.data.type === 'success') {

        getMyToken()

        toastMixin.fire({
          animation: true,
          title: `${response.data.message}`,
          icon: 'success'
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

  useEffect(() => {

    getMyToken();

  }, [])




  return (
    <section className="generateapi">
      <Container>
        <div className="row">
          <span className="apigradient-bg"></span>
          <div data-aos="zoom-out-down" className="api-token">

            {
              hasToken === true ?
                <div>
                  <h1 className="api_head">My API Token</h1>
                  <h2 className="api_head2">Token Name : {myToken.token_name}</h2>
                  <h2 className="api_head2">Api Key : {myToken.token}</h2>
                  <Button type="button" onClick={deleteMyToken} variant="contained" color="success" className="delbtn">
                    <span className="genbtn-txt">DELETE TOKEN</span>
                  </Button>
                </div>
                :
                <form onSubmit={handleSubmit}>
                  <h1 className="api_head">Generate API Token</h1>
                  <h2 className="api_head2">Token Name</h2>
                  <input type="text"
                    onChange={(e) => setTokenName(e.target.value)}
                    value={tokenName}
                    className="token_field" placeholder="Choose your token  name" />
                  <Button type="submit" variant="contained" color="success" className="genbtn">
                    <span className="genbtn-txt">GENERATE  TOKEN</span>
                  </Button>
                </form>
            }

          </div>
          <span className="apigradient-bg1"></span>

        </div>
      </Container>
    </section>
  );
}