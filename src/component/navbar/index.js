import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Link from 'next/link';
import dynamic from 'next/dynamic'
const SideNavbar = dynamic(() => import('../navbar/component/SideSlider/Slider'));
const Afterlogin = dynamic(() => import('../navbar/component/afterlogin'));
import useStyles from "../../styles/style";
// import SearchBar from "../navbar/component/searchbar";
const SearchBar = dynamic(() => import('../navbar/component/SearchBar'));
import { AiFillHeart } from "react-icons/ai";
import Image from 'next/image';
const Notification = dynamic(() => import('./component/Notification'));
// import Notification from './component/Notification';
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import SliderLink from "@/component/navbar/component/SideSlider/SilderLink"
import Createcontext from "../../hooks/context";
import Cookies from 'universal-cookie';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import image1 from "../../../public/weedx.iologo.png"
import clases from '@/styles/customstyle.module.css'
const Navbar = () => {
    const cookies = new Cookies();
    const ref = React.useRef(null);
    const profileRef = React.useRef(null);
    const Location = useRouter();
    const { state, dispatch } = React.useContext(Createcontext);
    const [notify, setNotify] = React.useState(false);
    const [Hamburger, setHamburger] = useState(
        typeof window !== 'undefined' ? window.innerWidth > 991 : true
      );
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dropDownState, setDropDownState] = React.useState(false);
    const [notificationData, setNotificationData] = React.useState([]);
    const [totalNotify, setTotalNotify] = React.useState([]);
    const detectSize = () => {
        setHamburger(window?.innerWidth <= 991 ? false : true);
    };
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            detectSize();
            window.addEventListener('resize', detectSize);
            return () => {
                window.removeEventListener('resize', detectSize);
            };
        }
    }, []);
    const openNav = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const closeNav = () => {
        setOpen(false);
    };
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access');
        await dispatch({ type: 'Login', login: false });
        await dispatch({ type: 'ApiProduct' });
        await dispatch({ type: 'Profile', Profile: [] });
    }
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (open) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [open]);
    React.useEffect(() => {
        const handleClickOutsideProfile = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                if (dropDownState) {
                    setDropDownState(false);
                }
            }
        };
        document.addEventListener('click', handleClickOutsideProfile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideProfile, true);
        };
    }, [dropDownState]);
    const handleClickDropdown = () => {
        setDropDownState((prevState) => !prevState);
    }
    return (
        <div className='container p-0'>
            <div ref={ref} className={clases.NavbarBox} id='Navbar_box' >
                <Grid container spacing={0} rowSpacing={0.3} justifyContent="between">
                  
                    <Grid item container xs={3} md={2} xl={2} alignItems="center" display={{ xs: "block", md: "none", lg: "none" }}>
                        <button className={clases.openbtn} onClick={openNav}>☰</button>
                    </Grid>
                    <Grid item xs={6} md={6} xl={7} display={{ xs: "none", md: "block", lg: "block" }}>
                        <SearchBar path={Location?.pathname || ""} />
                    </Grid>
                    <Grid className='text-center' item xs={6} md={6} xl={7} display={{ xs: "block", md: "none", lg: "none" }}>
                        <Link href="/"><Image onError={(e) => (e.target.src = '/image/blankImage.jpg')} unoptimized={true} className='navbar_logo_image' alt="WeedX.io logo" title="WeedX.io logo" src={'/weedx.iologo.png'} width={100} height={100} /></Link>
                    </Grid>
                    <Grid xs={3} md={2} xl={1} display={{ xs: "block", md: "none", lg: "none" }}>
                        <div className={clases.Heder_icon} >
                            <Link href="/whislists">
                                <Badge badgeContent={state.login && Object.values(state.WishList).reduce((a, item) => a + item, 0) >= 1 ? Object.values(state.WishList).reduce((a, item) => a + item, 0) : 0} className={classes.sliderLink_badge}>
                                    <IconButton className={classes.navBarButton_icons} aria-label='whishlist'><AiFillHeart color="#858585" size={22} /></IconButton>
                                </Badge>
                            </Link>
                            <div className="notification_icon" >
                                <Badge onClick={() => setNotify(!notify)} badgeContent={
                                    Boolean(state.login) ? (totalNotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalNotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalNotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationData?.length
                                } className={classes.sliderLink_badge}>
                                    <IconButton className={classes.navBarButton_icons} aria-label='notification'><IoIosNotifications color="#858585" size={22}></IoIosNotifications></IconButton>
                                </Badge>
                                <Notification
                                    notify={notify}
                                    setnotify={setNotify}
                                    notificationdata={notificationData}
                                    Setnotificationdata={setNotificationData}
                                    Settotalnotify={setTotalNotify}
                                ></Notification>
                            </div>
                            <Link href="/cart">
                                <Badge badgeContent={state.AllProduct?.length > 0 ? state.AllProduct?.length : null} className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge}`}>
                                    <IconButton className={classes.navBarButton_icons} aria-label='shopping-cart'><MdOutlineShoppingCart color="#858585" size={22}></MdOutlineShoppingCart></IconButton>
                                </Badge>
                            </Link>
                        </div>
                    </Grid>
                    <Grid xs={5} md={4} xl={3}>

                        <Afterlogin dropDownState={dropDownState} state={state} profileRef={profileRef} handleClickDropdown={handleClickDropdown} Logout={Logout}></Afterlogin >
                    </Grid>
                    <Grid xs={12} md={12} xl={12}>
                        <SliderLink state={state}></SliderLink>
                        <SideNavbar closeNav={closeNav} Open={open}></SideNavbar>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

