import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useStyles from '../../styles/style';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import  newsletters from '../../../public/newsletters.png'
import React from 'react';
import Image from 'next/image';
import { useCallback } from 'react';
import styled from '@/styles/customstyle.module.css'
const HomePageDealsSignup = () => {
    const classes = useStyles()
    const [submited,setsubmited]= React.useState(false)
    const { register, handleSubmit, errors, reset, setError } = useForm();
    const [email, setEmail] = React.useState('');
    const onSubmit = (data) => {
        Axios.post(`https://api.cannabaze.com/UserPanel/Add-Subscribe/`,
            {
                email: email
            },

        ).then((res) => {
                if (res.data.status === "success") {
                    setsubmited(true)
                }
               
        })
        .catch((error) => {
            setError("email", {
                type: 'custom',
                message: 'subscribe with this email already exists.',
            }
            )
        })
    }
    const handleChange = useCallback((event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }, [setEmail]);
    

    return (
            <div className={`px-sm-0  ${styled.HomePageDealsSignupContainer}`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6  col-md-5 col-12 d-md-inline d-none'>
                            <div className={`${styled.newsletterImage} text-center`}>
                                <Image   onError={(e) => (e.target.src = '/image/blankImage.jpg')} unoptimized={true} width={200} height={200} src={newsletters.src} alt='newsletter Icon' title='newsletter Icon'/>
                            </div>
                        </div>
                        <div className='col-xl-6  col-md-6 col-sm-10 col-12  mx-auto px-0'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styled.contentarea}>
                                
                                        <h3 className={styled.homePageSignup_heading}>{`Subscribe To Our Newsletters`}</h3>
                                        <p className={styled.homePageSignup_paragraph}>{`Subscribe to our weekly newsletter and be a part of our journey to self discovery and love.`}</p>
                                
                                    {
                                        submited ? <h2 className={styled.thankforsubscribe}>{`Thanks For Subscribe`}</h2>:
                                        <div className={styled.newsletterFormFeild}>
                                            <TextField
                                                className={classes.homePageDealSignup_TextFields}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "20px 0 0 20px",
                                                        backgroundColor: "#efefef"
                                                    }
                                                }}
                                                type='email'
                                                placeholder="Enter Your Email"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
                                                value={email}
                                                name="email"
                                                onChange={handleChange}
                                                helperText={errors.email?.message}
                                                error={Boolean(errors?.email)}
                                                inputRef={register({
                                                    required: "Email not Valid",
                                                    pattern: {
                                                        value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                                        message: "Email not Valid"
                                                    }
                                                })}

                                            />
                                            <span className={styled.newsletter_btn}>
                                                <Button className={` ${classes.homePageButton}`} type='submit' >{`Subscribe`}</Button>
                                            </span>
                                        </div>
                                    }




                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default HomePageDealsSignup