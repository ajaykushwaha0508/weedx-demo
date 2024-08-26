import React from "react";
import Layout from "../Layout/Layout"
import Dashboard from "../Components/Page/Home/Dashboard/Dashboard";
import ProtectRout from "../Routes/ProtectRout"
import RoutingDespen from "../Routes/RoutingDespen"
import Myreview from "../Components/Page/Profile/Myreview";
import RoutingList from "../Routes/RoutingList"
import Blogs from "../Components/Page/Blog/Blog"
import OpenDispansires from "../Components/Page/Dispansires/Dispansires"
import DispensoriesDetails from "../Components/Page/Dispansires/DispansiresComponent/DispensoriesDetail"
import CreatePassword from "../Components/Page/ResetPassword/CreatePassword"
import RelatedDeals from "../Components/Page/Deals/RelatedDeals"
import RelatedVerifyBrand from "../Components/Page/Brand/RelatedVerifyBrand/RelatedVerifyBrand"
import NewProductDetails from "../Components/Page/Product/NewProductDetails/NewProductDetails"
import StoreDetail from "../Components/Page/StoreDetail/StoreDetail"
import PlaceOrder from "../Components/Page/Checkout/PlaceOrder"
import CheckOutMainPage from "../Components/Page/Checkout/CheckoutMainPage"
import Product from "../Components/Page/Product/Product"
import AddToCart from "../Components/Page/Product/AddToCartComponent/AddToCart"
import Signup from "../Components/Page/Signup/Signup"
import Login from "../Components/Page/Login/Login"
import SignupWithEmail from "../Components/Page/Signup/SignupWithEmail"
import ForgotPassword from "../Components/Page/ResetPassword/ForgotPassword"
import FourZeroThree from "../Components/Page/ErrorPage/FourZeroThree"
import FiveZeroThree from "../Components/Page/ErrorPage/FiveZeroThree"
import FourZeroFour from "../Components/Page/ErrorPage/FourZeroFour"
import Brand from "../Components/Page/Brand/Brand"
import Faq from '../Components/Page/Faq/Faq'
import Helpcenter from '../Components/Page/Helpcenter/Helpcenter'
import Deliveries from "../Components/Page/Deliveries/Deliveries"
import EmptyCard from "../Components/Page/Profile/EditProfile/EditProfile"
import Profile from "../Components/Page/Profile/Profile"
import EditProfile from "../Components/Page/Profile/EditProfile/EditProfile"
import WhisLists from "../Components/Component/Whishlist/WhisLists/WhisLists"
import LawStateDescription from "../Components/Page/Learn/Laws/LawStateDescription/LawStateDescription"
import LearnTabs from "../Components/Page/Learn/LearnTabs"
import AboutUs from "../Components/Page/AboutUs/AboutUs"
import MainDeals from "../Components/Page/MainDealsFolder/MainDeals"
import Strain from "../Components/Page/Strain/Strain"
import StrainProduct from "../Components/Page/Strain/StrainProduct"
import MyOrderProductDetail from "../Components/Page/MyOrder/MyOrderProductDetail"
import MyOrder from "../Components/Page/MyOrder/MyOrder"
import Allblogs from "../Components/Page/Blog/BlogComponent/Allblogs"
import Privatepolicy from "../Components/Page/Privacypolicy/Privacypolicy"
import Cookiespolicy from "../Components/Page/Cookiespolicy/Cookiespolicy"
import Termsconditions from '../Components/Page/Termsconditions/Termsconditions'
import MyLocationSearch from "../Components/Component/Navbar/Component/locationFuntion"
import Layout1 from '../Layout1/Layout1'
import sitemap from "../Components/Page/websitemap/sitemap";
import ProductRedirction from "./productionRedirction";
import EmbeddedLayout from "../EmbeddedLayout/EmbeddedLayout";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Dummypages from "../Components/Page/Dummypages/Dummypages";

