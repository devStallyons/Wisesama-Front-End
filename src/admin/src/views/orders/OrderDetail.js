import { format } from 'date-fns';
import React from 'react'
import { useLocation } from 'react-router-dom'


const OrderDetail = () => {
    const { state } = useLocation();
    console.log(state)
    return (
        <div className='card'>
            <div className='card-header'>
                <div className='card-title'><strong>Order Details</strong></div>
            </div>
            <div className='card-body mz-details'>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Date: </h6>
                        <h6>{format(new Date(state.datetimecreated), "MM/dd/yyy")}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Order ID: </h6>
                        <h6>{state._id}</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>User Name: </h6>
                        <h6>{state.username}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Desired Level: </h6>
                        <h6>{state.desiredlevel}</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Status: </h6>
                        <h6>{state.status}</h6>
                    </div>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Price: </h6>
                        <h6>${state.price}</h6>
                    </div>
                </div>
                <div className='row p-4'>
                    <div className='col-6 d-flex  justify-content-between px-4'>
                        <h6>Steam ID: </h6>
                        <h6>{state.steamid}</h6>
                    </div>
                </div>
            </div>
        </div>


        // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
        // import { faBold, faItalic, faHeading, faLink, faImage, faListUl, faListOl, faCode, faQuoteLeft, faSearch, faQuestionCircle, faExpandArrowsAlt, faCompass } from '@fortawesome/free-solid-svg-icons'


        //   <section id="main-body">
        //   <div className="container">
        //     <div className="row">
        //     <div className="col-lg-4 col-xl-3">
        //     <div className="sidebar">
        //       <div menuitemname="Ticket Information" className="mb-3 card card-sidebar">
        //         <div className="card-header">
        //           <h3 className="card-title m-0 color-grey">
        //             <i className="fas fa-ticket-alt" />&nbsp;                Ticket Information
        //             <i className="fas fa-chevron-up card-minimise float-right" />
        //           </h3>
        //         </div>
        //         <div className="collapsable-card-body">
        //           <div className="list-group list-group-flush d-md-flex" role="tablist">
        //             <div menuitemname="Requestor" className="list-group-item list-group-item-action ticket-details-children" id="Primary_Sidebar-Ticket_Information-Requestor">
        //               <span className="title">Requestor</span><br /><span className="ticket-requestor-name">Muhammad Amir</span> <span className="label requestor-type-owner">Owner</span>
        //             </div>
        //             <div menuitemname="Date Opened" className="list-group-item list-group-item-action ticket-details-children" id="Primary_Sidebar-Ticket_Information-Date_Opened">
        //               <span className="title">Submitted</span><br />Tuesday, September 6th, 2022 (14:13)
        //             </div>
        //             <div menuitemname="Last Updated" className="list-group-item list-group-item-action ticket-details-children" id="Primary_Sidebar-Ticket_Information-Last_Updated">
        //               <span className="title">Last Updated</span><br />1 week ago
        //             </div>

        //           </div>
        //         </div>
        //         <div className="card-footer clearfix">
        //           <div className="row">
        //             <div className="col-6 col-xs-6 col-button-left">
        //               <button className="btn btn-success btn-sm btn-block" onClick="jQuery('#ticketReply').click()">
        //                 <i className="fas fa-pencil-alt" /> Reply
        //               </button>
        //             </div>
        //             <div className="col-6 col-xs-6 col-button-right">
        //               <button className="btn btn-danger btn-sm btn-block" disabled="disabled" onClick="window.location='?tid=281046&c=sWRYfOoZ&closeticket=true'"><i className="fas fa-times" /> Closed</button></div></div>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="d-none d-lg-block sidebar">
        //       {/* <div menuitemname="CC Recipients" className="mb-3 card card-sidebar" id="sidebarTicketCc">
        //         <div className="card-header">
        //           <h3 className="card-title m-0">
        //             <i className="far fa-closed-captioning" />&nbsp;                CC Recipients
        //             <i className="fas fa-chevron-up card-minimise float-right" />
        //           </h3>
        //         </div>
        //         <div className="collapsable-card-body">
        //           <div className="list-group list-group-flush d-md-flex" role="tablist">
        //             <div menuitemname="emptyTicketCCRow" className="list-group-item list-group-item-action ticket-cc-item w-hidden" id="Secondary_Sidebar-CC_Recipients-emptyTicketCCRow">
        //             </div>
        //           </div>
        //         </div>
        //         <div className="card-footer clearfix">
        //           <div className="list-group-item hidden w-hidden" id="ccCloneRow">
        //             <div className="ticket-cc-email">
        //               <span className="email truncate" title data-toggle="tooltip" data-placement="bottom" />
        //               <div className="pull-right float-right">
        //                 <a href="#" className="delete-cc-email" onClick="return false;" data-email>
        //                   <i className="far fa-do-not-enter fa-lg text-danger no-transform" aria-hidden="true" title="Remove Recipient">
        //                     <span className="sr-only">Remove Recipient</span>
        //                   </i>
        //                 </a>
        //               </div>
        //             </div>
        //           </div>
        //           <form id="frmAddCcEmail" action="https://www.webanchor.net/billing/viewticket.php">
        //             <input type="hidden" name="token" defaultValue="da927cee7038319c045c47b318d7775faaaf7c1f" />
        //             <input type="hidden" name="action" defaultValue="add" />
        //             <input type="hidden" name="tid" defaultValue={281046} />
        //             <input type="hidden" name="c" defaultValue="sWRYfOoZ" />
        //             <div className="input-group margin-bottom-5" id="containerAddCcEmail">
        //               <input id="inputAddCcEmail" type="text" className="form-control input-email" name="email" placeholder="Enter Email Address" />
        //               <span className="input-group-btn input-group-append">
        //                 <button className="btn btn-default" id="btnAddCcEmail" type="submit">Add</button>
        //               </span>
        //             </div>
        //           </form>
        //           <div className="alert alert-danger hidden w-hidden small-font" id="divCcEmailFeedback" />
        //         </div>
        //       </div> */}
        //       <div menuitemname="Support" className="mb-3 card card-sidebar">
        //         <div className="card-header">
        //           <h3 className="card-title m-0">
        //             <i className="far fa-life-ring" />&nbsp;                Support
        //             <i className="fas fa-chevron-up card-minimise float-right" />
        //           </h3>
        //         </div>
        //         <div className="collapsable-card-body">
        //           <div className="list-group list-group-flush d-md-flex" role="tablist">
        //             <a menuitemname="Support Tickets" href="/billing/supporttickets.php" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Support_Tickets">
        //               <i className="fas fa-ticket-alt fa-fw" />&nbsp;                                My Support Tickets
        //             </a>
        //             <a menuitemname="Announcements" href="/billing/announcements" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Announcements">
        //               <i className="fas fa-list fa-fw" />&nbsp;                                Announcements
        //             </a>
        //             <a menuitemname="Knowledgebase" href="/billing/knowledgebase" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Knowledgebase">
        //               <i className="fas fa-info-circle fa-fw" />&nbsp;                                Knowledgebase
        //             </a>
        //             <a menuitemname="Downloads" href="/billing/download" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Downloads">
        //               <i className="fas fa-download fa-fw" />&nbsp;                                Downloads
        //             </a>
        //             <a menuitemname="Network Status" href="/billing/serverstatus.php" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Network_Status">
        //               <i className="fas fa-rocket fa-fw" />&nbsp;                                Network Status
        //             </a>
        //             <a menuitemname="Open Ticket" href="/billing/submitticket.php" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Open_Ticket">
        //               <i className="fas fa-comments fa-fw" />&nbsp;                                Open Ticket
        //             </a>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        //       <div className="col-lg-8 col-xl-9 primary-content">
        //         <form method="post" action="/billing/submitticket.php?step=3" encType="multipart/form-data" role="form">
        //           <input type="hidden" name="token" defaultValue="37e10569c7f6c16063616415434558dce3c0e456" />
        //           <div className="card">
        //   <div className="card-header">
        //     <h3 className="card-title">Reply</h3>
        //   </div>

        //   <div className="card-body extra-padding">
        //     <div className="row">
        //       <div className="form-group col-md-4">
        //         <label htmlFor="inputName">Name</label>
        //         <input type="text" name="name" id="inputName" defaultValue="Muhammad Amir" className="form-control disabled" disabled="disabled" />
        //       </div>
        //       <div className="form-group col-md-5">
        //         <label htmlFor="inputEmail">Email Address</label>
        //         <input type="email" name="email" id="inputEmail" defaultValue="amirbrothers.estate@gmail.com" className="form-control disabled" disabled="disabled" />
        //       </div>
        //     </div>
        //     <div className="row">
        //       <div className="form-group col-md-10">
        //         <label htmlFor="inputSubject">Subject</label>
        //         <input type="text" name="subject" id="inputSubject" defaultValue className="form-control" />
        //       </div>
        //     </div>
        //     <div className="form-group">
        //       <label htmlFor="inputMessage">Message</label>
        //       <div className="md-editor active card" id={1663231327872}>
        //         <div className="md-header btn-toolbar card-header">
        //           <div className="btn-group">
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Bold"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdBold"
        //               data-hotkey="Ctrl+B"
        //             >
        //               <FontAwesomeIcon icon={faBold} />
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Italic"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdItalic"
        //               data-hotkey="Ctrl+I"
        //             >
        //               <FontAwesomeIcon icon={faItalic} />{" "}
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Heading"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdHeading"
        //               data-hotkey="Ctrl+H"
        //             >
        //               <FontAwesomeIcon icon={faHeading} />{" "}
        //             </button>
        //           </div>
        //           <div className="btn-group">
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="URL/Link"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdUrl"
        //               data-hotkey="Ctrl+L"
        //             >
        //               <FontAwesomeIcon icon={faLink} />{" "}
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn hidden"
        //               type="button"
        //               title="Image"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdImage"
        //               data-hotkey="Ctrl+G"
        //             >
        //               <span className={faImage} />{" "}
        //             </button>
        //           </div>
        //           <div className="btn-group">
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Unordered List"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdList"
        //               data-hotkey="Ctrl+U"
        //             >
        //               <FontAwesomeIcon icon={faListUl} />{" "}
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Ordered List"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdListO"
        //               data-hotkey="Ctrl+O"
        //             >
        //               <FontAwesomeIcon icon={faListOl} />{" "}
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Code"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdCode"
        //               data-hotkey="Ctrl+K"
        //             >
        //               <FontAwesomeIcon icon={faCode} />{" "}
        //             </button>
        //             <button
        //               className="btn-default btn-sm btn"
        //               type="button"
        //               title="Quote"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdQuote"
        //               data-hotkey="Ctrl+Q"
        //             >
        //               <FontAwesomeIcon icon={faQuoteLeft} />{" "}
        //             </button>
        //           </div>
        //           <div className="btn-group">
        //             <button
        //               className="btn-sm btn btn-primary"
        //               type="button"
        //               title="Preview"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdPreview"
        //               data-hotkey="Ctrl+P"
        //               data-toggle="button"
        //             >
        //               <FontAwesomeIcon icon={faSearch} /> Preview
        //             </button>
        //           </div>
        //           <div className="btn-group">
        //             <button
        //               className="btn-default btn-sm btn open-modal"
        //               type="button"
        //               title="Help"
        //               tabIndex={-1}
        //               data-provider="bootstrap-markdown"
        //               data-handler="bootstrap-markdown-cmdHelp"
        //               data-hotkey="Ctrl+F1"
        //               data-modal-title="Markdown Guide"
        //               href="submitticket.php?action=markdown"
        //             >
        //               <FontAwesomeIcon icon={faQuestionCircle} />{" "}
        //             </button>
        //           </div>
        //           <div className="md-controls">
        //             <a className="md-control md-control-fullscreen" href="#">
        //               <FontAwesomeIcon icon={faExpandArrowsAlt} />
        //             </a>
        //           </div>
        //         </div>
        //         <textarea
        //           name="message"
        //           id="inputMessage"
        //           rows={12}
        //           className="form-control markdown-editor md-input"
        //           data-auto-save-name="client_ticket_open"
        //           style={{ resize: "vertical" }}
        //           defaultValue={""}
        //         />
        //         <div className="md-footer">
        //           <div id="inputMessage-footer" className="markdown-editor-status">
        //             <div className="small-font">
        //               lines: 0&nbsp;&nbsp;&nbsp;words: 0&nbsp;&nbsp;&nbsp;
        //               <span className="markdown-save">saved</span>
        //             </div>
        //           </div>
        //         </div>
        //         {/* <div className="md-fullscreen-controls">
        //             <a href="#" className="exit-fullscreen" title="Exit fullscreen">
        //               <FontAwesomeIcon icon={faCompass} />
        //             </a>
        //           </div> */}
        //       </div>
        //     </div>
        //     {/* </div> */}
        //     <div className="form-group">
        //       <label htmlFor="inputAttachments">Attachments</label>
        //       <div className="input-group mb-1 attachment-group">
        //         <div className="row">
        //           {/* <label className="custom-file-label text-truncate" htmlFor="inputAttachment1" data-default="Choose file">
        //             Choose file
        //           </label> */}
        //           <div className="col-3">
        //             <input type="file" className="custom-file-input" name="attachments[]" id="inputAttachment1" />
        //           </div>
        //           <div className="input-group-append col-3">
        //             <button className="btn btn-default" type="button" id="btnTicketAttachmentsAdd">
        //               <i className="fas fa-plus" />
        //               Add More
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //       <div id="fileUploadsContainer" />
        //       <div className="text-muted">
        //         <small>Allowed File Extensions: .jpg, .gif, .jpeg, .png  (Max file size: 2MB)</small>
        //       </div>
        //     </div>
        //     <div id="customFieldsContainer">
        //     </div>
        //     <div id="autoAnswerSuggestions" className="w-hidden" />
        //     <div className="text-center margin-bottom">
        //       <div className="text-center row justify-content-center">
        //       </div>
        //     </div>
        //     <p className="text-center">
        //       <button type="submit" id="openTicketSubmit" className="btn btn-primary btn-recaptcha">
        //         Submit
        //       </button>
        //       <a href="supporttickets.php" className="btn btn-default">Cancel</a>
        //     </p>
        //   </div>
        // </div>
        //         </form>
        //         <p style={{textAlign: 'center'}}>Powered by <a href="https://www.whmcs.com/" target="_blank">WHMCompleteSolution</a></p>
        //       </div>
        //     </div>
        //     <div className="d-md-none col-md-3 sidebar sidebar-secondary">
        //       <div menuitemname="Recent Tickets" className="mb-3 card card-sidebar">
        //         <div className="card-header">
        //           <h3 className="card-title m-0">
        //             <i className="fas fa-comments" />&nbsp;                Your Recent Tickets
        //             <i className="fas fa-chevron-up card-minimise float-right" />
        //           </h3>
        //         </div>
        //         <div className="collapsable-card-body">
        //           <div className="list-group list-group-flush d-md-flex" role="tablist">
        //             <a menuitemname="Ticket #281046" href="/billing/viewticket.php?tid=281046&c=sWRYfOoZ" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Recent_Tickets-Ticket_#281046">
        //               <div className="recent-ticket">
        //                 <div className="truncate" title="#281046 - Cpanel" data-toggle="tooltip" data-placement="bottom">#281046 - Cpanel</div><small><span className="pull-right float-right">1 week ago</span><span style={{color: '#888888'}}>Closed</span></small></div>
        //             </a>
        //           </div>
        //         </div>
        //       </div>
        //       <div menuitemname="Support" className="mb-3 card card-sidebar">
        //         <div className="card-header">
        //           <h3 className="card-title m-0">
        //             <i className="far fa-life-ring" />&nbsp;                Support
        //             <i className="fas fa-chevron-up card-minimise float-right" />
        //           </h3>
        //         </div>
        //         <div className="collapsable-card-body">
        //           <div className="list-group list-group-flush d-md-flex" role="tablist">
        //             <a menuitemname="Support Tickets" href="/billing/supporttickets.php" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Support_Tickets">
        //               <i className="fas fa-ticket-alt fa-fw" />&nbsp;                                My Support Tickets
        //             </a>
        //             <a menuitemname="Announcements" href="/billing/announcements" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Announcements">
        //               <i className="fas fa-list fa-fw" />&nbsp;                                Announcements
        //             </a>
        //             <a menuitemname="Knowledgebase" href="/billing/knowledgebase" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Knowledgebase">
        //               <i className="fas fa-info-circle fa-fw" />&nbsp;                                Knowledgebase
        //             </a>
        //             <a menuitemname="Downloads" href="/billing/download" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Downloads">
        //               <i className="fas fa-download fa-fw" />&nbsp;                                Downloads
        //             </a>
        //             <a menuitemname="Network Status" href="/billing/serverstatus.php" className="list-group-item list-group-item-action" id="Secondary_Sidebar-Support-Network_Status">
        //               <i className="fas fa-rocket fa-fw" />&nbsp;                                Network Status
        //             </a>
        //             <a menuitemname="Open Ticket" href="/billing/submitticket.php" className="list-group-item list-group-item-action active" id="Secondary_Sidebar-Support-Open_Ticket">
        //               <i className="fas fa-comments fa-fw" />&nbsp;                                Open Ticket
        //             </a>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="clearfix" />
        //   </div>
        // </section>
    )
}

export default OrderDetail