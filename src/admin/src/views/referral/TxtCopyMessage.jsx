import React from 'react'

export default function TxtCopyMessage({ showTxtCopyMsg }) {
    return (
        <>
            <br />
            <br />
            <br />
            {
                showTxtCopyMsg &&
                <div style={{ position: "absolute", bottom: "20px", right: "20px", background: "#eceef7", padding: "5px 10px", borderRadius: "10px" }}><p style={{ fontSize: "17px" }}>Text copied!</p></div>
            }
        </>
    )
}
