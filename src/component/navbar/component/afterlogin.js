import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import React  , {memo}from 'react';
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { FaHandsHelping } from "react-icons/fa";
import useStyles from "@/styles/style";
import Image from 'next/image';
import clases from '@/styles/customstyle.module.css'
const Afterlogin = ({ dropDownState, state, profileRef, handleClickDropdown , Logout }) => {
    const classes = useStyles();
    return (
        <div >
            { state.login ? 
            <div className='position-relative' ref={profileRef}>
                <Grid display={{ xs: "none", md: "flex" }} justifyContent="flex-end">
                    <div className={clases.Navbar_profile_logo_container}>
                        <Image   priority
                            src={state.Profile.googlelink === null ? `${state.Profile.image} ` : state.Profile.googlelink}
                            alt='Profile'
                            width={100}
                            height={100}
                            title='Profile'
                            className={clases.Navbar_logo_imgs}
                            onError={(e) => (e.target.src = '/blankImage.jpg')}
                            onClick={()=>handleClickDropdown()}
                        />
                    </div>
                </Grid>
                {dropDownState &&
                    <div className={clases.profileDropdown_container}>
                        <section className={clases.Navbar_proflie_image_name_section}>
                           <p className={`${clases.profile_names} ellipsis`}>{state.Profile.username}</p>
                        </section>
                        <hr />
                     
                        <ol className={clases.navbar_profile_orderList}>
                            <Link href={'/editprofile'}> <li className={clases.profile_list}> <span><TbEdit /></span> {`EDIT PROFILE`}</li></Link>
                            <Link href={'/myorder'}> <li className={clases.profile_list}> <span><FiShoppingBag /></span> {`MY ORDER`}</li></Link>
                            <Link href={'/whislists'}> <li className={clases.profile_list}> <span><FaHeart /></span> {`FAVORITES`} </li></Link>
                            <Link href={'/myreviews'}> <li className={clases.profile_list}> <span><MdReviews /></span>{`MY REVIEW`} </li></Link>
                            <Link href={'/helpcenter'}> <li className={clases.profile_list}> <span><FaHandsHelping /></span> {`HELP`}</li></Link>
                            <li className={clases.profile_list} onClick={Logout}> <span><TbLogout /></span> {`LOGOUT`}</li>
                        </ol>
                    </div>
                }
            </div>

            :
            <div className='col-12 d-flex align-items-center gap-1 justify-content-end Sapceing'>
                <div className='col-lg-4 col-xl-5 col-sm-4'>
                    <Grid display={{ xs: "none", md: "block", lg: "block", }}>
                        <Link href="/login"><Button className={classes.muiBtn}>{`Log In`}</Button></Link>
                    </Grid>
                </div>
                <div className='col-lg-4 col-xl-5 col-sm-4'>
                    <Grid display={{ xs: "none", md: "block", lg: "block" }}>
                        <Link href="/signup"><Button sx={{ boxShadow: 3 }} className={classes.muiBtn_Signup}>{`Sign Up`}</Button></Link>
                    </Grid>
                </div>
            </div>
             } 
        </div>
    );
};

export default memo(Afterlogin);