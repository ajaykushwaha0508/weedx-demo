import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from 'next/router'
import axios from 'axios'
import useStyles from "@/styles/style";
import { FaProductHunt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Createcontext from "@/hooks/context"
import { RiArrowDropDownLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Afterlogin from "@/component/navbar/component/afterlogin";
const Embadednavbar=()=>{
    const classes = useStyles()
    let accessToken 
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('User_Token_access');
    }
    const { state, dispatch } = React.useContext(Createcontext)
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
    const [categories  ,setCategories]= useState([])
    const router = useRouter()
    const { id } = router.query
    React.useEffect(() => {
          axios.post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/", {
            "Store_Id": parseInt(id)
          }).then(async (response) => {
                const d = response.data.map(data => data[0]);
                const uniqueUsersByID = _.uniqBy(d, 'id');
                setCategories(uniqueUsersByID);
                console.log(uniqueUsersByID)
            })
            .catch((error) => {
                console.error(error);
          });
      
  }, [id])
  return (
    <AppBar position="static" className={classes.Embadedappbar}>
      <div className="container">
        <Toolbar>
          <Box className={classes.Embadedappbarmenu} >
            <Button href="/" sx={{ color: "white" }}>
              Home
            </Button>
            <Button onClick={handleMenuOpen} sx={{ color: "white" }}  >
              {'Categories'}  <RiArrowDropDownLine size={32} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
                      <MenuItem onClick={()=>   dispatch({ type: 'emdaddedcat', Embedded_category: "All" })}  key={1} >
                        <Stack direction="row" alignItems={'center'} spacing={2}>
                          <Avatar alt="Remy Sharp"><FaProductHunt size={25} color="#31B655" /></Avatar> {' All Products'}
                        </Stack>
                      </MenuItem>
              {
                categories.map((item , index)=>{
              
              return  <MenuItem onClick={()=>   dispatch({ type: 'emdaddedcat', Embedded_category: item.name })}  key={index+1} >
                        <Stack direction="row" alignItems={'center'} spacing={2}>
                          <Avatar alt={item.name} src={item.categoryImages} /> {item.name} 
                        </Stack>
                      </MenuItem>
                })
              }
            </Menu>
          </Box>
          <Box  className={classes.Embadedappbarauth} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
           {!state?.login?
            <>
              <Button onClick={()=>{ router.push("/embedded-menu/login")}} sx={{ color: "white" }}>
                {'Login'}
              </Button>
              <Button onClick={()=>{ router.push("/embedded-menu/signup")}} sx={{ color: "white" }}>
                {'Signup'}
              </Button>
            </>:
            <Afterlogin/>
             }
            <IconButton onClick={()=>{router.push('/embedded-menu/cart')}}  color="inherit">
              <ShoppingCartIcon />
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
                  anchorEl={mobileAnchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Category 1</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Category 2</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Category 3</MenuItem>
                </Menu>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/login">
                Login
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/signup">
                Signup
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/cart">
                <ShoppingCartIcon /> Cart
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}
export default Embadednavbar