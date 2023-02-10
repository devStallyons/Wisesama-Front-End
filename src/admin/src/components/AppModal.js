import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

export default function AppModal({ visible, onClose, title, body, handleBtnClick, showBtn1 = true, btn2Title = "Delete", btn2Color = "danger" }) {
    return (
        <>
            <CModal visible={visible} onClose={onClose}>
                <CModalHeader>
                    <CModalTitle style={{ color: "black" }}>{title}</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ color: "black" }}>
                    {body}
                </CModalBody>
                <CModalFooter>
                    {
                        showBtn1 &&
                        <CButton color="secondary" style={{ color: "white" }} onClick={onClose}>
                            Close
                        </CButton>
                    }
                    <CButton onClick={handleBtnClick} color={btn2Color} style={{ color: "white" }} >{btn2Title}</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}