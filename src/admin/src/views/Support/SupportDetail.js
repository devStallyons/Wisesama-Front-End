import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faHeading,
  faLink,
  faImage,
  faListUl,
  faListOl,
  faCode,
  faQuoteLeft,
  faSearch,
  faQuestionCircle,
  faExpandArrowsAlt,
  faTicketAlt,
  faCompass,
  faChevronUp,
  faPencilAlt,
  faTimes,
  faArrowRightLong,
  faArrowLeftLong,
  faList,
  faInfoCircle,
  faDownload,
  faRocket,
  faComments,
  faPlus,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./detail.module.css";
import profile from '../../assets/images/avatars/1.jpg'
import SupportCard from "../../components/supportCard/SupportCard";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import AppModal from "../../components/AppModal";
import "./detail.css"
import baseUrl from "../../Constants";

const SupporDetail = () => {
  const [ticketComments, setTicketComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isNextLoading, setNextIsLoading] = useState(false);
  const [isPreviousLoading, setPreviousIsLoading] = useState(false);
  const [isLastLoading, setLastIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closeTicvisible, setCloseTicVisible] = useState(false);
  const [isFirstTicket, setIsFirstTicket] = useState(false);
  const [isLastTicket, setIsLastTicket] = useState(false);
  const [lastIndex, setLastIndex] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  const ticketid = state.ticket?._id;

  const header = {
    headers: {
      'x-auth-token': JSON.parse(localStorage.getItem('ADtoken'))
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      return setVisible(true);
    };

    const url = baseUrl + "tickets/comments/add";

    const requestOptions = {
      avatar: "https://i.ibb.co/JCrVt2q/admin.png",
      name: "admin",
      email: "stallyons.tester2@gmail.com",
      ticketcode: state.ticket.ticketCode,
      message: comment,
      role: "admin"
    };

    try {
      const { data } = await axios.post(url, requestOptions, header);

      setComment("");
      ticketComments.push(data)
      setTicketComments([...ticketComments]);

    } catch (ex) {
      console.log(ex);
    };

  };

  const closeTicket = async () => {
    const url = baseUrl + "tickets/close";

    try {
      await axios.put(`${url}/${ticketid}`, header);
      navigate("/support");

    } catch (ex) {
      console.log(ex);
    };
  };

  const fetchTicketComments = async () => {
    const url = baseUrl + "tickets/comment";
    checkIsFirstTicket();

    try {
      const { data } = await axios.get(`${url}/${state.ticket.ticketCode}`, header);
      setTicketComments(data);

      setNextIsLoading(false);
      setPreviousIsLoading(false);
    } catch (ex) {
      console.log(ex);

      setNextIsLoading(false);
      setPreviousIsLoading(false);
    };

  };

  const handleGoToNextTicket = () => {
    setNextIsLoading(true);

    const currentIndex = (state.allTickets.findIndex((element) => element._id == state.ticket._id));

    const nextTicket = state.allTickets.find((element, index) => {
      return index == (currentIndex + 1);
    });

    if (nextTicket) {
      state.ticket = nextTicket;
      fetchTicketComments();
    } else {
      setNextIsLoading(false);
    };
  };

  const handleGoToPreviousTicket = () => {
    setPreviousIsLoading(true);

    // const onGoingTickets = state.allTickets.filter((element, index) => {
    //   return element.status !== "closed";
    // });

    const currentIndex = (state.allTickets.findIndex((element) => element._id == state.ticket._id));

    const previousTicket = state.allTickets.find((element, index) => {
      return index == (currentIndex - 1);
    });

    // if (state?.from == "support") {
    //   if (nextTicket?.status == "closed") {
    //     setIsLoading(false);
    //     return;
    //   };
    // };

    if (previousTicket) {
      state.ticket = previousTicket;
      fetchTicketComments();
    } else {
      setIsFirstTicket(true);
    };
  };

  const checkIsFirstTicket = () => {
    // if (!state.from) return;
    // setIsFirstTicket
    const ticketIndex = (state.allTickets.findIndex((element) => {
      return element._id == state.ticket._id;
    }));

    if (ticketIndex == 0) {
      setIsFirstTicket(true);
      setIsLastTicket(false);
      setLastIndex(false);
    } else if (state.allTickets?.length - 1 == ticketIndex) {
      setIsFirstTicket(false);
      setIsLastTicket(true);
      setLastIndex(true);
    } else {
      setLastIndex(false);
      setIsFirstTicket(false);
      setIsLastTicket(false);
    };

  };

  const handleRespondToOldest = () => {
    setLastIsLoading(true);

    const onGoingTickets = state.allTickets.filter((element, index) => {
      return element.status !== "closed";
    });

    const arrayLength = onGoingTickets.length;
    const lastElementIndex = arrayLength - 1;

    let lastElement = { ...onGoingTickets[lastElementIndex] };


    if (!arrayLength) { setLastIsLoading(false); return; };

    navigate("/support/support-details", {
      state: {
        ticket: lastElement,
        allTickets: state.allTickets,
        onGoingTickets: onGoingTickets,
        from: "support"
      }
    });
    setLastIsLoading(false);

  };


  useEffect(() => {
    fetchTicketComments();

    checkIsFirstTicket();
  }, [state.ticket]);

  return (


    <>
      <section id="main-body">
        <div className="container mz-supportDetail">
          <div className="row">
            <div className="col-lg-4 col-xl-3">
              <div className={`sidebar ${styles.sideBarBackground}`}>
                <div
                  menuitemname="Ticket Information"
                  className="mb-3 card card-sidebar"
                >
                  <div className="card-header">
                    <h6 className={`card-title m-0 ${styles.blackColor}`}>
                      <strong>Ticket Information</strong>
                    </h6>
                  </div>
                  <div className="collapsable-card-body">
                    <div
                      className="list-group list-group-flush d-md-flex"
                      role="tablist"
                    >
                      <div
                        menuitemname="Requestor"
                        className={`list-group-item list-group-item-action ticket-details-children ${styles.sideBarText}`}
                        id="Primary_Sidebar-Ticket_Information-Subject">
                        <span className="ticket-requestor-name">
                          {state.ticket.ticketCode.toUpperCase()} - {state.ticket.subject}
                        </span>
                      </div>
                      <div
                        menuitemname="Requestor"
                        className={`list-group-item list-group-item-action ticket-details-children ${styles.sideBarText}`}
                        id="Primary_Sidebar-Ticket_Information-Requestor">
                        <span className="title">Requestor</span>
                        <br />
                        <span className="ticket-requestor-name">
                          {state.ticket.name}
                        </span>
                      </div>
                      <div
                        menuitemname="Requestor"
                        className={`list-group-item list-group-item-action ticket-details-children ${styles.sideBarText}`}
                        id="Primary_Sidebar-Ticket_Information-Requestor">
                        <span className="title">Steam ID</span>
                        <br />
                        <span className="ticket-requestor-name">
                          {state.ticket.steamid}
                        </span>
                      </div>
                      <div
                        menuitemname="Date Opened"
                        className={`list-group-item list-group-item-action ticket-details-children ${styles.sideBarText}`}
                        id="Primary_Sidebar-Ticket_Information-Date_Opened"
                      >
                        <span className="title">Submitted</span>
                        <br />
                        {format(new Date(state.ticket.date), "MM/dd/yyyy p")}
                      </div>
                      <div
                        menuitemname="Last Updated"
                        className={`list-group-item list-group-item-action ticket-details-children ${styles.sideBarText}`}
                        id="Primary_Sidebar-Ticket_Information-Last_Updated"
                      >
                        <span className="title">Status</span>
                        <br />{state.ticket.status}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer clearfix">
                    <div className="row">
                      {
                        state.ticket?.status !== "closed" ?
                          <div className="col-12 col-xs-12 col-button-right">
                            <button onClick={() => setCloseTicVisible(true)} className="btn btn-danger btn-sm btn-block">
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="fas fa-times"
                              />{" "}
                              Close
                            </button>
                          </div> : null
                      }
                      <div className="col-12 col-xs-12 col-button-right">
                        {
                          !isFirstTicket ?
                            <button onClick={handleGoToPreviousTicket} className={`btn btn-primary btn-sm btn-block ${lastIndex ? null : "thisisbtn1"}`}>
                              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                  isPreviousLoading ?
                                    < Spinner
                                      as="span"
                                      animation="border"
                                      role="status"
                                      aria-hidden={true}
                                      style={{
                                        width: '16px',
                                        height: '16px',
                                        fontSize: '10px',
                                        // paddingTop: '10px'
                                      }}
                                    /> : <>
                                      <FontAwesomeIcon icon={faArrowLeftLong} style={{ marginRight: '5px' }} className="fas fa-arrow-right-long" />{" "}
                                      Previous Ticket
                                    </>
                                }
                              </div>
                            </button> :
                            null
                        }
                        {
                          !isLastTicket ?
                            <>
                              <button onClick={handleGoToNextTicket} className={`${isFirstTicket ? null : "thisisbtn2"} btn btn-primary btn-sm btn-block`}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  {
                                    isNextLoading ?
                                      < Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden={true}
                                        style={{
                                          width: '16px',
                                          height: '16px',
                                          fontSize: '10px',
                                          // paddingTop: '10px'
                                        }}
                                      /> : <>
                                        Next Ticket
                                        <FontAwesomeIcon icon={faArrowRightLong} style={{ marginLeft: "5px" }} className="fas fa-arrow-right-long" />{" "}
                                      </>
                                  }
                                </div>
                              </button>
                            </>
                            : null
                        }
                        {
                          !lastIndex ?
                            <button style={{ backgroundColor: "#5141e0", border: "none" }} onClick={handleRespondToOldest} className="btn btn-primary btn-sm btn-block">
                              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                  isLastLoading ?
                                    < Spinner
                                      as="span"
                                      animation="border"
                                      role="status"
                                      aria-hidden={true}
                                      style={{
                                        width: '16px',
                                        height: '16px',
                                        fontSize: '10px',
                                        // paddingTop: '10px'
                                      }}
                                    /> : <>
                                      {/* <FontAwesomeIcon icon={faArrowRightLong} style={{ marginRight: '5px' }} className="fas fa-arrow-right-long" />{" "} */}
                                      Respond to Oldest
                                    </>
                                }
                              </div>
                            </button> : null
                        }

                        {/* {
                          state?.from == "support" ?
                            <>
                              {
                                isFirstTicket ?

                                  <button onClick={handleGoToNextTicket} className="btn btn-primary btn-sm btn-block">
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                      {
                                        isLoading ?
                                          < Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                            aria-hidden={true}
                                            style={{
                                              width: '16px',
                                              height: '16px',
                                              fontSize: '10px',
                                              // paddingTop: '10px'
                                            }}
                                          /> : <>
                                            <FontAwesomeIcon icon={faArrowRightLong} style={{ marginRight: '5px' }} className="fas fa-arrow-right-long" />{" "}
                                            Next Ticket
                                          </>
                                      }
                                    </div>
                                  </button> :
                                  <button onClick={handleGoToPreviousTicket} className="btn btn-primary btn-sm btn-block">
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                      {
                                        isLoading ?
                                          < Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                            aria-hidden={true}
                                            style={{
                                              width: '16px',
                                              height: '16px',
                                              fontSize: '10px',
                                              // paddingTop: '10px'
                                            }}
                                          /> : <>
                                            <FontAwesomeIcon icon={faArrowLeftLong} style={{ marginRight: '5px' }} className="fas fa-arrow-right-long" />{" "}
                                            Previous Ticket
                                          </>
                                      }
                                    </div>
                                  </button>
                              }
                            </>
                            : (
                              <button onClick={handleRespondToOldest} className="btn btn-primary btn-sm btn-block">
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  {
                                    isLoading ?
                                      < Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden={true}
                                        style={{
                                          width: '16px',
                                          height: '16px',
                                          fontSize: '10px',
                                          // paddingTop: '10px'
                                        }}
                                      /> : <>
                                        <FontAwesomeIcon icon={faArrowRightLong} style={{ marginRight: '5px' }} className="fas fa-arrow-right-long" />{" "}
                                        Next Ticket
                                      </>
                                  }
                                </div>
                              </button>
                            )
                        } */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xl-9 primary-content">
              {
                state.ticket?.status !== "closed" ?
                  <form
                    role="form"
                    onSubmit={addComment}
                  >
                    <input
                      type="hidden"
                      name="token"
                      defaultValue="37e10569c7f6c16063616415434558dce3c0e456"
                    />
                    <div className="card">
                      <div className="card-header">
                        <h6 className="card-title">Write Your Reply</h6>
                      </div>
                      <div className="card-body extra-padding">
                        <div className="form-group">
                          <label htmlFor="inputMessage mb-2">Message</label>
                          <div className="md-editor active card mt-2" id={1663231327872}>
                            <textarea
                              onChange={(e) => setComment(e.target.value)}
                              name="message"
                              id="inputMessage"
                              rows={5}
                              className="form-control markdown-editor md-input"
                              data-auto-save-name="client_ticket_open"
                              style={{ resize: "vertical" }}
                              value={comment}
                            />
                          </div>
                        </div>
                        <div id="customFieldsContainer"></div>
                        <div id="autoAnswerSuggestions" className="w-hidden" />
                        <div className="text-left margin-bottom py-2 mt-3">
                          <div className="text-left row ">
                            <p className="text-left">
                              <button
                                type="submit"
                                id="openTicketSubmit"
                                className="btn btn-primary btn-recaptcha"
                              >
                                Submit
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form> : null
              }
              {
                ticketComments?.map((element, index) => {
                  const { avatar, date, name, email, role, message } = element;
                  return (
                    <SupportCard
                      key={index}
                      avatar={avatar}
                      date={date}
                      name={name}
                      email={email}
                      role={role}
                      comment={message}
                    />
                  );
                })
              }
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </section >

      <AppModal
        title="Empty Comment"
        body={`Comment should not be empty`}
        onClose={() => setVisible(false)}
        visible={visible}
        showBtn1={false}
        btn2Title="Okay"
        btn2Color="primary"
        handleBtnClick={() => setVisible(false)}
      />

      <AppModal
        title="Close Ticket"
        body={`You are about to close this ticket`}
        onClose={() => setCloseTicVisible(false)}
        visible={closeTicvisible}
        showBtn1={false}
        btn2Title="Close"
        btn2Color="primary"
        handleBtnClick={closeTicket}
      />
    </>
  );
};

export default SupporDetail;
