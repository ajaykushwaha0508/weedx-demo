import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/layout";
// import { HomePageSco } from "../component/ScoPage/HomePageSco"
import dynamic from "next/dynamic";
const HomePageSco = dynamic(() => import("../component/ScoPage/HomePageSco"), {
  memo: true,
});

import HomePageBanner from "../component/home/homepagebanner";
const HomePageDealsSignup = dynamic(
  () => import("../component/home/HomePageDealsSignup"),
  { ssr: true, memo: true }
);
const CategoryProduct = dynamic(
  () => import("../component/category/category"),
  {
    memo: true,
  }
);
// const DeliveryServices = dynamic(() => import('../component/home/deliveryservice'), { ssr: false ,  memo: true });
// const DeliveryServices = dynamic(() => import('../component/home/deliveryservice'));
import DeliveryServices from "../component/home/deliveryservice";
const Staticcontent = dynamic(() => import("../component/home/staticcontent"), {
  memo: true,
});
const Newsblog = dynamic(() => import("@/component/home/Newsblog"), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => <p>Loading Newsblog...</p>, // Optional loading placeholder
});

const FeaturedBrand = dynamic(() => import("@/component/home/FeaturedBrand"), {
  memo: true,
});
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import Createcontext from "@/hooks/context";
import { modifystr } from "@/hooks/utilis/commonfunction";
import axios from "axios";

const transformString = (str) => {
  if (typeof str !== "string" || !str.trim()) {
    return "";
  }

  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
};
export default function Home({ initialData }) {
  const { state, dispatch } = React.useContext(Createcontext);

  const Navigate = useRouter();

  const ShowCategoryProduct = React.useCallback(
    (id, name) => {
      Navigate.push(`/products/${modifystr(name)}/${id}`);
    },
    [Navigate]
  );

  return (
    <>
      {state.permission && <Currentlocation></Currentlocation>}
      <HomePageSco location={useRouter().pathname}></HomePageSco>

      <HomePageBanner props={initialData?.topbanner} btype={"mainbanner"}>
        {" "}
      </HomePageBanner>

      <CategoryProduct
        Category={initialData.category}
        ShowCategoryProduct={ShowCategoryProduct}
      ></CategoryProduct>
      <DeliveryServices
        link={"weed-deliveries"}
        title={"Delivery services"}
        data={initialData.GetDelivery}
        initialData={initialData}
        location={initialData.formatted_address}
      ></DeliveryServices>
      <HomePageBanner
        props={initialData.bottembannner}
        btype={"submainbanner"}
      ></HomePageBanner>
      <DeliveryServices
        link={"weed-dispensaries"}
        title={"Weed Dispensaries Near You"}
        data={initialData.Dispensaries}
        initialData={initialData}
        location={initialData.formatted_address}
      ></DeliveryServices>
      <FeaturedBrand CardDataArray={initialData.brand} />
      <Staticcontent></Staticcontent>
      <Newsblog data={initialData.news}></Newsblog>
      <HomePageDealsSignup />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.headers["x-fetchlocation"] || "");

  const object = {
    City: transformString(cookies.city) || "",
    State: transformString(cookies.state) || "",
    Country: transformString(cookies.country) || "",
    limit: 10,
  };
  for (const key in object) {
    if (object[key] === "") {
      delete object[key];
    }
  }
  const handleError = (error) => {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialData: {
          topbanner: [],
          category: [],
          bottembannner: [],
          brand: [],
        },
        error: "Failed to fetching data",
      },
    };
  };
  const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => source.cancel(), timeout);

    try {
      const response = await axios({
        url,
        cancelToken: source.token,
        ...options,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (axios.isCancel(error)) {
        console.error("Request canceled due to timeout");
      } else {
        console.error("Request failed:", error);
      }
      throw error;
    }
  };
  try {
    // Start timer
    const startTime = Date.now();

    const [
      banner,
      callcategory,
      bannner2,
      brand,
      GetDelivery,
      Dispensaries,
      news,
    ] = await Promise.all([
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-AllHomePageBanner/"
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-Categories/"
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-PromotionalBanners/"
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-AllBrand/"
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-GetDeliveryStoresHomepage/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(object),
        }
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-Dispensaries/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(object),
        }
      ).catch(() => null),
      fetchWithTimeout(
        "https://api.cannabaze.com/UserPanel/Get-GetNewsbycategory/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            category: 2,
            limit: 10,
          }),
        }
      ).catch(() => null),
    ]);

    const [
      topbanner,
      category,
      bottembannner,
      getbrand,
      GetDelivery1,
      Dispensaries1,
      news1,
    ] = await Promise.all([
      banner ? banner.data : [],
      callcategory ? callcategory.data : [],
      bannner2 ? bannner2.data : [],
      brand ? brand.data : [],
      GetDelivery ? GetDelivery.data : [],
      Dispensaries ? Dispensaries.data : [],
      news ? news.data : [],
    ]);

    // End timer and calculate total time
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    // console.log(`API calls completed in ${totalTime} ms`);

    const responseData = {
      topbanner: topbanner || [],
      category: category || [],
      bottembannner: bottembannner || [],
      brand: getbrand || [],
      GetDelivery:
        GetDelivery1 === "No Delivery in your Area" ? [] : GetDelivery1,
      Dispensaries: Dispensaries1 || [],
      news: news1,
      formatted_address: cookies.formatted_address,
      City: transformString(cookies.city) || "",
      State: transformString(cookies.state) || "",
      Country: transformString(cookies.country) || "",
    };

    return {
      props: {
        initialData: responseData,
      },
    };
  } catch (error) {
    return handleError(error);
  }
}
