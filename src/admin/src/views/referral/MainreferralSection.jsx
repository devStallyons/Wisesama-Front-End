import { cilPencil, cilPlus, cilTrash, cilCopy } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react'

export default function MainreferralSection({
    refLinks,
    textToCopyRef,
    handleCopyTxt,
    bURl,
    linkDetail,
    setLinkDetail,
    setDeleteLinkModal,
    setDeleteLinkid,
    handleEditLinkClick,
    setRefSlugErr,
    setRefIdErr,
    setShowAddLinkForm,
    scrollToTop
}) {
    return (
        <>
            <h3 style={{ color: "#42b8fe", paddingLeft: "13px", paddingTop: "20px" }}>Referral Links</h3>
            <div className='dashboardMainPageTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Links </th>
                            <th style={{ textAlign: "center", marginLeft: "-20px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            refLinks.map((elem) => {
                                const { name, totalclicks, uniqueId, _id } = elem;
                                return (
                                    <tr >
                                        <td onClick={() => (scrollToTop(), setLinkDetail({ show: true, ...elem }))} className='cursorPointer' ref={textToCopyRef}>https://{bURl}/{name}?ref={uniqueId}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <CIcon onClick={() => (setDeleteLinkModal(true), setDeleteLinkid(_id))} style={{ color: "#42b8fe", cursor: "pointer" }} icon={cilTrash} className="me-2" />
                                            <CIcon onClick={() => handleEditLinkClick({ name, uniqueId, _id })} style={{ color: "#42b8fe", marginLeft: "10px", cursor: "pointer" }} icon={cilPencil} className="me-2" />
                                            <CIcon onClick={() => handleCopyTxt(`https://${bURl}/${name}?ref=${uniqueId}`)} style={{ color: "#42b8fe", marginLeft: "10px", cursor: "pointer" }} icon={cilCopy} className="me-2" />
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className='ReferralLinkCreateIconBox'>
                <CIcon onClick={() => {
                    setRefSlugErr(false);
                    setRefIdErr(false);
                    setShowAddLinkForm(true);
                }} icon={cilPlus} className="me-2" />
            </div>
        </>
    )
}
