
import React , {memo} from "react";
import Button from '@mui/material/Button';
import useStyles from "../../../../styles/style";
import { useRouter } from 'next/router';
import Link from "next/link";
import Createcontext from "../../../../hooks/context";
import { FaHome, FaClinicMedical, FaIdeal, FaProductHunt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { SiFuturelearn } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { HiSpeakerphone } from "react-icons/hi";
import Cookies from 'universal-cookie';
import Image from "next/image";
import clases from '@/styles/customstyle.module.css';
const SideNavbar = ({ closeNav, Open }) => {
    const profileRef = React.useRef(null)
    const Navigate = useRouter()
    const { state , dispatch } = React.useContext(Createcontext)
    const [SliderStateDropDown, SetSliderStateDropdown] = React.useState(null)
    const classes = useStyles()
    const cookies = new Cookies();
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access');
        await dispatch({ type: 'Login', login: false });
        await dispatch({ type: 'ApiProduct' });
        await dispatch({ type: 'Profile', Profile: [] });
    }
    function Login() {
        Navigate.push("/login")
        closeNav()
    }
    function Signup() {
        Navigate.push("/signup")
        closeNav()
    }
    React.useEffect(() => {
        const handleClickOutsideprofile = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                if (SliderStateDropDown) {
                    SetSliderStateDropdown((SliderStateDropDown) => !SliderStateDropDown)
                }
            }
        };
        document.addEventListener('click', handleClickOutsideprofile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideprofile, true);
        };
    }, [SliderStateDropDown]);



    const sliderProfileHandler = () => {
        SetSliderStateDropdown((SliderStateDropDown) => {
            return !SliderStateDropDown;
        })
    }
    const Redirect = (items) => {

        Navigate.push("/editprofile")
        closeNav()
    }
    const link = () => {
        Navigate.push("/add-business")
        closeNav()
    }
    const link1  = () => {Navigate.push("/advertise"); closeNav()}
    // console.log(state?.Profile?.image)
    return (
        <React.Fragment>
            <div className={clases.sidebar} style={{ width: Open ? "300px" : "0px" }}>
                <div>
                        <div className=' col-12  mb-4 '>
                            {
                                   !state.login ?
                                    <div className=" px-3 d-flex w-100 ml-0 py-3 align-items-center manuheader justify-content-between">
                                        <div className='w-50'>
                                            <span >
                                                <Link href="/">
                                                    <Image
                                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                        priority
                                                        src="/WeedWhiteLogo.webp"
                                                        alt="WeedX.io logo"
                                                        title="WeedX.io logo"
                                                        width={50}
                                                        height={50}
                                                    />
                                                </Link>
                                            </span>
                                        </div>

                                        <div className='w-50 text-end'>
                                            <span className="d-flex justify-content-end " onClick={closeNav}> <RxCross2 color="#fff" size={25} /></span>
                                        </div>
                                    </div>
                                    :
                                    <div className="row w-100 d-flex align-items-center manuheader justify-content-between mx-0">
                                        <div className="col-9" ref={profileRef}>

                                            <section className={'image_name_section'}>
                                                <div className={clases.SliderImageProfile_container}>

                                                    <Image
                                                        src={state?.Profile?.image}
                                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                        priority
                                                        width={100}
                                                        height={100}
                                                        alt='Profile' 
                                                        title='Profile'
                                                        onClick={Redirect}  
                                                        className={clases.Slider_inner_profile_imgs}
                                                    />

                                                </div>
                                                <div className={clases.slider_image_profile_names_conatiner}>
                                                    <h2 className={`${clases.slider_image_name_heading} ellipsis`} onClick={Redirect}>{state.Profile.username}</h2>
                                                </div>
                                            </section>

                                        </div>
                                        <div className='col-3 text-end'>
                                            <span className="d-flex justify-content-end " onClick={closeNav}> <RxCross2 color="#fff" size={25} />
                                            </span>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className={`col-12 ${clases.Slider_content_center}`} >
                            <Link href="/" className="text-dark"><p onClick={closeNav} className="m-0 d-flex" ><span> <FaHome color="#31B655" fontSize={25} /></span >{`Home`}</p></Link>
                        </div>
                        <hr></hr>
                        <div className={`col-12 ${clases.Slider_content_center}`} >
                            {Boolean(state?.Country) && <Link className="text-dark" href={`/weed-dispensaries/in/${state?.Country?.toLowerCase()    }/${state?.State?.toLowerCase() }/${state?.City?.toLowerCase() }`}>
                                <p onClick={closeNav} className="m-0 d-flex"><span ><FaClinicMedical color="#31B655" fontSize={25} /></span>{`Dispensaries`}</p></Link>}
                        </div>
                        <hr></hr>

                        <div className={`col-12 ${clases.Slider_content_center}`}>
                           {Boolean(state?.Country) &&  <Link className="text-dark" href={`/weed-deliveries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}`}><p onClick={closeNav} className="m-0 d-flex"><span><TbTruckDelivery color="#31B655" fontSize={25} /></span>Deliveries</p></Link>}
                        </div>
                        <hr></hr>
                       
                        <div className={`col-12 ${clases.Slider_content_center}`} >
                            <Link className="text-dark" href="/products"> <p onClick={closeNav} className="m-0 d-flex"><span><FaProductHunt color="#31B655" fontSize={25} /></span>Products</p></Link>
                        </div>
                        <hr></hr>
                        <div className={`col-12 ${clases.Slider_content_center}`} >
                            <Link className="text-dark" href="/deals"> <p onClick={closeNav} className="m-0 d-flex"><span><FaIdeal color="#31B655" fontSize={25} /></span>Deals</p></Link>
                        </div>
                        <hr></hr>
                        <div className={`col-12 ${clases.Slider_content_center}`} >
                            <Link className="text-dark" href="/learn/laws-and-regulation"><p onClick={closeNav} className="m-0 d-flex"><span><SiFuturelearn color="#31B655" fontSize={25} /></span>Law</p></Link>
                        </div>
                        <hr></hr>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className={clases.btnaddss} onClick={link}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    {` Add Business`}
                            </button>
                            <button className={clases.btnaddss} onClick={link1}>
                                <p className={clases.iconscircle}><HiSpeakerphone color="#FFF" size={12}/></p>
                                {`Advertise`}
                            </button>
                        </div>
                </div>
                <div className=' col-12 d-flex align-items-center gap-1 mt-4 mb-3 '>
                    {
                        !state.login ?
                        <>
                            <div className='col-5'>
                                <Button onClick={Login} className={classes.muiBtn} >{`Login`}</Button>
                            </div>
                            <div className='col-5'>
                                <Button onClick={Signup} className={classes.muiBtn} >{`Signup`}</Button>
                            </div>
                        </>
                        :
                        <>
                            <div className='col-10'>
                                <Button onClick={Logout} className={classes.muiBtn} >Logout</Button>
                            </div>
                            
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default memo (SideNavbar)