import React from "react";
import classes from "./Api.css";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import api_img1 from "../../images/apiimage1.png";
import api_img2 from "../../images/apiimage2.png";
import api_image3 from "../../images/apiimage3.png";
import configsecimg from "../../images/configsecimg.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TabScrollButton from "@mui/material/TabScrollButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Api() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <section className="api">
      <Container fixed>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              orientation="vertical"
            >
              <Tab
                icon={<SentimentSatisfiedOutlinedIcon />}
                iconPosition="start"
                label="Activity"
                className="br_act"
              />
              <Tab
                icon={<SignalCellularAltOutlinedIcon />}
                iconPosition="start"
                label="Data Analysis"
              />
              <Tab
                icon={<SportsEsportsOutlinedIcon />}
                iconPosition="start"
                label="Games"
              />
              <Tab label="New Arrivals" className="br_arri subitem" />
              <Tab label="Categories" className="br_cat subitem" />
              <Tab
                icon={<ThumbUpAltOutlinedIcon />}
                iconPosition="start"
                label="Community"
                className="br_commu"
              />
            </Tabs>
            <Box sx={{ margin: 2 }} className="tab-content">
              {tabIndex === 0 && (
                <Box>
                  <Typography data-aos="zoom-in-up">
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}

              {tabIndex === 1 && (
                <Box>
                  <Typography>
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}

              {tabIndex === 2 && (
                <Box>
                  <Typography>
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}

              {tabIndex === 3 && (
                <Box>
                  <Typography>
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}

              {tabIndex === 4 && (
                <Box>
                  <Typography>
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}

              {tabIndex === 5 && (
                <Box>
                  <Typography>
                    <span className="api-gradientbg"></span>
                    <span className="api-gradientbg2"></span>

                    <h1 className="con_mainhead">Hello, World!</h1>
                    <p className="con_text">
                      TapTap Design System UI Kit is creating for better user
                      experience and effective workflow. It includes a series of
                      UI Components, Examples and Design Guidelines to increase
                      design consistency in your projects.{" "}
                    </p>

                    <div className="useinfo">
                      <h3 className="howuse">How to use 🤔 </h3>
                      <p className="infobox">
                        <span className="infono">1</span>Getting components you
                        are looking for, checkout Part I instruction.
                      </p>
                      <p className="infobox">
                        <span className="infono">2</span>Configuring the
                        component, checkout Part II instruction.{" "}
                      </p>
                      <p className="infobox">
                        <span className="infono">3</span>Using UI Kit between
                        your files, checkout Part III instruction.{" "}
                      </p>
                    </div>

                    <div className="api-components1">
                      <h1 className="comp_head">
                        Getting components &nbsp; |
                        <span className="head_space">Part I </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="chkcomp_head">
                                Check out components
                              </h2>
                              <p className="comp_p">
                                The sidebar on the left gives you access to the
                                Layers, Assets and Pages included in your file.
                              </p>
                              <p className="comp_p1">
                                You could browse through the page list to find
                                the specific component you needed.
                              </p>

                              <p className="comp_p2">
                                Then click the component name to jump to the
                                corresponding detail page.{" "}
                              </p>
                            </Item>
                          </Grid>
                          {/* </div> */}

                          {/* <div className="descrip_image"> */}
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img1}
                                alt="Check out components"
                                className="api_image1"
                              />
                            </Item>
                          </Grid>
                          {/* </div> */}
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="copycomp_head">Copy me</h2>
                              <p className="copy_p">
                                On the detail page, all main components and
                                their variants are arranged and locked on the
                                botton of page.
                              </p>
                              <p className="copy_p1">
                                A “👉 Copy me” section is on the top of the page
                                which includes an instance you can easily copy
                                and paste it in your design.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_img2}
                                alt="Copy me"
                                className="api_image2"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="dragcomp_head">Drag me</h2>
                              <p className="drag_p">
                                Assets Panel also gives you a way to access{" "}
                                <br />
                                components.
                              </p>
                              <p className="drag_p1">
                                You can always drag and drop a component into
                                you design space from the left side assets
                                panel.
                              </p>
                              <p className="dragbox">
                                <span className="dragbox-icon">
                                  <SearchOutlinedIcon />
                                </span>
                                Can’t find components you are looking for?
                              </p>
                              <p className="dragsear-text">
                                {" "}
                                Try to 🔍search them on the top of the assets
                                panel
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={api_image3}
                                alt="Drag me"
                                className="api_image3"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                    <div className="api-components2">
                      <span className="api-gradientbg3"></span>
                      <h1 className="configcomp_head">
                        Configuring the component
                        <span className="head_space2">
                          {" "}
                          &nbsp; | Part II{" "}
                        </span>{" "}
                      </h1>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <h2 className="configcomp_head2">
                                Switch variants
                              </h2>
                              <p className="configcomp_p">
                                When you get the component, you may find it has
                                variants that you can adjust to the particular
                                form you needed.
                              </p>
                              <p className="configcomp_p1">
                                For example (on the right) <br></br> We provided
                                multiple components for buttons, with separate
                                components for various states, sizes and styles.
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={8}>
                            <Item data-aos="zoom-in-left">
                              <img
                                src={configsecimg}
                                alt="Switch Variants"
                                className="configsecimg"
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

export default Api;
