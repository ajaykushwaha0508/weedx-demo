import Layout1 from "@/layout/layout1";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import Head from 'next/head';
import _ from "lodash"
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsLayoutSplit } from "react-icons/bs"
import { MdOutlineBrandingWatermark } from "react-icons/md"
import { MdOutlinePriceChange } from "react-icons/md"
import { BsStripe } from "react-icons/bs"
import Createcontext from "@/hooks/context"
import { GiWeightScale } from "react-icons/gi"
import dynamic from 'next/dynamic'
import useStyles from "@/styles/style";
const ProductFilter = dynamic(() => import('@/component/Filter/ProductFilter'), { ssr: true });
const ProductList = dynamic(() => import('@/component/productcard/ProductList'), { ssr: true });
export default function index(){
  const router = useRouter()
  const { state, dispatch } = React.useContext(Createcontext)
  console.log(state.Embedded_category,'state')
  const classes = useStyles()
  const [products  ,setProduct]= useState([])
  const { id } = router.query
     const ProductFilterData= [{ Id: 1, Name: "Category", Type1: "Flower", Type2: "CBD", Icons: <BsLayoutSplit className={classes.muiIcons} /> },
      { Id: 2, Name: "Brand", Type1: "Leafly", Type2: "CBD", Icons: <MdOutlineBrandingWatermark className={classes.muiIcons} /> },
      { Id: 3, Name: "Strain", Type1: "Indica", Type2: "Hybrid", Icons: <BsStripe className={classes.muiIcons} /> },
      { Id: 4, Name: "Price", Type1: "Any", Type2: "$25", Price: "$100", Icons: <MdOutlinePriceChange className={classes.muiIcons} /> },
      { Id: 5, Name: "Weight", Type1: "Any", Type2: "$25", Price: "$100", Icons: <GiWeightScale className={classes.muiIcons} /> },
      { Id: 6, Name: "Unit", Type1: "Any", Type2: "$25", Price: "$100", Icons: <AiOutlineDeploymentUnit className={classes.muiIcons} /> },
      ]
      React.useEffect(() => {
      if(Boolean(id)){
          axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${id}`).then(async (response) => {
                setProduct(response.data)
                // console.log(response.data ,'dguighi')
          }).catch((error) => {
              console.error(error);
          });
      }
      }, [id])
      React.useEffect(()=>{
        
         let productss = products.filter((item)=>{
          return item.category_name  ===state.Embedded_category
         })
        
         setProduct(productss)

      },[state.Embedded_category])
     
  return ( <div>
          <Head>
           <meta name="robots" content="NOINDEX , INDEXIFEMBEDDED" />
         </Head>
          <div className="row" >
              <ProductFilter Store_id={id}
                  id={id}
                  ProductFilterData={ProductFilterData}
                  Setarr1={setProduct}
                  arr={products}
              />
              <div className={ "col-12 col-lg-9 col-xxl-10"}>
                  <ProductList arr={Boolean(products.length) ? products : []}  />
              </div>
            
          </div>
        </div>
  )
}
 index.getLayout = function getLayout(page) {
    return <Layout1>{page}</Layout1>;
};
export async function getServerSideProps(context) {
    const path = context.resolvedUrl;
  
    // Define robots behavior based on the path
    const robotsContent = path === '/restricted-page' ? 'noindex, nofollow' : 'index, follow';
  
    return {
      props: {
        robotsContent,
      },
    };
  }
  