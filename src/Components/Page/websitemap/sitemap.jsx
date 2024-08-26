import React from 'react';
import { Link } from 'react-router-dom';
import Createcontext from "../../../Hooks/Context"
const Sitemap = () => {
    const { state } = React.useContext(Createcontext)
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [])

    const pages = [
        { page: "Home", link: "/" },
        { page: "Dispensaries", link: `/weed-dispensaries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}` },
        { page: "deliveries", link: `/weed-deliveries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}` },
        { page: "All News", link: "/cannabis-news" },
        { page: "brands", link: `/brands` },
        { page: "products", link: `/products` },
        { page: "learn", link: `/learn` },
        { page: "About us", link: "/aboutus" },
        { page: "Faq's", link: "/faq" },
        { page: "Help Center", link: "/helpcenter" },
        { page: "Terms & Conditions", link:"/terms-and-conditions"},
        {page:"Cookies policy" , link:"/cookies-policy"},
        {page:"Privacy policy" ,  link:"/privacy-policy"},
    ]
    return (
        <div >
            {
                pages.map((data) => {
                    return (
                        <Link to={data.link} >
                            <p style={{ color: "#31B665" }}>{data.page}</p>
                        </Link>
                    )
                })
            }

        </div>
    );
};

export default Sitemap;