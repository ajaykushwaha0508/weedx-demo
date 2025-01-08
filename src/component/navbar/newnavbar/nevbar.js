import React,{useState ,useContext , useRef} from 'react'
import dynamic from 'next/dynamic'
import { Grid, Avatar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import useStyles from '@/styles/style';
const SearchBar = dynamic(() => import("@/component/navbar/component/SearchBar"));
import { useRouter } from 'next/router';
import Createcontext from "@/hooks/context";
import Cookies from 'universal-cookie';
import Badge from '@mui/material/Badge';
import { AiFillHeart } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
const Notification = dynamic(() => import("../component/Notification"), { ssr: false });
const Afterlogin = dynamic(() => import("../component/afterlogin"), { ssr: false });
const SideNavbar = dynamic(() => import('../component/SideSlider/Slider'),{  ssr: false,
  memo: false 
});
const SliderLink = dynamic(() => import("@/component/navbar/component/SideSlider/SilderLink"), { ssr: false });
export default function Nevbar() {
    const cookies = new Cookies();
    const clasess = useStyles();
    const ref = useRef(null);
    const profileRef = useRef(null);
    const Location = useRouter();
    const [open, setOpen] = useState(false);
    const { state, dispatch } = useContext(Createcontext);
    const [notify, setNotify] = useState(false);
    const [dropDownState, setDropDownState] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [totalNotify, setTotalNotify] = useState([]);
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
    }, [])
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access');
        await dispatch({ type: 'Login', login: false });
        await dispatch({ type: 'ApiProduct' });
        await dispatch({ type: 'Profile', Profile: [] });
    }
    return (
        <div ref={ref} className={`${'NavbarBox'} container`} id='Navbar_box' >
            <Grid container spacing={0} rowSpacing={0.3} justifyContent="space-between">
                <Grid item container xs={2} md={2} xl={2} alignItems="center" justifyContent="start" display={{ xs: "none", md: "block", lg: "block" }}>
                    <Link href="/">
                        <Image  priority src={'https://selnew.s3.amazonaws.com/media/BlankImage/weedx.webp'} alt="WeedX.io logo" title="WeedX.io logo" width={50} height={50} /> 
                     
                    </Link>
                </Grid>
                <Grid item container xs={3} md={2} xl={2} alignItems="center" display={{ xs: "flex", md: "none", lg: "none" }}>
                    <button className={'openbtn'} onClick={openNav}>☰</button>
                </Grid>
                <Grid item xs={6} md={6} xl={7} display={{ xs: "none", md: "block", lg: "block" }}>
                    <SearchBar path={Location?.pathname || ""} />
                </Grid>
                <Grid className='text-center' item xs={6} md={6} xl={7} display={{ xs: "block", md: "none", lg: "none" }}>
                <Link href="/"><Image  priority className='navbar_logo_image' alt="WeedX.io logo" title="WeedX.io logo" src={'https://selnew.s3.amazonaws.com/media/BlankImage/weedx.webp'} width={100} height={100} /></Link>
             
                </Grid>
                <Grid item xs={3} md={2} xl={1} display={{ xs: "block", md: "none", lg: "none" }}>
                    <div className={'Heder_icon'} >
                        <Link href="/whislists">
                            <Badge badgeContent={state?.login && Object.values(state?.WishList).reduce((a, item) => a + item, 0) >= 1 ? Object.values(state?.WishList).reduce((a, item) => a + item, 0) : 0} className={clasess.sliderLink_badge}>
                                <IconButton className={'navBarButton_icons'} aria-label='whishlist'><AiFillHeart color="#858585" size={22} /></IconButton>
                            </Badge>
                        </Link>
                        <div className="position-relative" >
                            <Badge onClick={() => setNotify(!notify)}
                                badgeContent={
                                    Boolean(state?.login) ? (totalNotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalNotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalNotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationData?.length
                                }
                                className={clasess.sliderLink_badge}>
                                <IconButton className={'navBarButton_icons'} aria-label='notification'><IoIosNotifications color="#858585" size={22}></IoIosNotifications></IconButton>
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
                            <Badge badgeContent={state?.AllProduct?.length > 0 ? state?.AllProduct?.length : null} className={clasess.sliderLink_badge}>
                                <IconButton className={'navBarButton_icons'} aria-label='shopping-cart'><MdOutlineShoppingCart color="#858585" size={22}></MdOutlineShoppingCart></IconButton>
                            </Badge>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={5} md={4} xl={3} >
                    <Afterlogin dropDownState={dropDownState} state={state} profileRef={profileRef} handleClickDropdown={handleClickDropdown} Logout={Logout}></Afterlogin >
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                    <SliderLink state={state}></SliderLink>
                    <SideNavbar closeNav={closeNav} Open={open}></SideNavbar>
                </Grid>
            </Grid>
        </div>
    )
}
