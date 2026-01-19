import Image from "next/image";

import { IoMdStar } from "react-icons/io";
import useStyles from "@/styles/style";
import Axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BrandSeo } from "@/component/ScoPage/BrandsSeo";
import { modifystr } from "@/hooks/utilis/commonfunction";

const VerifyBrands = () => {
  const location = useRouter();
  const classes = useStyles();
  const [VerifyArrayData, SetVerifyArrayData] = React.useState([]);

  React.useEffect(() => {
    Axios.get("http://127.0.0.1:1331/UserPanel/Get-AllBrand/ ")
      .then((response) => {
        SetVerifyArrayData(response.data);
      })
      .catch(function (error) {});
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <BrandSeo location={location.pathname}></BrandSeo>
        <div className="row w-100 m-sm-auto m-0">
          <h1 className="section_main_title m-0">Brands</h1>
          {VerifyArrayData?.map((items, index) => {
            return (
              <div
                className="col-xl-6 col-md-12 col-12 verify_brand_container"
                key={index}
              >
                <div className="row verifyBrand_row mx-1 my-3">
                  <Link href={`/brands/${modifystr(items.name)}/${items.id}`}>
                    <div className="col-6  verifyBrand_image_container ">
                      <Image
                        onError={(e) => (e.target.src = "/blankImage.jpg")}
                        priority
                        width={100}
                        height={100}
                        className="verify_brand_image"
                        src={`${items.Brand_Logo}`}
                        alt={items.name}
                        title={items.name}
                      />
                    </div>
                    <div className="col-6 verify_content_container">
                      <h2 className="ellipsis verify_brands_heading">
                        {items.name}
                      </h2>
                      {/* <div className="verify_content_height verify_subHead">
                                                <p className="ellipsis">{items.num_prod}</p>
                                            </div> */}
                      <div className="verify_ratings">
                        <span className="verify_rating3">
                          <IoMdStar className={classes.disPen_Icons} />
                        </span>
                        <span className="verify_rating1 verify_rating_font">
                          4.5
                        </span>
                        <span className="verify_rating_font verify_rating2">
                          Rating
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default VerifyBrands;
