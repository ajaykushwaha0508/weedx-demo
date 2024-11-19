import React from 'react'
import clases from '@/styles/customstyle.module.css'
import classes from '@/styles/customstyle.module.css'
import { Grid } from '@mui/material';
import { debounce } from 'lodash'; // Or implement a custom debounce
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/component/navbar/component/SearchBar';
import { useRouter } from 'next/router';
import Createcontext from "@/hooks/context";
import Cookies from 'universal-cookie';
import Badge from '@mui/material/Badge';
import { AiFillHeart } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import Notification from '../component/Notification';
import Afterlogin from "../component/afterlogin";
import  SideNavbar from "../component/SideSlider/Slider"
import SliderLink from "@/component/navbar/component/SideSlider/SilderLink"
import { useMediaQuery } from '@mui/material';
export default function Nevbar() {
    const cookies = new Cookies();
    const isLargeScreen = useMediaQuery('(min-width:991px)');
    const ref = React.useRef(null);
    const profileRef = React.useRef(null);
    const Location = useRouter();
    const [open, setOpen] = React.useState(false);
    const { state, dispatch } = React.useContext(Createcontext);
    const [notify, setNotify] = React.useState(false);
    const [dropDownState, setDropDownState] = React.useState(false);
    const [notificationData, setNotificationData] = React.useState([]);
    const [totalNotify, setTotalNotify] = React.useState([]);
       
    const openNav = React.useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);  // empty dependency array ensures this function is only created once
    const closeNav = () => {
        setOpen(false);
    };
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

    const handleClickDropdown = React.useCallback(() => {
        setDropDownState((prevState) => !prevState);
    })
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access');
        await dispatch({ type: 'Login', login: false });
        await dispatch({ type: 'ApiProduct' });
        await dispatch({ type: 'Profile', Profile: [] });
    }

    return (
        <div ref={ref} className={`${clases.NavbarBox} container`} id='Navbar_box' >
            <Grid container spacing={0} rowSpacing={0.3} justifyContent="between">
                {
                    isLargeScreen ?
                        <Grid item container xs={2} md={2} xl={2} alignItems="center" justifyContent="start">
                            <Link href="/"> <Image onError={(e) => (e.target.src = '/image/blankImage.jpg')} unoptimized={true} src={'/weedx.iologo.png'} alt="WeedX.io logo" title="WeedX.io logo" width={50} height={50} /> </Link>
                        </Grid>
                        :

                        <Grid item container xs={3} md={2} xl={2} alignItems="center">
                            <Grid className='center ml-3' >
                                <button className={clases.openbtn} onClick={openNav}>☰</button>
                            </Grid>
                        </Grid>
                }
                <Grid item xs={6} md={6} xl={7} display={{ xs: "block", md: "block", lg: "block" }}>
                    {
                        isLargeScreen ?

                            <SearchBar path={Location?.pathname || ""} />
                            :
                            <Grid className='text-center'>
                                <Link href="/"><Image onError={(e) => (e.target.src = '/image/blankImage.jpg')} unoptimized={true} className='navbar_logo_image' alt="WeedX.io logo" title="WeedX.io logo" src={'/weedx.iologo.png'} width={100} height={100} /></Link>
                            </Grid>

                    }
                </Grid>
                <Grid  item xs={3} md={2} xl={1} display={{ xs: "block", md: "none", lg: "none" }}>
                    <div className={clases.Heder_icon} >
                        <Link href="/whislists">
                            <Badge badgeContent={state.login && Object.values(state.WishList).reduce((a, item) => a + item, 0) >= 1 ? Object.values(state.WishList).reduce((a, item) => a + item, 0) : 0} className={classes.sliderLink_badge}>
                                <IconButton className={classes.navBarButton_icons} aria-label='whishlist'><AiFillHeart color="#858585" size={22} /></IconButton>
                            </Badge>
                        </Link>
                        <div className="notification_icon" >
                            <Badge  onClick={() => setNotify(!notify)} 
                            badgeContent={
                                Boolean( state.login) ? (totalNotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalNotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalNotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationData?.length
                            }
                                className={classes.sliderLink_badge}>
                                <IconButton  className={classes.navBarButton_icons} aria-label='notification'><IoIosNotifications  color="#858585" size={22}></IoIosNotifications></IconButton>
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
                <Grid item xs={5} md={4} xl={3}>
            
                    <Afterlogin dropDownState={dropDownState} state={state} profileRef ={profileRef} handleClickDropdown= {handleClickDropdown} Logout={Logout}></Afterlogin >
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
    
                    <SliderLink Hamburger={"nano"} state={state}></SliderLink>
                        <SideNavbar closeNav={closeNav} Open={open}></SideNavbar>
                </Grid>
            </Grid>
        </div>
    )
}
