
// import React, { useEffect } from "react";
import Grid from "@mui/system/Unstable_Grid";
import React, { useEffect, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';
import newclases from '@/styles/customstyle.module.css';
import useStyles from '../../../../styles/style';
const SearchBar = dynamic(() => import('../SearchBar'), { ssr: false });
const Notification = dynamic(() => import('../Notification'));
function DashBoardLink({ state }) {
  const classes = useStyles();
  const location = useRouter();
  const [current_route, Setcurrent_route] = React.useState();
  const [notify, setnotify] = React.useState(false);
  const [notificationdata, Setnotificationdata] = React.useState([]);
  const [totalnotify, Settotalnotify] = React.useState([]);
  useEffect(() => {
    Setcurrent_route(location.pathname);
  }, [location]);
  const scrollToTop = useCallback(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, []);
  const getDeliveryHref = () => {
    if (state.Country && state.State && state.City && state.route) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}/${state.route.toLowerCase()}`;
    } else if (state.Country && state.State && state.City) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
    } else if (state.Country && state.State) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
    } else if (state.Country) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}`;
    } else {
      return "/"; // Default fallback if no valid state is provided
    }
  };
  const getDispensariesHref = () => {
    if (state?.Country && state?.State && state?.City && state?.route) {
      return `/weed-dispensaries/in/${state?.Country.toLowerCase()}/${state.State.toLowerCase()}/${state?.City.toLowerCase()}/${state?.route.toLowerCase()}`;
    } else if (state?.Country && state?.State && state?.City) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
    } else if (state?.Country && state?.State) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
    } else if (state?.Country) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}`;
    } else {
      return "/";
    }
  };
  const link = useCallback(() => {
    location.push('/add-business');
  }, [location]);
  const link1 = useCallback(() => {
    location.push('/advertise');
  }, [location]);

  return (
    <div className="container-fluid Top p-2 m-0">
      <Grid container spacing={2}>
        {/* Navigation Links */}
        <Grid
         item="true" 
         xs={8} md={6} display={{ xs: "none", md: "block", lg: "block" }}>
          <div className="col nav_list1">
            <ul className="p-0">
              <li>
                <Link
                  href={getDispensariesHref()}
                  id={
                    current_route?.slice(0, 18) === "/weed-dispensaries"
                      ? "Active"
                      : ""
                  }
                >
                  Dispensaries
                </Link>
              </li>
              <li>
                <Link
                  href={getDeliveryHref()}
                  id={
                    current_route?.slice(0, 16) === "/weed-deliveries"
                      ? "Active"
                      : ""
                  }
                >
                  Deliveries
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={scrollToTop}
                  id={current_route === "/products" ? "Active" : ""}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  onClick={scrollToTop}
                  id={current_route === "/deals" ? "Active" : ""}
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/laws-and-regulation"
                  id={
                    current_route === "/learn/laws-and-regulation" ? "Active" : ""
                  }
                >
                  Law
                </Link>
              </li>
            </ul>
          </div>
        </Grid>

        {/* Add Business and Advertise Buttons */}
        <Grid
            item="true"
          xs={8}
          md={4}
          display={{ xs: "none", md: "block", lg: "block" }}
        >
          <div className="d-flex gap-1 justify-content-center">
            <button className={newclases.btnaddss} onClick={link}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add Business
            </button>
            <button className={newclases.btnaddss} onClick={link1}>
              <p className={newclases.iconscircle}>
                <HiSpeakerphone color="#FFF" size={12} />
              </p>
              Advertise
            </button>
          </div>
        </Grid>
        <Grid item="true" xs={6} md={2} spacing={2} display={{ xs: "none", md: "block", lg: "block" }} >
          <div className="col-12 addyocardIcon">
            <Link href="/whislists" aria-label="Wishlist">
              <Badge badgeContent={state.login ? Object.values(state.WishList).reduce((a, item) => a + item, 0) : 0 }  className={classes.sliderLink_badge} >
                <IconButton  className={classes.navBarButton_icons} aria-label="Wishlist" >
                  <AiFillHeart color="#858585" size={22} />
                </IconButton>
              </Badge>
            </Link>
            <div className="position-relative">
              <Badge
                badgeContent={
                  state.login
                    ? totalnotify?.length ===
                      state?.Profile?.RemovedNotification?.length
                      ? 0
                      : Math.max(
                        totalnotify?.length -
                        state?.Profile?.RemovedNotification?.length,
                        0)
                    : notificationdata?.length
                }
                className={classes.sliderLink_badge}
                onClick={() => setnotify((notify) => !notify)}
              >
                <IconButton
                  className={classes.navBarButton_icons}
                  aria-label="Notifications"
                >
                  <IoIosNotifications color="#858585" size={23} />
                </IconButton>
              </Badge>
                <Notification
                  notify={notify}
                  setnotify={setnotify}
                  notificationdata={notificationdata}
                  Setnotificationdata={Setnotificationdata}
                  Settotalnotify={Settotalnotify}
              />
            </div>
            <Link href="/cart" aria-label="Shopping Cart">
              <Badge
                className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge
                  }`}
                badgeContent={
                  state.AllProduct?.length > 0 ? state.AllProduct?.length : null
                }
              >
                <IconButton
                  className={classes.navBarButton_icons}
                  aria-label="Shopping Cart"
                >
                  <MdOutlineShoppingCart color="#858585" size={22} />
                </IconButton>
              </Badge>
            </Link>
          </div>
        </Grid>
        <Grid
          className={classes.nav_search_bar}
            item="true"
          xs={12}
          md={8}
          xl={8}
          display={{ xs: "block", md: "none", lg: "none" }}
        >
          <SearchBar />
        </Grid>
      </Grid>
    </div>

  );
}

// Use memo to prevent unnecessary re-renders
export default memo(DashBoardLink);
