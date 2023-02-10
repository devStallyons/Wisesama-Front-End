import { CButton } from '@coreui/react';
import React from 'react'
import { Spinner } from 'react-bootstrap';

export default function EditAddReferral({
    bURl,
    editable,
    editLinkData,
    scrollToBottom,
    handleEditLinkData,
    handleCreateLink,
    refSlug,
    refId,
    refSlugErr,
    setRefSlugErr,
    setRefSlug,
    refIdErr,
    setRefIdErr,
    setRefId,
    setEditLinkData,
    setShowAddLinkForm,
    loading,
}) {
    return (
        <div style={{ padding: "20px", position: "relative" }}>
            <h3>{editable ? "Edit Link" : "Create Link"}:</h3>{/*editable ? editLinkData.name : */}
            <p style={{ fontSize: "18px", color: "#42b8fe" }}>https://{bURl}/{refSlug == "" ? "slug" : refSlug}?ref={editable ? editLinkData.uniqueId : refId == "" ? "id" : refId}</p>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ flexGrow: 1 }}>
                    <h5>Reference Slug:</h5>
                    <input onBlur={() => setRefSlugErr(false)} style={{ borderColor: refSlugErr ? "red" : "#ced4da" }} placeholder='abcdef' className='ReferenceLinksInputs' value={refSlug} onChange={(e) => setRefSlug(e.target.value)} type="text" name="" id="" />
                </div>
                {!editable && <div style={{ flexGrow: 1 }}>
                    <h5>Reference ID:</h5>
                    <input onBlur={() => setRefIdErr(false)} style={{ borderColor: refIdErr ? "red" : "#ced4da" }} placeholder='12a34bc56d' className='ReferenceLinksInputs' value={refId} onChange={(e) => setRefId(e.target.value)} type="text" name="" id="" />
                </div>}
            </div>
            <br />
            <br />
            <br />

            <div style={{ position: "absolute", bottom: '20px', right: "20px", display: "flex", gap: "10px" }}>
                <CButton onClick={() => {
                    if (editable) {
                        setRefSlug('');
                        setRefId('');
                        setEditLinkData({
                            editable: false,
                            name: null,
                            uniqueId: null,
                            _id: null
                        });
                    }
                    setShowAddLinkForm(false)
                    setTimeout(() => {
                        scrollToBottom();
                    }, 200)
                }} style={{ background: "grey", borderColor: "grey" }} type='button'>Back</CButton>
                <CButton
                    style={{
                        cursor: "pointer",
                        background: editable ? "green" : "#0d6efd",
                        borderColor: editable ? "green" : "#0d6efd"
                    }}
                    onClick={() => editable ? (handleEditLinkData(), setTimeout(() => { scrollToBottom() }, 200)) : (handleCreateLink(), setTimeout(() => { scrollToBottom() }, 200))}
                    type='button'
                >
                    {
                        loading ?
                            <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                                style={{ width: '18px', height: '18px', fontSize: '10px', margin: "0px 15px 0px 15px" }}
                            /> :
                            editable ? "Update" : "Create"
                    }
                </CButton>
            </div>

        </div>
    )
}
