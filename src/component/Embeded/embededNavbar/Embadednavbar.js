import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import axios from "axios";
import useStyles from "@/styles/style";
import { FaProductHunt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Createcontext from "@/hooks/context";
import { RiArrowDropDownLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Afterlogin from "@/component/navbar/component/afterlogin";
import Badge from "@mui/material/Badge";
async function Logout() {
  localStorage.removeItem("User_Token_access");
  cookies.remove("User_Token_access");
  await dispatch({ type: "Login", login: false });
  await dispatch({ type: "ApiProduct" });
  await dispatch({ type: "Profile", Profile: [] });
}
const Embadednavbar = () => {
  const classes = useStyles();
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  const profileRef = React.useRef(null);
  const [dropDownState, setDropDownState] = React.useState(false);
  const { state, dispatch } = React.useContext(Createcontext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    if (state?.Embedded_Store?.StoreID !== "") {
      axios
        .post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/", {
          Store_Id: parseInt(id),
        })
        .then(async (response) => {
          let data = response.data.map((item) => item[0]);
          let ids = [];
          let filtereddata = [];
          for (let i = 0; i < data.length; i++) {
            if (!ids.includes(data[i].id)) {
              filtereddata.push(data[i]);
              ids.push(data[i].id);
            }
          }
          setCategories(filtereddata);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [state?.Embedded_Store?.StoreID]);
  React.useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        if (dropDownState) {
          setDropDownState(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutsideProfile, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideProfile, true);
    };
  }, [dropDownState]);
  const handleClickDropdown = React.useCallback(() => {
    setDropDownState((prevState) => !prevState);
  }, []);
  return (
    <AppBar position="static" className={classes.Embadedappbar}>
      <div className="container">
        <Toolbar>
          <Box className={classes.Embadedappbarmenu}>
            <Button
              onClick={() => {
                router.push(
                  `/embedded-menu/${state.Embedded_Store.StoreName}/${state.Embedded_Store.StoreID}`
                );
              }}
              sx={{ color: "white" }}
            >
              {"Home"}
            </Button>
            <Button onClick={handleMenuOpen} sx={{ color: "white" }}>
              {"Categories"} <RiArrowDropDownLine size={32} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              className={classes.Embadedbarcatdropdown}
            >
              <MenuItem
                onClick={() =>
                  dispatch({ type: "emdaddedcat", Embedded_category: "All" })
                }
                key={1}
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <Avatar alt="Remy Sharp">
                    <FaProductHunt size={18} color="#31B655" />
                  </Avatar>{" "}
                  {" All Products"}
                </Stack>
              </MenuItem>
              {categories.map((item, index) => {
                return (
                  <MenuItem
                    onClick={() =>
                      dispatch({
                        type: "emdaddedcat",
                        Embedded_category: item.name,
                      })
                    }
                    key={index + 1}
                  >
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                      <Avatar alt={item?.name} src={item?.categoryImages} />{" "}
                      {item?.name}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box
            className={classes.Embadedappbarauth}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {!state?.login ? (
              <>
                <Button
                  onClick={() => {
                    router.push("/embedded-menu/login");
                  }}
                >
                  {"Login"}
                </Button>
                <Button
                  onClick={() => {
                    router.push("/embedded-menu/signup");
                  }}
                >
                  {"Signup"}
                </Button>
              </>
            ) : (
              <Afterlogin
                dropDownState={dropDownState}
                state={state}
                profileRef={profileRef}
                handleClickDropdown={handleClickDropdown}
                Logout={Logout}
              />
            )}
            <IconButton
              onClick={() => {
                router.push("/embedded-menu/cart");
              }}
              color="inherit"
            >
              <Badge
                badgeContent={
                  state?.AllProduct[0]?.Store_id ===
                  Number(state?.Embedded_Store?.StoreID)
                    ? state?.AllProduct?.length
                    : 0
                }
                color="#D3D3D3"
              >
                <ShoppingCartIcon size={24} />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileAnchorEl}
              open={Boolean(mobileAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleMobileMenuClose} href="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMobileMenuOpen}>
                Categories
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() =>
                      dispatch({
                        type: "emdaddedcat",
                        Embedded_category: "All",
                      })
                    }
                    key={1}
                  >
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                      <Avatar alt="Remy Sharp">
                        <FaProductHunt size={25} color="#31B655" />
                      </Avatar>{" "}
                      {" All Products"}
                    </Stack>
                  </MenuItem>
                  {categories.map((item, index) => {
                    return (
                      <MenuItem
                        onClick={() =>
                          dispatch({
                            type: "emdaddedcat",
                            Embedded_category: item.name,
                          })
                        }
                        key={index + 1}
                      >
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Avatar alt={item.name} src={item.categoryImages} />{" "}
                          {item.name}
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </MenuItem>
              <MenuItem
                onClick={handleMobileMenuClose}
                href="/embedded-menu/login"
              >
                {"Login"}
              </MenuItem>
              <MenuItem
                onClick={handleMobileMenuClose}
                href="/embedded-menu/signup"
              >
                {"Signup"}
              </MenuItem>
              <MenuItem
                onClick={handleMobileMenuClose}
                href="/embedded-menu/cart"
              >
                <ShoppingCartIcon /> {"Cart"}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};
export default Embadednavbar;
