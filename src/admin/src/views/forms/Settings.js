import React, { useEffect, useRef, useState } from 'react'
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
  CFormTextarea,
  CFormSwitch,
  CRow,
} from '@coreui/react'
import { DocsExample } from '../../components'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './setting.css'
import { Spinner } from 'react-bootstrap'
import AppModal from '../../components/AppModal'
import baseUrl from '../../Constants'
import apiUrl from '../../../../routes/apiUrl'
import Swal from 'sweetalert2'

const Settings = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [configurationData, setConfigurationData] = useState([]);
  const [conversionInp, setConversionInp] = useState("");
  const [editorState, setEditorState] = useState();
  const [email, setEmail] = useState("");
  const [options, setOptions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showWebsiteUnderConstruct, setShowWebsiteUnderConstruct] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);

  // let location = useLocation();

  const header = {
    headers: {
      'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  const updateAdminEMail = async (e) => {
    e.preventDefault();

    const reqoptions = {
      email: email,
    };

    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
      },
    };

    try {
      await axios.put(`${apiUrl}settings/adminEMail`, reqoptions, headers);
      toastMixin.fire({
        animation: true,
        title: `Updated`,
        icon: 'success'
      });
    } catch (ex) {
      console.log(ex);
    };
  };


  // const udpdatePolkaTokens = async () => {

  //   try {
  //     await axios.get(`${apiUrl}crypto_tokens/updatePolkaDotTokens`, header);

  //     toastMixin.fire({
  //       animation: true,
  //       title: `Updated`,
  //       icon: 'success'
  //     });

  //   } catch (ex) {
  //     console.log(ex);
  //   };
  // }

  const getAdminEmail = async () => {
    const url = `${apiUrl}settings/adminEMail`

    try {
      const response = await axios.get(url, header);
      setEmail(response.data.data.value[0]);
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);
      console.log(ex);
    };

  };

  const getScamTypes = async () => {
    const url = `${apiUrl}settings/adminScamTypes`

    try {
      const response = await axios.get(url, header);
      // console.log(response.data.data.value)
      // console.log(response.data.data.value.toString())
      setOptions(response.data.data.value.toString());
      setIsLoading(false);

    } catch (ex) {
      setIsLoading(false);
      console.log(ex);
    };

  };


  const updateScamOptions = async (e) => {
    e.preventDefault();

    const reqoptions = {
      options: options,
    };

    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'x-admin-token': JSON.parse(localStorage.getItem('ADtoken'))
      },
    };

    try {
      await axios.put(`${apiUrl}settings/adminScamTypes`, reqoptions, headers);

      toastMixin.fire({
        animation: true,
        title: `Updated`,
        icon: 'success'
      });

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
    setIsLoading(true);
    getScamTypes()
    getAdminEmail()
  }, []);


  return (
    <>
      <CRow>
        <CCol xs={12}>
          {
            isLoading ?
              <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden={true}
                  style={{ width: '30px', height: '30px', fontSize: '16px', paddingTop: '10px', color: "blue" }}
                />
              </div> :
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Settings</strong>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={updateAdminEMail} className="row g-3">
                    <CCol md={12} className="mb-4">
                      <CFormLabel htmlFor="tradeURL">Admin Email</CFormLabel>
                      <CFormInput onChange={(e) => setEmail(e.target.value)} required value={email} type="email" id="AdminEmail" />
                    </CCol>


                    <CCol xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <CButton type='submit'>Submit</CButton>
                    </CCol>
                  </CForm>


                  <CForm onSubmit={updateScamOptions} className="row g-3">
                    <CCol md={12} className="mb-4">
                      <CFormLabel htmlFor="tradeURL">Scam Types</CFormLabel>
                      <CFormInput onChange={(e) => setOptions(e.target.value)} required value={options} type="text" />
                    </CCol>


                    <CCol xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <CButton type='submit'>Submit</CButton>
                    </CCol>
                  </CForm>


                  {/* <CCol xs={12}>
                    <CButton onClick={udpdatePolkaTokens} type='button'>Update Polkadot Tokens</CButton>
                  </CCol> */}



                </CCardBody>
              </CCard>
          }
        </CCol>
      </CRow >

      <AppModal
        title="Updated"
        body="Settings updated successfully"
        onClose={() => setVisible(false)}
        visible={visible}
        showBtn1={false}
        btn2Title="Okay"
        btn2Color="primary"
        handleBtnClick={() => setVisible(false)}
      />
    </>
  )
}

export default Settings
