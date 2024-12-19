import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router'
import axios from 'axios'
import { FaProductHunt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Createcontext from "@/hooks/context"
import Menu from "@mui/material/Menu";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
const Embadednavbar=()=>{
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
      if(Boolean(id)){
  
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
      }
  }, [id])
  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <div className="container">
      <Toolbar>
        {/* LEFT SIDE: Logo and Links */}
        {/* <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            display: { xs: "none", md: "block" },
            textDecoration: "none",
            color: "inherit",
          }}
        >
          MyApp
        </Typography> */}

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button href="/" sx={{ color: "white" }}>
            Home
          </Button>
          <Button
            onClick={handleMenuOpen}
            sx={{ color: "white" }}
          >
            Categories 
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

        {/* RIGHT SIDE: Login, Signup, and Cart */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button href="/embedded/login" sx={{ color: "white" }}>
            Login
          </Button>
          <Button href="/embedded/signup" sx={{ color: "white" }}>
            Signup
          </Button>
          <IconButton href="/cart" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
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