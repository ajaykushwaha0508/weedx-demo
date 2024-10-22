import { BsLinkedin } from "react-icons/bs"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import useStyles from "../../styles/style"
import Axios from "axios"
import React from "react";
import { IoLocationSharp } from "react-icons/io5"
import { BiMobile } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import Image from "next/image"
import logoimage from '../../../public/image/weedx.io logo.png'
import Link from "next/link"
import { modifystr } from "@/hooks/utilis/commonfunction"
import newclases from '@/styles/customstyle.module.scss'
const Footer = () => {
    const classes = useStyles()
    const [Categorys, SetCategorys] = React.useState([])
    const [morelist, setmorelist] = React.useState(false)
    React.useEffect(() => {
        Axios.get("https://api.cannabaze.com/UserPanel/Get-Categories/", {}).then(Response => {
            SetCategorys(Response.data)

        }).catch(() => {

        })
    }, [])
    return (
            <footer className="mt-4">
                <div className="container px-0">
                    <div className={newclases.footer_main_div_display}>
                        <h2 className={newclases.footer_heading}>{`WeedX`}</h2>
                        <h3 className={newclases.footer_sub_heading}>{`Your Ultimate Cannabis Guide. Discover Dispensaries, Delivery Services, Brands, and Comprehensive Product Information Near You`}</h3>
                        <div className={`row ${newclases.main_content_logo}`}>
                            <div className={newclases.footer_logo_container}>
                                <div className={newclases.footerLogo}>
                                    <Image  onError={(e) => (e.target.src = '/image/blankImage.jpg')} unoptimized={true} width={100} height={100} className={newclases.footer_logo_image} src={logoimage.src} alt="weedx.io logo" title="weedx.io logo" />
                                </div>
                                <div className={newclases.contact_info}>
                                    <div className={newclases.Footer_Left_side_menu}>
                                        <IoLocationSharp color="#31B665" size={22} /><span className={newclases.footer_middle_icons_text}>{`United States , Canada`}</span>
                                    </div>
                                    <div className={newclases.Footer_Left_side_menu}  >
                                        <a href="tel:+1 (209) 655-0360">  <BiMobile color="#31B665" size={22} /><span className={newclases.footer_middle_icons_text}>{`+1 (209) 655-0360`}</span></a>
                                    </div>
                                    <div className={newclases.Footer_Left_side_menu}>
                                        <Link href={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&href=info@weedx.io'}>    <HiOutlineMail color="#31B665" size={22} /><span className={newclases.footer_middle_icons_text}>{`info@weedx.io`}</span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={newclases.footer_list}>
                                <div className={newclases.footer_main_list}>
                                    <p className={newclases.footer_menu_heading}>{`About`}</p>
                                    <Link href={'/aboutus'}><span className={`${newclases.footer_li} text-capitalize ellipsis`}>{`About Us`}</span></Link>
                                    <Link href={'/faq'}><span className={`${newclases.footer_li} ellipsis`}>{`FAQ's`}</span></Link>
                                    <Link href={'/helpcenter'}><span className={`${newclases.footer_li} text-capitalize ellipsis`}>{`Help Center`}</span></Link>
                                    <Link href={`/cannabis-news`}><span className={`${newclases.footer_li} text-capitalize ellipsis`} >{`News`}</span> </Link>
                                    <Link href={`/blogs`}><span className={`${newclases.footer_li} text-capitalize ellipsis`} >{`Blogs`} </span> </Link>
                                </div>
                            </div>
                            <div className={newclases.footer_list}>
                                <div className={newclases.footer_main_list}>
                                    <p className={newclases.footer_menu_heading}>{`Category`}</p>
                                    {Categorys.map((ele, index) => {
                                        if (index >= 4) {
                                            return <Link aria-label="Homepage" href={`/products/${modifystr(ele.name)}/${ele.id}`} key={index} className={morelist ? '' : newclases.showmoreList }>
                                                <span className={`${newclases.footer_li} textCapitalize ellipsis`} >{ele.name}</span>
                                            </Link>
                                        } else {
                                            return (
                                                <Link aria-label="Homepage" href={`/products/${modifystr(ele.name)}/${ele.id}`} key={index}  >
                                                    <span className={`${newclases.footer_li} textCapitalize ellipsis`} >{ele.name}</span>
                                                </Link>
                                            )
                                        }
                                    })}
                                    <span className={`${newclases.footer_li} ellipsis`} onClick={() => { setmorelist(!morelist) }}>{morelist ? "Less" : "More"}</span>
                                </div>
                            </div>
                            <div className={newclases.footer_list}>
                                <div className={newclases.footer_main_list}>
                                    <p className={newclases.footer_menu_heading}>{`For Business`}</p>
                                    <Link href={`https://cannabaze.com/signup`} >
                                        <span className={`${newclases.footer_li} ellipsis`} ><span className="text-capitalize"> {`Add Dispensaries`}</span></span>
                                    </Link>
                                    <Link href={`https://cannabaze.com/signup`}>
                                        <span className={`${newclases.footer_li} ellipsis`} ><span className="text-capitalize">{`Add Brand`}</span></span>
                                    </Link>
                                    <Link href={`https://cannabaze.com/signup`}>
                                        <span className={`${newclases.footer_li} ellipsis`} ><span className="text-capitalize">{`Add Delivery`}</span></span>
                                    </Link>
                                    <Link href={`/add-business`}>
                                        <span className={`${newclases.footer_li} ellipsis`} ><span className="text-capitalize">{`Add Business`}</span></span>
                                    </Link>
                                    <Link href={`/advertise`}>
                                        <span className={`${newclases.footer_li} ellipsis`} ><span className="text-capitalize">{`Advertise`}</span></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={newclases.bottom_white_line}>
                        </div>
                        <div className=" row  mt-2">
                            <div className="col-lg-3 col-12"></div>
                            <div className={` col-lg-6  col-sm-9 ${newclases.bottom_menu_items}`} >
                                <p className="px-0 row">
                                    <Link href={'/terms-and-conditions'}>

                                        <span className={newclases.footer_li} >{` Terms & Conditions `}</span>
                                    </Link>
                                    <Link href={'/cookies-policy'}>

                                        <span className={newclases.footer_li} > {`Cookies Policy`} </span>
                                    </Link>
                                    <Link href={'/privacy-policy'}>

                                        <span className={newclases.footer_li} > {`Privacy Policy`} </span>
                                    </Link>
                                    <Link href={'/sitemap'}>

                                        <span className={newclases.footer_li} > {`Sitemap`} </span>
                                    </Link>
                                </p>
                            </div>
                            <div className={`col-lg-3 col-sm-3 ${newclases.footer_icons_column}`}>
                                <p className="px-0">
                                    <span>
                                        <Link target="_blank" href={"https://www.linkedin.com/company/weedx-io/"}>
                                            <BsLinkedin color="#31B655" size={22}/>
                                        </Link>
                                    </span>
                                    <span>
                                        <Link target="_blank" href={"https://www.facebook.com/profile.php?id=61550742531174"}>
                                            <FaFacebook color="#31B655" size={22}/>
                                        </Link>
                                    </span>
                                    <span>
                                        <Link target="_blank" href={"https://www.instagram.com/weedx_io"}>
                                            <FaInstagram color="#31B655" size={22}/>
                                        </Link>
                                    </span>
                                    <span>
                                        <Link target="_blank" href={"https://twitter.com/Weedx_io"}>
                                            <span className="x_icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#31B665" height="1em" viewBox="0 0 500 500"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                            </span>
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={newclases.footer_bootom_headings_container}>
                        <p className={newclases.copyright_title}>{`Copyright © 2024 weedx.io`}</p>
                    </div>
                </div>
            </footer>
    )
}
export default Footer
