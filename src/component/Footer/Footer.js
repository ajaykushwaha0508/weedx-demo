import React, { useState, useEffect, useMemo } from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BiMobile } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";
import logoimage from "../../../public/image/weedx.io logo.png";
import newclases from "@/styles/customstyle.module.scss";
import { modifystr } from "@/hooks/utilis/commonfunction";

// Memoized Social Links Component
const SocialLinks = React.memo(() => (
  <div className={`col-lg-3 col-sm-3 ${newclases.footer_icons_column}`}>
    <p className="px-0">
      <span>
        <Link
          target="_blank"
          href="https://www.linkedin.com/company/weedx-io/"
          aria-label="Visit Weedx LinkedIn page"
        >
          <BsLinkedin color="#31B655" size={22} />
        </Link>
      </span>
      <span>
        <Link
          aria-label="Visit Weedx Facebook page"
          target="_blank"
          href="https://www.facebook.com/profile.php?id=61550742531174"
        >
          <FaFacebook color="#31B655" size={22} />
        </Link>
      </span>
      <span>
        <Link
          aria-label="Visit Weedx Instagram page"
          target="_blank"
          href="https://www.instagram.com/weedx_io"
        >
          <FaInstagram color="#31B655" size={22} />
        </Link>
      </span>
      <span>
        <Link
          aria-label="Visit Weedx Twitter page"
          target="_blank"
          href="https://twitter.com/Weedx_io"
        >
          <span className="x_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#31B665"
              height="1em"
              viewBox="0 0 500 500"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </span>
        </Link>
      </span>
    </p>
  </div>
));

// Footer Component
const Footer = React.memo(() => {
  const [categories, setCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    Axios.get("https://api.cannabaze.com/UserPanel/Get-Categories/")
      .then((response) => setCategories(response.data))
      .catch(() => {});
  }, []);

  // Memoized Categories List
  const memoizedCategories = useMemo(
    () =>
      categories.map((ele, index) => {
        if (index >= 4) {
          return (
            <Link
              aria-label={`Homepage for ${ele.name}`}
              href={`/products/${modifystr(ele.name)}/${ele.id}`}
              key={index}
              className={showMore ? "" : newclases.showmoreList}
            >
              <span className={`${newclases.footer_li} textCapitalize ellipsis`}>
                {ele.name}
              </span>
            </Link>
          );
        }
        return (
          <Link
            aria-label={`Homepage for ${ele.name}`}
            href={`/products/${modifystr(ele.name)}/${ele.id}`}
            key={index}
          >
            <span className={`${newclases.footer_li} textCapitalize ellipsis`}>
              {ele.name}
            </span>
          </Link>
        );
      }),
    [categories, showMore]
  );

  return (
    <footer className="mt-4">
      <div className="container px-0">
        <div className={newclases.footer_main_div_display}>
          <h2 className={newclases.footer_heading}>{`WeedX`}</h2>
          <h3 className={newclases.footer_sub_heading}>
            {`Your Ultimate Cannabis Guide. Discover Dispensaries, Delivery Services, Brands, and Comprehensive Product Information Near You`}
          </h3>
          <div className={`row ${newclases.main_content_logo}`}>
            <div className={newclases.footer_logo_container}>
              <div className={newclases.footerLogo}>
                <Image
                  onError={(e) => (e.target.src = "/image/blankImage.jpg")}
                  unoptimized
                  width={100}
                  height={100}
                  className={newclases.footer_logo_image}
                  src={logoimage.src}
                  alt="weedx.io logo"
                  title="weedx.io logo"
                />
              </div>
              <div className={newclases.contact_info}>
                <div className={newclases.Footer_Left_side_menu}>
                  <IoLocationSharp color="#31B665" size={22} />
                  <span className={newclases.footer_middle_icons_text}>
                    {`United States , Canada`}
                  </span>
                </div>
                <div className={newclases.Footer_Left_side_menu}>
                  <a href="tel:+1 (209) 655-0360">
                    <BiMobile color="#31B665" size={22} />
                    <span className={newclases.footer_middle_icons_text}>
                      {`+1 (209) 655-0360`}
                    </span>
                  </a>
                </div>
                <div className={newclases.Footer_Left_side_menu}>
                  <Link href="mailto:info@weedx.io">
                    <HiOutlineMail color="#31B665" size={22} />
                    <span className={newclases.footer_middle_icons_text}>
                      {` info@weedx.io`}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={newclases.footer_list}>
              <div className={newclases.footer_main_list}>
                <p className={newclases.footer_menu_heading}>{`Category`}</p>
                {memoizedCategories}
                <span
                  className={`${newclases.footer_li} ellipsis`}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Less" : "More"}
                </span>
              </div>
            </div>
            <SocialLinks />
          </div>
          <div className={newclases.bottom_white_line}></div>
          <div className="row mt-2">
            <div className="col-lg-6 col-sm-9">
              <p className="px-0 row">
                <Link href={"/terms-and-conditions"}>
                  <span className={newclases.footer_li}>
                    {` Terms & Conditions `}
                  </span>
                </Link>
                <Link href={"/cookies-policy"}>
                  <span className={newclases.footer_li}>{`Cookies Policy`}</span>
                </Link>
                <Link href={"/privacy-policy"}>
                  <span className={newclases.footer_li}>{`Privacy Policy`}</span>
                </Link>
                <Link href={"/sitemap"}>
                  <span className={newclases.footer_li}>{`Sitemap`}</span>
                </Link>
              </p>
            </div>
          </div>
          <div className={newclases.footer_bootom_headings_container}>
            <p className={newclases.copyright_title}>
              {`Copyright © 2024 weedx.io`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
