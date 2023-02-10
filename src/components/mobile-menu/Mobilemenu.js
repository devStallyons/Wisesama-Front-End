import * as React from "react";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import "./Mobilemenu.css";
import MenuIcon from "@mui/icons-material/Menu";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import CloseIcon from '@mui/icons-material/Close';
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
// import Home from "../home/Home";
// import Myreports from "../report/Report";
// import Api from "../api/Api";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

// import { PopupMenu } from "react-simple-widgets";
// import Avatar from "@mui/material/Avatar";
// import profile_img from "../../images/profile.png";
// import Stack from "@mui/material/Stack";
// import profile_line from "../../images/profileline.png";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import englang from "../../images/englang.png"
import frenlang from "../../images/francelang.png";
import itallang from "../../images/italylang.png";

const pages = ["home", "report", "api", "privacy-policy", "terms-of-use", "my-reports", "reports-data", "developers-setting", "report-sucessful"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 241;

function AppBarExample() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));
  const [lang, langSel] = React.useState(10);

  const handleChange = (event) => {
    langSel(event.target.value);
  };

  return (
    <div className="App">

      <Box sx={{ flexGrow: 1, marginBottom: 3 }} className="mb_open">
        <AppBar position="dynamic">
          <Toolbar>
            <Typography
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                On2ndClick={handleDrawerClose}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  // to={`/${page}`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={() => {
          handleDrawerClose();
        }}
        open={open}

      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <CloseIcon />
            ) : (
              <AirlineSeatFlatIcon />
            )}
          </IconButton>
          <Item className="language-switcher desk ">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                onChange={handleChange}
              >
                <MenuItem value={10}>
                  <img src={englang} className="br_lgfg" alt="English" />
                  <span className="br_langna">ENG </span>
                </MenuItem>
                <MenuItem value={20}>
                  <img src={frenlang} className="br_lgfg" alt="French" />
                  <span className="br_langna">FRE </span>
                </MenuItem>
                <MenuItem value={30}>
                  <img src={itallang} className="br_lgfg" alt="Urdu" />
                  <span className="br_langna"> ITA </span>
                </MenuItem>
              </Select>
            </FormControl>
          </Item>

        </DrawerHeader>
        <Divider />

        <List>
          {pages.map((link, index) => {
            return (
              <ListItem button component={Link} to={`/${link}`} key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <AgricultureIcon className="mb-drawclose" />
                  ) : (
                    <AirlineSeatFlatIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={link} />


              </ListItem>

            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default AppBarExample;