const routesConfig = [

  
  {

    element: <Layout1 />,
    children: [
      {
        path: "/login",
        element: <RoutingList Component={Login} ></RoutingList>,
      },
      {
        path: "/signupwithemail",
        element: <RoutingList Component={SignupWithEmail} ></RoutingList>,
      },
      {
        path: "/signup",
        element: <RoutingList Component={Signup} ></RoutingList>
      },
      {
        path: "/forgot-password",
        element: <RoutingList Component={ForgotPassword} ></RoutingList>,
      },
      {
        path: "/CreatePassword",
        element: <RoutingList Component={CreatePassword} ></RoutingList>,
      },
    ]
  },
  {

    element: <Layout />,

    children: [
      // //////////////////////////////////////////////////////////// Complete ///////////////////////////////////////////////////////////

      {
        path: "/MyLocationSearch",
        element: <RoutingList Component={MyLocationSearch} ></RoutingList>,
      },

      {
        path: "/faq",
        element: <RoutingList Component={Faq} ></RoutingList>,
      },
      {
        path: "/helpcenter",
        element: <RoutingList Component={Helpcenter} ></RoutingList>,
      },
      {
        path: "/signupwithemail",
        element: <RoutingList Component={SignupWithEmail} ></RoutingList>,
      },
      {
        path: "/signup",
        element: <RoutingList Component={Signup} ></RoutingList>
      },
      {
        path: "/",
        element: <RoutingList Component={Dashboard} ></RoutingList>,

      },
      {
        path: "/brands",
        element: <RoutingList Component={Brand} ></RoutingList>,
      },
      {
        path: "/brands/:Name/:id",
        element: <RoutingList Component={RelatedVerifyBrand} ></RoutingList>
      },
      {
        path: "/deals",
        element: <RoutingList Component={MainDeals} ></RoutingList>
      },
      //  Weed Dispensires
      {
        path: "/weed-dispensaries/in/:Country/:state?/:city?/:route?",
        element: <RoutingDespen Component={OpenDispansires}  ></RoutingDespen>
      },
      {
        path: "/weed-dispensaries/:StoreName/:tab?/:Category?/:SubCategory?/:id/",
        element: <RoutingList Component={DispensoriesDetails} ></RoutingList>
      },
      {
        path: "/weed-dispensaries/:StoreName/menu/:category/:subcategory/:product/:id/",
        element: <ProductRedirction Component={NewProductDetails} ></ProductRedirction>
      },
      {
        path: "/weed-deliveries/in/:Country/:state?/:city?/:route?",
        element: <RoutingDespen Component={Deliveries}  ></RoutingDespen>
      },
      {
        path: "/weed-deliveries/:StoreName/:tab?/:Category?/:SubCategory?/:id/:SubId?/",
        element: <RoutingList Component={DispensoriesDetails} ></RoutingList>
      },
      {
        path: "/weed-deliveries/:StoreName/menu/:Category/:SubCategory/:Product/:id/",
        element: <ProductRedirction Component={NewProductDetails} ></ProductRedirction>
      },
      // End
      //  Learn Rout
      {
        path: "/learn",
        element: <RoutingList Component={LearnTabs} ></RoutingList>
      },
      {
        path: "/learn/laws-and-regulation/",
        element: <RoutingList Component={LearnTabs} ></RoutingList>
      },
      {
        path: "/learn/laws-and-regulation/:State/:id",
        element: <RoutingList Component={LawStateDescription} ></RoutingList>
      },

      {
        path: "/strain",
        element: <RoutingList Component={Strain} ></RoutingList>
      },
      {
        path: "/history",
        element: <RoutingList Component={LearnTabs} ></RoutingList>
      },
      {
        path: "/aboutUs",
        element: <RoutingList Component={AboutUs} ></RoutingList>
      },
      {
        path: "/learn/product",
        element: <RoutingList Component={LearnTabs} ></RoutingList>,
      },
      // {
      //   path: "/learn/product/:id",
      //   element: <RoutingList Component={Learnproductcontent} ></RoutingList>,
      // },
      {
        path: "/products/:categoryname?/:id?",
        element: <RoutingList Component={Product} ></RoutingList>
      },
      {
        path: "/products/:categoryname/:subCategory/:id",
        element: <RoutingList Component={Product} ></RoutingList>
      },
      {
        path: "/myreviews",
        element: <RoutingList Component={Myreview} ></RoutingList>
      },

      {
        path: "/products/:CategoryName/:subCategory?/:ProductName/:id",     // NewProductDetails
        element: <RoutingList Component={NewProductDetails} ></RoutingList>,
      },
      {
        path: "/terms-and-conditions",
        element: <RoutingList Component={Termsconditions} ></RoutingList>
      },
      {
        path: "/cookies-policy",
        element: <RoutingList Component={Cookiespolicy} ></RoutingList>
      },
      {
        path: "/privacy-policy",
        element: <RoutingList Component={Privatepolicy} ></RoutingList>
      },
      {
        path: "/sitemap",
        element: <RoutingList Component={sitemap} ></RoutingList>
      },
      {
        path: "/cannabis-news",
        element: <RoutingList Component={Allblogs} ></RoutingList>
      },
      {
        path: "/blogs",
        element: <RoutingList Component={Allblogs} ></RoutingList>
      },
      {
        path: "/blogs/:name/:id",
        element: <RoutingList Component={Blogs} ></RoutingList>
      },
      {
        path: "/cannabis-news/:name/:id",
        element: <RoutingList Component={Blogs} ></RoutingList>
      },

      // end
      // cart
      {
        path: "/cart",
        element: <RoutingList Component={AddToCart} ></RoutingList>
      },
      // End
      {
        path: "/profile",
        element: <ProtectRout Component={Profile}></ProtectRout>
      },
      /////////////////////////////////////////////////////////////// Proper Compeleted Routes With Seo ////////////////////////////////////////////////////////////////////////////////////////
      {
        path: "/order-placed",
        element: <RoutingList Component={PlaceOrder} ></RoutingList>,
      },


      {
        path: "/checkout",
        element: <ProtectRout Component={CheckOutMainPage} path="/CheckOutMainPage"></ProtectRout>
      }
      ,

      {
        path: "/StoreDetail",
        element: <RoutingList Component={StoreDetail} ></RoutingList>
      },
      {
        path: "/RelatedDeals",
        element: <RoutingList Component={RelatedDeals} ></RoutingList>
      },

      {
        path: "/EmptyCard",
        element: <RoutingList Component={EmptyCard} ></RoutingList>
      }
      ,
      // {
      //   path: "/LearnCardRelatedPage",
      //   element: <RoutingList Component={LearnCardRelatedPage} ></RoutingList>
      // },

      {
        path: "/EditProfile",
        element: <RoutingList Component={EditProfile} ></RoutingList>
      },
      {
        path: "/404",
        element: <RoutingList Component={FourZeroFour} ></RoutingList>
      },
      {
        path: "/fourzerothree",
        element: <RoutingList Component={FourZeroThree} ></RoutingList>
      },
      {
        path: "/MyOrder",
        element: <RoutingList Component={MyOrder} ></RoutingList>
      },
      {
        path: "/MyOrderProductDetail/:id",
        element: <RoutingList Component={MyOrderProductDetail} ></RoutingList>
      },
      {
        path: "/StrainProduct/:type",
        element: <RoutingList Component={StrainProduct} ></RoutingList>
      },
      {
        path: "/whisLists",
        element: <ProtectRout Component={WhisLists} ></ProtectRout>
      },

      // ends
      {
        path: "*",
        element: <RoutingList Component={FourZeroFour} ></RoutingList>
      }


    ]
  },
  {

    element: <EmbeddedLayout />,

    children: [
      {
        path: "/menu-integration/:StoreName/:tab?/:category?/:id/",
        element: <RoutingList Component={DispensoriesDetails} ></RoutingList>,
      
        loader: async ({ params }) => {
           
          // Fetch data by ID using params
          let data=  axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-StoreById/${params.id}`, {
          }).then(response => {
    
            if (response.data.length === 0) {
              const navigate = useNavigate()
              navigate("/404")
            } else {
              
              return response.data
            }
          })
          return data 
        },
      },
      {
        path: "/menu-integration/:category/:subcategory/:product/:id/",
        element: <RoutingList Component={NewProductDetails} ></RoutingList>,
      
      },
   
      {
        path: "/carts",
        element: <RoutingList Component={AddToCart} ></RoutingList>
      },
      {
        path: "/menu-integration/login",
        element: <RoutingList Component={Login} ></RoutingList>,
      },
      {
        path: "/menu-integration/signupwithemail",
        element: <RoutingList Component={SignupWithEmail} ></RoutingList>,
      },
      {
        path: "/menu-integration/signup",
        element: <RoutingList Component={Signup} ></RoutingList>
      },
      {
        path: "/menu-integration/forgot-password",
        element: <RoutingList Component={ForgotPassword} ></RoutingList>,
      },
      {
        path: "/menu-integration/CreatePassword",
        element: <RoutingList Component={CreatePassword} ></RoutingList>,
      },
      {
        path: "/menu-integration/checkout",
        element: <ProtectRout Component={CheckOutMainPage} path="/CheckOutMainPage"></ProtectRout>
      },
      {
        path: "/menu-integration/order-placed",
        element: <RoutingList Component={PlaceOrder} ></RoutingList>,
      },
      {
        path: "/menu-integration/MyOrderProductDetail/:id",
        element: <RoutingList Component={MyOrderProductDetail} ></RoutingList>
      }
    ]
  }
]

export default routesConfig