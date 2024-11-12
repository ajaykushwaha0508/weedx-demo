import React from "react";
import { useRouter } from "next/router";
// import { HomePageSco } from "../component/ScoPage/HomePageSco"
const HomePageSco = dynamic(() => import('../component/ScoPage/HomePageSco'));
import dynamic from 'next/dynamic'
const HomePageBanner = React.lazy(() => import('../component/home/homepagebanner'));
const HomePageDealsSignup = dynamic(() => import('../component/home/HomePageDealsSignup'));
const CategoryProduct = dynamic(() => import('../component/category/category'));
const DeliveryServices = dynamic(() => import('../component/home/deliveryservice'), { ssr: true });
const HomePageWeedBanner = dynamic(() => import('../component/home/HomePageWeedBanner'));
const Staticcontent = dynamic(() => import('../component/home/staticcontent'));
const NewsBlog = dynamic(() => import('../component/home/Newsblog'), { ssr: true });
const FeaturedBrand = dynamic(() => import('@/component/home/FeaturedBrand'));
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import Createcontext from "@/hooks/context";
import { modifystr } from "@/hooks/utilis/commonfunction";
import axios from "axios";

const transformString = (str) => {
  if (typeof str !== "string" || !str.trim()) {
    return '';
  }

  return str
    .replace(/-/g, " ")  // Replace hyphens with spaces
    .split(' ')          // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter of each word
    .join(' ');          // Join the words back into a single string
};
export default function Home({ initialData }) {
  const { state, dispatch } = React.useContext(Createcontext);
  const [Skeleton, SetSkeleton] = React.useState(true)

  const Navigate = useRouter()
  function ShowCategoryProduct(id, name) {

    Navigate.push(`/products/${modifystr(name)}/${id}`);
  }

  // console.log(initialData.Dispensaries)
  return (
    <>
      {state.permission && <Currentlocation></Currentlocation>}
      <HomePageSco location={useRouter().pathname}></HomePageSco>
  
        <HomePageBanner props={initialData?.topbanner}> </HomePageBanner>

      <CategoryProduct Category={initialData.category} ShowCategoryProduct={ShowCategoryProduct} Skeleton={false}></CategoryProduct>
      <DeliveryServices Skeleton={Skeleton} link={"weed-deliveries"} title={"Delivery services"} data={initialData.GetDelivery} initialData={initialData} location={initialData.formatted_address}></DeliveryServices>
      <HomePageWeedBanner props={initialData.bottembannner}></HomePageWeedBanner>
      <DeliveryServices Skeleton={Skeleton} link={"weed-dispensaries"} title={"Weed Dispensaries Near You"} data={initialData.Dispensaries} initialData={initialData} location={initialData.formatted_address}></DeliveryServices>
      <FeaturedBrand CardDataArray={initialData.brand} />
      <Staticcontent></Staticcontent>
      <NewsBlog data={initialData.news}></NewsBlog>
      <HomePageDealsSignup />
    </>
  );
}






export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.headers['x-fetchlocation'] || '');

  const object = {
    City: transformString(cookies.city) || '',
    State: transformString(cookies.state) || '',
    Country: transformString(cookies.country) || '',
    limit: 10
  };

  // Remove empty keys
  for (const key in object) {
    if (object[key] === '') {
      delete object[key];
    }
  }

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: {
          topbanner: [],
          category: [],
          bottembannner: [],
          brand: [],
        },
        error: 'Failed to fetch data',
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
        console.error('Request canceled due to timeout');
      } else {
        console.error('Request failed:', error);
      }
      throw error;
    }
  };

  try {
    // Start timer
    const startTime = Date.now();

    const [banner, callcategory, bannner2, brand, GetDelivery, Dispensaries, news] = await Promise.all([
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllHomePageBanner/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-Categories/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-PromotionalBanners/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllBrand/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-GetDeliveryStoresHomepage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(object),
      }).catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-Dispensaries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(object),
      }).catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-GetNewsbycategory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          category: 2,
          limit: 10,
        }),
      }).catch(() => null),
    ]);

    const [topbanner, category, bottembannner, getbrand, GetDelivery1, Dispensaries1, news1] = await Promise.all([
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
    console.log(`API calls completed in ${totalTime} ms`);

    const responseData = {
      topbanner: topbanner || [],
      category: category || [],
      bottembannner: bottembannner || [],
      brand: getbrand || [],
      GetDelivery: GetDelivery1 === 'No Delivery in your Area' ? [] : GetDelivery1,
      Dispensaries: Dispensaries1 || [],
      news: news1,
      formatted_address: cookies.formatted_address,
      City: transformString(cookies.city) || '',
      State: transformString(cookies.state) || '',
      Country: transformString(cookies.country) || '',
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

